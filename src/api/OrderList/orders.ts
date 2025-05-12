
import order from '../clients/Order';



export async function getOrdersByUserId(userId: number) {
    try {
        const response = await order.get(`/orders/user-orders?userId=${userId}`);
        return response.data; // Retorna os pedidos
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        throw error;
    }
}