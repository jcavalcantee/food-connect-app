import React, { useEffect } from 'react';
import Routes from './src/routes';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Platform } from 'react-native';
import { OrderStatusProvider } from './OrderStatusProvider';
import { NavigationContainer } from '@react-navigation/native';

// Configura o comportamento padrão das notificações
Notifications.setNotificationHandler({
  handleNotification: async (notification) => ({
    shouldShowAlert: true, // Mostra notificação na tela
    shouldPlaySound: true, // Toca som
    shouldSetBadge: false, // Não configura o número de notificações no ícone
    shouldShowBanner: true, // Mostra banner de notificação
    shouldShowList: true, // Mostra notificação na lista
  }),
});

export default function App() {
  useEffect(() => {
    const registerForPushNotifications = async () => {
      try {
        if (Device.isDevice) {
          // Solicitar permissões para notificações
          const { status: existingStatus } = await Notifications.getPermissionsAsync();
          let finalStatus = existingStatus;

          if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
          }

          if (finalStatus !== 'granted') {
            console.warn('Permissão para notificações negada!');
            return;
          }

          // Obter o token para notificações push
          const token = await Notifications.getExpoPushTokenAsync();
          console.log('Expo Push Token:', token.data);
        } else {
          console.warn('Notificações só funcionam em dispositivos físicos.');
        }

        // Configuração do canal de notificação para Android
        if (Platform.OS === 'android') {
          await Notifications.setNotificationChannelAsync('order-status-channel', {
            name: 'Atualizações de Pedido',
            importance: Notifications.AndroidImportance.HIGH,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
          });
        }
      } catch (error) {
        console.error('Erro ao registrar para notificações:', error);
      }
    };

    registerForPushNotifications();
  }, []);

  return (
    <NavigationContainer>
      <SafeAreaProvider>
        <OrderStatusProvider>
          <Routes />
        </OrderStatusProvider>
      </SafeAreaProvider>
    </NavigationContainer>
  );
}
