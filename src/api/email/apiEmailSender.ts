import { Alert } from "react-native";
import apiEmailSender from "../clients/emailClient";

const ACCESS_IP_API = process.env.EXPO_PUBLIC_ACCESS_IP_API;

export async function sendValidationCode(email: string) {
    const validDomains = /@(senacsp\.edu\.br|sp\.senac\.br)$/;

    if (!validDomains.test(email)) {
        return { status: 'Erro', message: "Domínio de email inválido." };
    }

    try {
        const response = await apiEmailSender.post(`/send-email?email=${email}`);

        if (response.status === 201) {
            return { status: 'Sucesso', message: "Email enviado com sucesso!" };
        } else {
            return { status: 'Erro', message: `${response.data.message}` };
        }
    } catch (error: any) {
        if (error.response) {
            return {
                status: 'Erro',
                message: `${error.response.data}`
            };
        } else if (error.request) {
            return {
                status: 'Erro',
                message: "Erro de rede: Nenhuma resposta recebida do servidor. Verifique sua conexão de rede."
            };
        } else {
            return {
                status: 'Erro',
                message: `Erro na requisição. Tente novamente mais tarde.`
            };
        }
    }
};

export async function sendResetPasswordValidationCode(email: string) {
    const validDomains = /@(senacsp\.edu\.br|sp\.senac\.br)$/;

    if (!validDomains.test(email)) {
        return { status: 'Erro', message: "Domínio de email inválido." };
    }

    try {
        const response = await apiEmailSender.post(`/send-email/resetPassword?email=${email}`);

        if (response.status === 201) {
            return { status: 'Sucesso', message: "Email enviado com sucesso!" };
        } else {
            return { status: 'Erro', message: `${response.data.message}` };
        }
    } catch (error: any) {
        if (error.response) {
            return {
                status: 'Erro',
                message: `${error.response.data}`
            };
        } else if (error.request) {
            return {
                status: 'Erro',
                message: "Erro de rede: Nenhuma resposta recebida do servidor. Verifique sua conexão de rede."
            };
        } else {
            return {
                status: 'Erro',
                message: `Erro na requisição. Tente novamente mais tarde.`
            };
        }
    }
}