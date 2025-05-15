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

            connectToOrderUpdates(orderId, async (newStatus) => {
                const cleanStatus = newStatus?.replace(/"/g, '');
                const updatedOrder = { ...orderData, status: cleanStatus };
                setOrder(updatedOrder);

                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: 'Atualização do pedido',
                        body: getFriendlyStatusMessage(cleanStatus),
                    },
                    trigger: null,
                });

                if (cleanStatus === 'FINISHED') {
                    await AsyncStorage.multiRemove(['@cartItems', '@lastOrderId']);
                    disconnect();
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
