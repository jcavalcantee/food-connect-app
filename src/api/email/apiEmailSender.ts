import { Alert } from "react-native";
import apiEmailSender from "../clients/emailClient";
import { ACCESS_IP_API } from "@env";

export async function sendValidationCode(email: string) {
    const validDomains = /@(senacsp\.edu\.br|sp\.senac\.br)$/;

    if (!validDomains.test(email)) {
        Alert.alert("Domínio de email inválido.");
        return;
    }

    try {
        console.info("Email enviado para: ", email);
        console.info("Requisição para o IP:", ACCESS_IP_API);
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
            Alert.alert("Erro do servidor", `Status: ${error.response.status}\nMensagem: ${error.response.data}`);
        } else if (error.request) {
            console.error("Resposta não recebida:", error.request);
            Alert.alert("Erro de rede", "Nenhuma resposta recebida do servidor. Verifique sua conexão de rede.");
        } else {
            console.error("Erro na requisição:", error.message);
            Alert.alert("Erro na requisição", `Mensagem: ${error.message}`);
        }
        console.error("Config:", error.config);
        throw error;
    }
};

