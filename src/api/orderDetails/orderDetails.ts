import order from "../clients/Order";

export async function getOrderDetailsById(orderId: number) {
    try {
        const response = await order.get(`/orders/detail/app`, {
            params: { orderId },
        });
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
        throw error;
    }
}