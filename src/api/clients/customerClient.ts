import axios from 'axios';
import { ACCESS_IP_API } from '@env';

const customerClient = axios.create({
    baseURL: `${ACCESS_IP_API}:8083`,
    timeout: 10000
});

export async function getCustomerData(email: string) {
    try {
        const response = await customerClient.get(`/customer?email=${email}`);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao buscar dados do cliente');
    }
}

export async function updateCustomerData(customer: { name: string; email: string; phoneNumber: string; password: string }) {
    try {
        const response = await customerClient.put('/customer/alter', customer);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao atualizar dados do cliente');
    }
}

export default customerClient;