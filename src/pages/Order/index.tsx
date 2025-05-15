import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { styles } from './styles';
import HeaderApp from '../../components/Header/header';
import FooterHome from '../../components/FooterHome';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connectToOrderUpdates, disconnectFromOrderUpdates } from '../../api/order/sse';
import AccessibilityButton from "../../components/Accessibility/accessibilityButton";
import * as Notifications from 'expo-notifications';
import { getOrderId } from '../../api/order/order';

const OrderScreen = () => {
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    const subscribeToOrderUpdates = async () => {
      const orderId = await AsyncStorage.getItem('@lastOrderId');
      if (orderId) {
        const orderData = await getOrderId(Number(orderId));
        setOrder(orderData);

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
      }
    };

    subscribeToOrderUpdates();

    return () => {
      disconnectFromOrderUpdates();
    };
  }, []);


  const formatToBrazilianDate = (dateString: string | undefined | null) => {
    if (!dateString || typeof dateString !== 'string') {
      return 'Não informada';
    }

    if (dateString === 'Pronta entrega') {
      return 'Pronta entrega';
    }

    const date = new Date(dateString.replace(' ', 'T')); // Corrige para padrão ISO
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getProgressPercentage = (status: string) => {
    switch (status) {
      case 'PAID':
        return 0.25;
      case 'PREPARING':
        return 0.5;
      case 'AVAILABLE':
        return 0.75;
      case 'FINISHED':
        return 1;
      default:
        return 0;
    }
  };

  const getFriendlyStatusMessage = (status: string | undefined) => {
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
        return 'Status desconhecido.';
    }
  };


  return (
    <View style={styles.container}>
      <HeaderApp />
      <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.sectionTitle}>Número do pedido:</Text>
          <Text style={styles.titleText}>{order?.orderId ?? '----'}</Text>
        <Text style={styles.sectionTitle}>Previsão de disponibilidade</Text>
        <Text style={styles.time}>
          {order?.availabilityForecast ? formatToBrazilianDate(order.availabilityForecast) : 'Não informada'}
        </Text>


        <Text style={styles.sectionTitle}>Atualização em tempo real</Text>
        <View style={styles.codeContainer}>
          <Text style={styles.codeText}>Código para retirar o pedido</Text>
          <View style={styles.codeBox}>
            <Text style={styles.code}>
              {order?.withdrawalCode ?? '----'}
            </Text>
          </View>
        </View>

        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFilled, { flex: getProgressPercentage(order?.status) }]} />
          <View style={[styles.progressBarEmpty, { flex: 1 - getProgressPercentage(order?.status) }]} />
        </View>

        <Text style={styles.statusText}>
          {getFriendlyStatusMessage(order?.status)}
        </Text>


        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Informações da loja:</Text>
          <Text style={styles.storeName}>
            {order?.store?.name ?? 'Nome da loja não disponível'}
          </Text>
          <Text style={styles.storeLocation}>
            Localização: {order?.store?.foodCourt ?? '---'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Observações:</Text>
          <Text style={styles.observationText}>
            Após a confirmação de disponibilidade de retirada do pedido, o cliente terá 15 minutos corridos para retirar os itens. Caso a retirada não ocorra, a loja terá a opção de cancelar o pedido sem opção de reembolso para o cliente.
          </Text>
        </View>
      </ScrollView>
      <FooterHome />
      <AccessibilityButton />
    </View>
  );
};

export default OrderScreen;