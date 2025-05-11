import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import order from "../clients/Order";

type CartItem = {
  productId: number;
  quantity: number;
  unitPrice: number;
};

type OrderData = {
  customerId: number;
  paymentType: string;
  expectedDeliveryTime: string;
  cartInfo: CartItem[];
};

export async function createOrder(
  customerId: number,
  paymentType: string,
  expectedDeliveryTime: string
): Promise<number | void> {
  try {
    const storedCart = await AsyncStorage.getItem('@cartItems');

    if (!storedCart) {
      Alert.alert("Erro", "Carrinho vazio.");
      throw new Error("Carrinho vazio.");
    }

    const items = JSON.parse(storedCart);
    const cartInfo: CartItem[] = items.map((item: any) => ({
      productId: item.id,
      quantity: item.quantidade,
      unitPrice: item.preco,
    }));

    const orderData: OrderData = {
      customerId,
      paymentType,
      expectedDeliveryTime,
      cartInfo,
    };

    console.info("Enviando pedido:", JSON.stringify(orderData, null, 2));

    const response = await order.post(`/orders/register`, orderData);

    if (response.status === 201 || response.status === 200) {
      console.info("Pedido registrado com sucesso:", response.data);
      return response.status;
    } else {
      throw new Error(`Status de resposta inesperado: ${response.status}`);
    }
  } catch (error: any) {
    if (error.response) {
      console.error("Erro de resposta do servidor:", error.response.data);
      console.error("Status code:", error.response.status);
      console.error("Headers:", error.response.headers);
      Alert.alert("Erro", error.response.data?.message || "Erro do servidor.");
    } else if (error.request) {
      console.error("Sem resposta do servidor:", error.request);
      Alert.alert("Erro", "Servidor não respondeu.");
    } else {
      console.error("Erro ao criar pedido:", error.message);
      Alert.alert("Erro", "Erro ao criar pedido.");
    }
    console.error("Configuração da requisição:", error.config);
    throw error;
  }
}
