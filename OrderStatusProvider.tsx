import React, { createContext, useEffect, useState, ReactNode, useRef } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { connectToOrderUpdates, disconnectFromOrderUpdates } from './src/api/order/sse';
import { getOrderId } from './src/api/order/order';
import { useInterval } from './src/utils/useInterval';

interface OrderStatusContextType {
    order: any;
    refreshOrderUpdates: () => void;
    disconnect: () => void;
}

export const OrderStatusContext = createContext<OrderStatusContextType | null>(null);

export const OrderStatusProvider = ({ children }: { children: ReactNode }) => {
    const [order, setOrder] = useState<any>(null);
    const [lastOrderId, setLastOrderId] = useState<number | null>(null);
    const sseConnected = useRef(false);

    // Checa a cada 2 segundos se o pedido mudou
    useInterval(async () => {
        const orderIdString = await AsyncStorage.getItem('@lastOrderId');
        const orderId = Number(orderIdString);
        if (orderId && orderId !== lastOrderId) {
            setLastOrderId(orderId);
            disconnect(); // desconecta SSE antigo
            subscribeToOrderUpdates(orderId); // conecta novo
        }
    }, 2000);

    useEffect(() => {
        // Conexão inicial
        (async () => {
            const orderIdString = await AsyncStorage.getItem('@lastOrderId');
            const orderId = Number(orderIdString);
            if (orderId) {
                setLastOrderId(orderId);
                await subscribeToOrderUpdates(orderId);
            }
        })();

        return () => disconnect();
    }, []);

    const subscribeToOrderUpdates = async (orderId: number) => {
        if (sseConnected.current) return;

        try {
            const orderData = await getOrderId(orderId);
            setOrder(orderData);

            sseConnected.current = true;

            connectToOrderUpdates(orderData.orderId, (newStatus) => {
                console.log('Status atualizado via SSE:', newStatus);

                if (typeof newStatus === 'string') {
                    const cleanStatus = newStatus.replace(/"/g, '');

                    setOrder((prevOrder: any) => {
                        const updatedOrder = { ...prevOrder, status: cleanStatus };

                        AsyncStorage.setItem('@lastOrder', JSON.stringify(updatedOrder)).catch((err) =>
                            console.error('Erro ao salvar novo status no AsyncStorage:', err)
                        );

                        // Notificação local aqui
                        Notifications.scheduleNotificationAsync({
                            content: {
                                title: 'Atualização do pedido',
                                body: getFriendlyStatusMessage(cleanStatus),
                            },
                            trigger: null,
                        });

                        if (cleanStatus === 'FINISHED') {
                            AsyncStorage.multiRemove(['@cart', '@lastOrder']).then(() => {
                                console.log('Carrinho e último pedido limpos após finalização');
                            }).catch((err) =>
                                console.error('Erro ao limpar dados após finalização do pedido:', err)
                            );
                            disconnectFromOrderUpdates();
                        }

                        return updatedOrder;
                    });
                } else {
                    console.warn('Status SSE inválido ou indefinido:', newStatus);
                }
            });
        } catch (error) {
            console.error('Erro ao conectar ao SSE:', error);
        }
    };

    const disconnect = () => {
        disconnectFromOrderUpdates();
        sseConnected.current = false;
    };

    return (
        <OrderStatusContext.Provider value={{ order, refreshOrderUpdates: () => subscribeToOrderUpdates(lastOrderId!), disconnect }}>
            {children}
        </OrderStatusContext.Provider>
    );
};


// Agora implementamos corretamente a função auxiliar
function getFriendlyStatusMessage(status: string): string {
    switch (status) {
        case 'PAID':
            return 'Pedido pago. Aguardando preparação.';
        case 'PREPARING':
            return 'Pedido em preparação.';
        case 'AVAILABLE':
            return 'Pedido pronto para retirada. Compareça na lanchonete.';
        case 'FINISHED':
            return 'Pedido finalizado.';
        default:
            return 'Status atualizado.';
    }
}
