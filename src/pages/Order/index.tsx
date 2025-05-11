import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import { styles } from './styles';
import HeaderApp from '../../components/Header/header';
import FooterHome from '../../components/FooterHome';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderScreen = () => {
  const [order, setOrder] = useState<any>(null);

  const formatToBrazilianDate = (dateString: string) => {
      const date = new Date(dateString.replace(' ', 'T')); // Corrige para padrão ISO
      return date.toLocaleString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    };

  useEffect(() => {
    const loadOrder = async () => {
      const orderString = await AsyncStorage.getItem('@lastOrder');
      if (orderString) {
        setOrder(JSON.parse(orderString));
      }
    };
    loadOrder();
  }, []);

  if (!order) {
    return (
      <View style={styles.container}>
        <HeaderApp />
        <View style={styles.content}>
          <Text style={styles.sectionTitle}>Carregando pedido...</Text>
        </View>
        <FooterHome />
      </View>
    );

    

  }

  return (
    <View style={styles.container}>
      <HeaderApp />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.sectionTitle}>Previsão de disponibilidade</Text>
        <Text style={styles.time}>
          {formatToBrazilianDate(order.availabilityForecast) ?? 'Não informada'}
        </Text>

        <Text style={styles.sectionTitle}>Atualização em tempo real</Text>
        <View style={styles.codeContainer}>
          <Text style={styles.codeText}>Código para retirar o pedido</Text>
          <View style={styles.codeBox}>
            <Text style={styles.code}>
              {order.withdrawalCode ?? '----'}
            </Text>
          </View>
        </View>

        <View style={styles.progressBarContainer}>
          <View style={styles.progressBarFilled} />
          <View style={styles.progressBarEmpty} />
        </View>
        <Text style={styles.statusText}>
          {order.status ?? 'Preparando seu pedido'}
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Informações da loja:</Text>
          <Text style={styles.storeName}>
            {order.store?.name ?? 'Nome da loja não disponível'}
          </Text>
          <Text style={styles.storeLocation}>
            Localização: {order.store?.foodCourt ?? '---'}
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
    </View>
  );
};

export default OrderScreen;
