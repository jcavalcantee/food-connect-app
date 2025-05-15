import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import Logo from "../../assets/images/icon.png";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { style } from "./styles";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import AccessibilityButton from "../../components/Accessibility/accessibilityButton";
import InfoModal from '../../components/InfoModal';

type RootStackParamList = {
  StoreProducts: undefined;
  Payment: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'StoreProducts'>;

type CartItem = {
  id: number;
  nome: string;
  preco: number;
  imagem: string;
  quantidade: number;
  estimativa?: string;
};
export default function SacolaScreen() {
  const navigation = useNavigation<NavigationProp>();
  const [items, setItems] = useState<CartItem[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalMessage, setModalMessage] = useState<string>('');
  const [onModalCloseAction, setOnModalCloseAction] = useState<(() => void) | null>(null);

  useFocusEffect(
    React.useCallback(() => {
      const fetchCart = async () => {
        const storedCart = await AsyncStorage.getItem('@cartItems');
        if (storedCart) {
          setItems(JSON.parse(storedCart));
        } else {
          console.log('Carrinho limpo após finalização do pedido');
          setItems([]);
        }
      };
      fetchCart();
    }, [])
  );

  const updateCart = async (newItems: CartItem[]) => {
    setItems(newItems);
    await AsyncStorage.setItem('@cartItems', JSON.stringify(newItems));
  };

  const clearCart = async () => {
    await AsyncStorage.removeItem('@cartItems');
    setItems([]);
  };

  const increaseQuantity = (id: number) => {
    const newItems = items.map(item =>
      item.id === id ? { ...item, quantidade: item.quantidade + 1 } : item
    );
    updateCart(newItems);
  };

  const decreaseQuantity = (id: number) => {
    const newItems = items
      .map(item =>
        item.id === id ? { ...item, quantidade: item.quantidade - 1 } : item
      )
      .filter(item => item.quantidade > 0);
    updateCart(newItems);
  };

  const goToPayment = () => {
    if (items.length > 0) {
      navigation.navigate('Payment');
    } else {
      setModalTitle("Erro");
      setModalMessage("Preencha o carrinho antes de continuar!");
      setModalVisible(true);
      return;
    }
  }

  const total = items.reduce((acc, item) => acc + item.preco * item.quantidade, 0);

  const parseEstimativa = (estimativa?: string): number => {
    if (!estimativa) return 0;
    if (estimativa.toLowerCase().includes('pronta')) return 0;

    const match = estimativa.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
  };

  const maiorEstimativa = items.length > 0 ? Math.max(...items.map(item => parseEstimativa(item.estimativa))) : 0;

  const prazoEntrega = maiorEstimativa === 0 ? 'Pronta entrega' : `${maiorEstimativa} minutos`;
  AsyncStorage.setItem('@prazoEntrega', prazoEntrega);

  const handleModalClose = () => {
    setModalVisible(false);
    if (onModalCloseAction) {
      onModalCloseAction();
      setOnModalCloseAction(null);
    }
  };

  return (
    <ScrollView contentContainerStyle={style.container}>
      <TouchableOpacity style={style.backButton} onPress={() => navigation.goBack()}>
        <Text style={style.backText}>{'<'}</Text>
      </TouchableOpacity>

      <Text style={style.title}>SACOLA</Text>

      <View style={style.storeHeader}>
        <Image source={Logo} style={style.logo} />
        <View>
          <Text style={style.storeName}>Engenheiros do Açaí</Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={style.addMore}>Adicionar mais itens</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={style.sectionTitle}>Itens adicionados</Text>

      <TouchableOpacity style={style.clearButton} onPress={clearCart}>
        <Text style={style.clearText}>Limpar</Text>
      </TouchableOpacity>

      <View style={style.itemsContainer}>
        <ScrollView>
          {items.map(item => (
            <View key={item.id} style={style.item}>
              <Image source={{ uri: item.imagem }} style={style.itemImage} />
              <View style={style.itemDetails}>
                <Text style={style.itemName}>{item.nome}</Text>
                <Text style={style.itemPrice}>R${(item.preco * item.quantidade).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
                <Text style={style.itemSubtitle}>Previsão: {item.estimativa || 'Previsão indisponível'}</Text>
              </View>
              <View style={style.quantityBox}>
                <TouchableOpacity onPress={() => decreaseQuantity(item.id)}>
                  <Text style={style.quantityButton}>-</Text>
                </TouchableOpacity>
                <Text style={style.quantityText}>{item.quantidade}</Text>
                <TouchableOpacity onPress={() => increaseQuantity(item.id)}>
                  <Text style={style.quantityButton}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>

      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Text style={style.addMore}>Adicionar mais itens</Text>
      </TouchableOpacity>

      <View style={style.summary}>
        <Text style={style.summaryTitle}>Resumo do pedido</Text>
        <View style={style.summaryRow}>
          <Text>Total de itens</Text>
          <Text>{items.reduce((sum, item) => sum + item.quantidade, 0)}</Text>
        </View>
        <View style={style.summaryRow}>
          <Text>Prazo de entrega</Text>
          <Text>{prazoEntrega}</Text>
        </View>
        <View style={style.summaryRow}>
          <Text>Total do pedido</Text>
          <Text>R${total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
        </View>
        <View style={style.summaryRow}>
          <Text>Pagamento</Text>
          <Text>PIX</Text>
        </View>
      </View>

      <TouchableOpacity style={style.payButton} onPress={() => goToPayment()}>
        <Text style={style.payText}>Pagar R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
      </TouchableOpacity>
      <AccessibilityButton />
      <InfoModal
        visible={modalVisible}
        onClose={handleModalClose}
        title={modalTitle}
        message={modalMessage}
      />
    </ScrollView>


  );
}
