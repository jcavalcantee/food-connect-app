import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Clipboard } from 'react-native';
import { styles } from './styles'
import { Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import order from '../../api/clients/Order'; // ajuste o caminho se necessário
import AsyncStorage from '@react-native-async-storage/async-storage';
import AccessibilityButton from "../../components/Accessibility/accessibilityButton";
import InfoModal from '../../components/InfoModal';
// ...outros imports...

// Define your navigation param list
type RootStackParamList = {
  PaymentScreen: undefined;
  Order: undefined;
};

const createOrder = async (customerId: number, paymentType: string, expectedDeliveryTime: string) => {
  try {
    const storedCart = await AsyncStorage.getItem('@cartItems');

    if (!storedCart) {
      alert("Carrinho vazio.");
      return;
    }

    const items = JSON.parse(storedCart);
    const cartInfo = items.map((item: any) => ({
      productId: item.id,
      quantity: item.quantidade,
      unitPrice: item.preco
    }));

    const orderData = {
      customerId,
      paymentType,
      expectedDeliveryTime,
      cartInfo
    };

    console.info("Enviando pedido:", JSON.stringify(orderData, null, 2));

    const response = await order.post('/orders/register', orderData);

    if (response.status === 201 || response.status === 200) {
      console.log("Pedido enviado com sucesso!", response.data);
      const orderId = response.data?.orderId;
      await AsyncStorage.setItem('@lastOrderId', String(orderId));
      await AsyncStorage.removeItem('@cartItems');
    } else {
      throw new Error(`Erro inesperado: status ${response.status}`);
    }
  } catch (error: any) {
    alert('Erro ao enviar pedido: ' + (error?.message || 'Erro desconhecido'));
    console.error('Erro ao enviar pedido:', error);
  }
};


const PaymentScreen = () => {
  const navigation = useNavigation<import('@react-navigation/native').NavigationProp<RootStackParamList>>();
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutos em segundos
  const pixCode = '0020150840358408.BR...';
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalMessage, setModalMessage] = useState<string>('');
  const [onModalCloseAction, setOnModalCloseAction] = useState<(() => void) | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const copyToClipboard = async () => {
    try {
      Clipboard.setString(pixCode);
      setModalTitle("Aviso");
      setModalMessage("Código copiado!");
      setModalVisible(true);

      const userInfoString = await AsyncStorage.getItem("userInfo");

      if (!userInfoString) {
        setModalTitle("Erro");
        setModalMessage("Usuário não encontrado no armazenamento.");
        setModalVisible(true);
        return;
      }

      const userInfo = JSON.parse(userInfoString);
      const customerId = userInfo?.id || userInfo?.customerId; // ajuste aqui conforme a estrutura real

      if (!customerId) {
        setModalTitle("Erro");
        setModalMessage("ID do cliente não encontrado nos dados do usuário.");
        setModalVisible(true);
        return;
      }

      const prazo = await AsyncStorage.getItem('@prazoEntrega');
      await createOrder(customerId, "PIX", prazo ?? "Pronta entrega");

      setTimeout(() => {
        navigation.navigate('Order');
      }, 5000);

    } catch (error) {
      setModalTitle("Erro");
      setModalMessage("Erro ao processar pedido. Tente novamente mais tarde!");
      setModalVisible(true);
      console.error(error);
    }
  };

  // const progressWidth = `${((5 * 60 - timeLeft) / (5 * 60)) * 100}%`;
  const screenWidth = Dimensions.get('window').width;
  const progressWidth = ((5 * 60 - timeLeft) / (5 * 60)) * screenWidth;

  const handleModalClose = () => {
    setModalVisible(false);
    if (onModalCloseAction) {
      onModalCloseAction();
      setOnModalCloseAction(null);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PAGAMENTO</Text>
      <Image
        source={require('../../assets/images/pixLogo.png')}
        style={styles.logo}
      />
      <Text style={styles.subtitle}>PEDIDO AGUARDANDO PAGAMENTO</Text>
      <Text style={styles.instruction}>
        Copie o código abaixo e utilize o Pix Copia e Cola no aplicativo que irá utilizar para realizar o pagamento
      </Text>

      <View style={styles.inputContainer}>
        <TextInput value={pixCode} editable={false} style={styles.input} />
        <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
          <Text style={styles.copyText}>📋</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.timerLabel}>Tempo para pagamento:</Text>
      <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: progressWidth }]} />
      </View>
      <AccessibilityButton />
      <InfoModal
        visible={modalVisible}
        onClose={handleModalClose}
        title={modalTitle}
        message={modalMessage}
      />
    </View>
  );
};

export default PaymentScreen;
