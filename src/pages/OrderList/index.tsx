// Orders/index.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getOrdersByUserId } from '../../api/OrderList/orders';
import styles from './styles';


export default function OrderList() {

    
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const userInfo = await AsyncStorage.getItem('userInfo');
                if (userInfo) {
                    const { id } = JSON.parse(userInfo);
                    const response = await getOrdersByUserId(id);
                    setOrders(response);
                }
            } catch (error) {
                console.error('Erro ao buscar pedidos:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#007BFF" />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Meus Pedidos</Text>
            <FlatList
                data={orders}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.orderItem}>
                        <Text style={styles.orderText}>Pedido: {item.productName}</Text>
                        <Text style={styles.orderText}>Status: {item.orderStatus}</Text>
                        <Text style={styles.orderText}>Preço: {item.price}</Text>
                    </View>
                )}
            />
        </View>
    );
}
