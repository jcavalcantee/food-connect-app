import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity,
    Button,
    Modal,
    ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getOrdersByUserId } from '../../api/orderList/orders';
import styles from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FooterHome from '../../components/FooterHome';
import AccessibilityButton from "../../components/Accessibility/accessibilityButton";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { getOrderDetailsById } from '../../api/orderDetails/orderDetails';
import { themas } from '../../global/themas';

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
    const [orderDetails, setOrderDetails] = useState<any | null>(null);
    const [detailsLoading, setDetailsLoading] = useState(false);
    const navigation = useNavigation<NavigationProp>();

    const openOrderDetails = async (order: any) => {
        setSelectedOrder(order);
        setModalVisible(true);
        setDetailsLoading(true);

        try {
            const details = await getOrderDetailsById(order.orderId);
            setOrderDetails(details);
        } catch (error) {
            console.error('Erro ao buscar detalhes do pedido:', error);
        } finally {
            setDetailsLoading(false);
        }
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
                return 'Pedido pago. Aguardando preparação.';
            case 'PREPARING':
                return 'Pedido em preparação.';
            case 'AVAILABLE':
                return 'Pedido pronto para retirada!';
            case 'FINISHED':
                return 'Pedido finalizado.';
            case 'CANCELED':
                return 'Pedido cancelado.';
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
                        {detailsLoading ? (
                            <ActivityIndicator size="large" color="#007BFF" />
                        ) : orderDetails ? (
                            <>
                                <Text style={styles.modalTitle}>Pedido #{orderDetails.orderId}</Text>
                                <Text style={styles.sectionTitle}>Resumo:</Text>
                                <Text style={styles.orderInfo}>{getFriendlyStatusMessage(orderDetails.status)}</Text>
                                <Text style={styles.orderInfo}>Última atualização: {formatToBrazilianDate(orderDetails.statusDate)}</Text>
                                <Text style={styles.orderInfo}>Código de retirada: {orderDetails.withdrawalCode}</Text>
                                <Text style={styles.orderInfo}>Total: R$ {orderDetails.totalPrice}</Text>
                                <Text style={styles.orderInfo}>Loja: {orderDetails.store.name} - {orderDetails.store.foodCourt}</Text>

                                <Text style={styles.sectionTitle}>Produtos:</Text>
                                <View style={{ maxHeight: 100 }}>
                                    <ScrollView>
                                        {orderDetails.products.map((prod: any, index: number) => (
                                            <Text key={index} style={styles.productItem}>
                                                {prod.quantity}x {prod.productName} - R$ {prod.price.toFixed(2)}
                                            </Text>
                                        ))}
                                    </ScrollView>
                                </View>


                                <View style={{ marginTop: 20 }}>
                                    {orderDetails.status !== 'FINISHED' && orderDetails.status !== 'CANCELED' && (
                                        <Button
                                            title="Acompanhar pedido"
                                            onPress={async () => {
                                                await AsyncStorage.setItem('@lastOrderId', String(orderDetails.orderId));
                                                closeModal();
                                                navigation.navigate('Order');
                                            }}
                                            color={themas.colors.primary}
                                        />
                                    )}
                                    <View style={{ height: 10 }} />
                                    <Button title="Fechar" onPress={closeModal} color="#999" />
                                </View>

                            </>
                        ) : (
                            <Text>Erro ao carregar detalhes.</Text>
                        )}

                    </View>
                </View>
            </Modal>

            <FooterHome />
            <AccessibilityButton />
        </View>
    );

}
