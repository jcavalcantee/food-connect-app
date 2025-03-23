import apiValidation from "../clients/validationClient";

export async function validateAccount(email: string, code: string) {
    try {   
        const response = await apiValidation.post('/code-validation', {
            email: email,
            code: code
        });
        console.info("URL API: ", apiValidation.defaults.baseURL);

        if (response.status === 200) {
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

