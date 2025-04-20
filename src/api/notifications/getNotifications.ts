import axios from 'axios';
import { ACCESS_IP_API } from '@env';

const api = axios.create({
  baseURL: `${ACCESS_IP_API}:8085`,
  timeout: 10000
});

export const getNotifications = async (customerId: number) => {
  const response = await axios.get(`/notifications/customer/${customerId}`);
  return response.data;
};
