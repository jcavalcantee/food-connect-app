import productClient from "../clients/productClient";

export async function getProducts() {
    try {
        const response = await productClient.get("/product/distinct-query");
        console.info("URL API: ", productClient.defaults.baseURL);
        console.info("Requisição para o IP:", productClient.defaults.baseURL);
        if (response.status === 200) {
            return response.data;
        } else {
            throw new Error(`Status de resposta não esperado: ${response.status}`);
        }
    } catch (error: any) {
        if (error.response) {
            console.error("Erro de resposta do servidor:", error.response.data);
            console.error("Status code:", error.response.status);
            console.error("Headers:", error.response.headers);
        } else if (error.request) {
            console.error("Resposta não recebida:", error.request);
        } else {
            console.error("Erro na requisição:", error.message);
        }
        throw error;
    }
}