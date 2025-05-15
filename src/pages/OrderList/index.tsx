import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
    Button,
    Modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getOrdersByUserId } from '../../api/OrderList/orders';
import styles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FooterHome from '../../components/FooterHome';
import AccessibilityButton from "../../components/Accessibility/accessibilityButton";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    Order: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Order'>;

export default function OrderList() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const PAGE_SIZE = 10;
    const insets = useSafeAreaInsets();
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation<NavigationProp>();

    const openOrderDetails = (order: any) => {
        setSelectedOrder(order);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedOrder(null);
    };

    const loadOrders = async (reset = false) => {
        try {
            const userInfo = await AsyncStorage.getItem('userInfo');
            if (userInfo) {
                const { id } = JSON.parse(userInfo);
                const nextPage = reset ? 0 : page;
                const response = await getOrdersByUserId(id, nextPage, PAGE_SIZE);

                if (reset) {
                    setOrders(response);
                } else {
                    setOrders((prev) => [...prev, ...response]);
                }

                // Se o retorno for menor que o page size, não há mais dados
                setHasMore(response.length === PAGE_SIZE);
                setPage(nextPage + 1);
            }
        } catch (error) {
            console.error('Erro ao buscar pedidos:', error);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        loadOrders(true);
    }, []);

    const handleRefresh = () => {
        setRefreshing(true);
        setPage(0);
        loadOrders(true);
    };

    const handleLoadMore = () => {
        if (!loading && hasMore) {
            loadOrders();
        }
    };

    const getFriendlyStatusMessage = (status: string | undefined) => {
        switch (status) {
            case 'PAID':
                return '✔️ Pedido pago. Aguardando preparação.';
            case 'PREPARING':
                return '🍳 Pedido em preparação.';
            case 'AVAILABLE':
                return '📦 Pedido pronto para retirada!';
            case 'FINISHED':
                return '✅ Pedido finalizado.';
            case 'CANCELED':
                return '❌ Pedido cancelado.';
            default:
                return 'Status desconhecido.';
        }
    };

    const formatToBrazilianDate = (dateString: string | undefined | null) => {
        if (!dateString || typeof dateString !== 'string') {
            return 'Não informada';
        }

        const isoDateString = dateString.replace(' ', 'T');
        const date = new Date(isoDateString);

        if (isNaN(date.getTime())) {
            return 'Data inválida';
        }

        return date.toLocaleString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    const renderItem = ({ item }: { item: any }) => (
        <TouchableOpacity onPress={() => openOrderDetails(item)} style={styles.orderItem}>
            <Text style={styles.orderId}>Pedido #{item.orderId}</Text>
            <Text style={styles.orderStatus}>{getFriendlyStatusMessage(item?.orderStatus)}</Text>
            <Text style={styles.orderDate}>{formatToBrazilianDate(item?.orderDate)}</Text>
            <Text style={styles.orderTotal}>R$ {item.totalPrice.toFixed(2)}</Text>
        </TouchableOpacity>
    );


    if (loading && page === 0) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }

    return (
        <View style={[styles.container, { paddingTop: insets.top }]}>
            <Text style={styles.title}>Meus Pedidos</Text>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.orderId.toString()}
                renderItem={renderItem}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
                }
                ListFooterComponent={
                    loading && hasMore ? (
                        <ActivityIndicator size="small" color="#007BFF" />
                    ) : null
                }
            />
            <Modal
                visible={modalVisible}
                transparent
                animationType="slide"
                onRequestClose={closeModal}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {selectedOrder && (
                            <>
                                <Text style={styles.modalTitle}>Detalhes do Pedido #{selectedOrder.orderId}</Text>
                                <Text>Status: {getFriendlyStatusMessage(selectedOrder.orderStatus)}</Text>
                                <Text>Data: {formatToBrazilianDate(selectedOrder.orderDate)}</Text>
                                <Text>Total: R$ {selectedOrder.totalPrice.toFixed(2)}</Text>

                                {/* Botão Condicional */}
                                {selectedOrder.orderStatus !== 'FINISHED' && selectedOrder.orderStatus !== 'CANCELED' && (
                                    <Button
                                        title="Ver Pedido"
                                        onPress={async () => {
                                            await AsyncStorage.setItem('@lastOrderId', String(selectedOrder.orderId));
                                            closeModal();
                                            navigation.navigate('Order');
                                        }}
                                    />
                                )}
                                <Button title="Fechar" onPress={closeModal} />
                            </>
                        )}
                    </View>
                </View>
            </Modal>

            <FooterHome />
            <AccessibilityButton />
        </View>
    );

}
