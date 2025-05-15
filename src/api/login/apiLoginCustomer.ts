import apiLoginCustomer from "../clients/LoginClient";

export async function loginCustomer(email: string, password: string) {
    try {
        const response = await apiLoginCustomer.post("/CustomerLogin", {
            email,
            password,
        });
        return {
            status: 'Sucesso',
            data: response.data,
            message: response.data.message
        };
    } catch (error: any) {
        if (error.response) {
            return {
                status: 'Erro',
                message: error.response.data.message
            };
        } else if (error.request) {
            return {
                status: 'Erro',
                message: "Nenhuma resposta recebida do servidor. Verifique sua conexão de rede."
            };
        } else {
            return {
                status: 'Erro',
                message: `Erro na requisição. Tente novamente mais tarde.`
            };
        }
    }
}