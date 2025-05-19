import apiValidation from "../clients/validationClient";

export async function validateAccount(email: string, code: string) {
    try {
        const response = await apiValidation.post('/code-validation', {
            email: email,
            code: code
        });
        return {
            status: 'Sucesso',
            message: response.data.message || "Conta validada com sucesso!"
        };
    } catch (error: any) {
        if (error.response) {
            return {
                status: 'Erro',
                message: error.response.data.message || "Erro ao validar conta. Tente novamente."
            };
        } else if (error.request) {
            return {
                status: 'Erro',
                message: "Nenhuma resposta recebida do servidor. Verifique sua conexão de rede."
            };
        } else {
            return {
                status: 'Erro',
                message: "Erro na requisição. Tente novamente mais tarde."
            };
        }
    }
};