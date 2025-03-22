import apiEmailSender from "../clients/emailClient";

export async function sendValidationCode(email: string) {
    try {
        if (!email.includes("@senacsp.edu.br") && !email.includes("@sp.senac.br")) {
            throw new Error("Domínio de email inválido.");
        }
        console.info("Email enviado para: ", email);
        const response = await apiEmailSender.post(`/send-email?email=${email}`);
        console.info("URL API: ", apiEmailSender.defaults.baseURL);

        if (response.status === 201) {
            console.info(response.data);
            return response.status; 
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
        console.error("Config:", error.config);
        throw error;
    }
};

