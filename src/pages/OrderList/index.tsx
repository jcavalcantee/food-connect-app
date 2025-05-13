import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getOrdersByUserId } from '../../api/OrderList/orders';
import styles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FooterHome from '../../components/FooterHome';

export default function OrderList() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState(false);
    const [page, setPage] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const PAGE_SIZE = 10;
    const insets = useSafeAreaInsets();

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
        <View style={styles.orderItem}>
            <Text style={styles.orderId}>Pedido #{item.orderId}</Text>
            <Text style={styles.orderStatus}>{getFriendlyStatusMessage(item?.orderStatus)}</Text>
            <Text style={styles.orderDate}>{formatToBrazilianDate(item?.orderDate)}</Text>
            <Text style={styles.orderTotal}>R$ {item.totalPrice.toFixed(2)}</Text>
        </View>
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
            <FooterHome />
        </View>
    );

}
