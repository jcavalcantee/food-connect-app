
import order from '../clients/Order';



export async function getOrdersByUserId(userId: number, page = 0, size = 10) {
    try {
        const response = await order.get(`/orders/list/byUser`, {
            params: { userId, page, size },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        throw error;
    }
}
