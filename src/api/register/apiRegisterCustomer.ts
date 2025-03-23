import { Alert } from "react-native";
import registerCustomerClient from "../clients/registerCustomerClient";

type RegisterCustomerForm = {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
}

export async function registerCustomer(customer: RegisterCustomerForm) {
    try {
        if (!customer.email.includes("@senacsp.edu.br") && !customer.email.includes("@sp.senac.br")) {
            Alert.alert("Domínio de email inválido.");
            throw new Error("Domínio de email inválido.");
        }
        console.info("Cadastrando cliente: ", customer);
        const response = await registerCustomerClient.post(`/customer/register`, customer);

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