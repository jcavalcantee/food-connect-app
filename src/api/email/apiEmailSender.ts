import apiEmailSender from "../clients/emailClient";

export async function sendValidationCode(email: string) {
    try {
        if (!email.includes("@senacsp.edu.br") && !email.includes("@sp.senac.br")) {
            throw new Error("Invalid email domain.")
        }
        console.warn("Email sent to: ", email);
        const response = await apiEmailSender.post(`?email=${email}`);
        
        console.warn("Email sent successfully", response.data);
        return response.data;
    } catch (error) {
        console.error("Error on sending email", error);
        throw error;
    }
};

// Exemplo de exportação no arquivo apiEmailSender.ts
export async function getKeys() {
    const response = await fetch('http://192.168.0.1:8080/all-keys', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json();
}

