import registerCustomerClient from "../clients/registerCustomerClient";

export async function resetPasswordCustomer(email: string, password: string) {
    try {
        const response = await registerCustomerClient.patch('/customer/resetPassword', {
            email,
            password,
        });

        if (response.status === 200) {
            return response;
        } else if (response.status === 404) {
            console.error("Credential not found.");
            throw new Error("credential not found.");
        } else if (response.status === 409) {
            console.error("Email already registered.");
            throw new Error("email already registered.");
        } else {
            console.error("Unexpected response status:", response.status);
            throw new Error(`Unexpected response status: ${response.status}`);
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
}