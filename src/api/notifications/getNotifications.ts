import axios from 'axios';
import { ACCESS_IP_API } from '@env';

const api = axios.create({
  baseURL: `${ACCESS_IP_API}:8085`,
  timeout: 20000, // Aumentado para 20 segundos
});

export const getNotifications = async (customerId: any) => {
  if (!customerId) {
    throw new Error("O customerId é obrigatório para buscar notificações.");
  }

  try {
    const response = await api.get(`/notifications/customer/${customerId}`);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar notificações:", error);
    throw error;
  }
};