import axios from 'axios';

const ACCESS_IP_API = process.env.EXPO_PUBLIC_ACCESS_IP_API;

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

export async function updateCustomerData(customer: { name: string; email: string; phoneNumber: string }) {
    try {
        const response = await customerClient.put('/customer/update', customer);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao atualizar dados do cliente');
    }
}

export async function updatePassword(data: { email: string; password: string }) {
    try {
        const response = await customerClient.put('/customer/updatePassword', data);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao atualizar senha');
    }
}

export default customerClient;
