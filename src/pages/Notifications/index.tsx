import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, SafeAreaView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from './styles';
import { getNotifications } from '../../api/notifications/getNotifications';

const Notifications = () => {
  interface Notification {
    id: number;
    status: string;
    timestamp: string;
    read: boolean;
  }
  
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        setLoading(true);

        const userInfoString = await AsyncStorage.getItem("userInfo");
        if (!userInfoString) {
          throw new Error("Usuário não encontrado no AsyncStorage.");
        }

        const userInfo = JSON.parse(userInfoString);
        const customerId = userInfo.id;

        console.log("Customer ID:", customerId); // Verifique o valor aqui

        if (!customerId) {
          throw new Error("ID do cliente não encontrado.");
        }

        const data = await getNotifications(customerId);
        setNotifications(data);
      } catch (err) {
        console.error("Erro ao buscar notificações:", err);
        setError("Erro ao carregar notificações. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Carregando notificações...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notificações</Text>
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.notification}>
            <Text style={styles.status}>Status: {item.status}</Text>
            <Text style={styles.date}>Data: {new Date(item.timestamp).toLocaleString()}</Text>
            <Text style={styles.read}>
              Lida: {item.read ? "Sim" : "Não"}
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default Notifications;