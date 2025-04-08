import apiLoginCustomer from "../clients/LoginClient";

export async function loginCustomer(email: string, password: string) {
    try {
        const response = await apiLoginCustomer.post("/CustomerLogin", {
            email,
            password,
        });
        return response;
    } catch (error: any) {
        if (error.response) {
            console.error("Erro de resposta do servidor:", error.response.data);
            console.error("Status code:", error.response.status);
            console.error("Headers:", error.response.headers);
            throw new Error(`Erro do servidor: ${error.response.status} - ${error.response.data}`);
        } else if (error.request) {
            console.error("Resposta não recebida:", error.request);
            throw new Error("Nenhuma resposta recebida do servidor. Verifique sua conexão de rede.");
        } else {
            console.error("Erro na requisição:", error.message);
            throw new Error(`Erro na requisição: ${error.message}`);
        }
    }
}