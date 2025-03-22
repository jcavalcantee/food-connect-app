import { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { style } from "./styles"
import Button from "../../components/Button/button"
import TextInputForms from "../../components/TextInput/inputTextForms"
import HeaderApp from "../../components/Header/header"

import { sendValidationCode, getKeys } from "../../api/email/apiEmailSender"

export default function Header() {
    const [email, setEmail] = useState<string>('');

    const handleValidationEmail = async () => {
        try {
            if (!email) {
                Alert.alert("Please, provide an email address.")
                return;
            }
            const response = await sendValidationCode(email);

            if (response.success) {
                Alert.alert("Successful on sending email!")
            } else {
                Alert.alert("Error on sending email")
            }
        } catch (error) {
            Alert.alert("Something gone wrong")
        }
    }

    const handleGetKeys = async () => {
        try {
            const keys = await getKeys();
            console.log(keys);  // Apenas para verificar as chaves
            Alert.alert("Keys fetched successfully!");
        } catch (error) {
            console.error("Failed to fetch keys:", error);
            Alert.alert("Failed to fetch keys.");
        }
    }
    
    return (
        <View style={style.container}>
            <HeaderApp />
            <View style={style.content}>
                <Text style={style.title}>Informe seu email</Text>
                <Text style={style.info}>Informe seu e-mail institucional para validação.</Text>
                <TextInputForms placeholder="Digite seu e-mail" value={email} onChangeText={setEmail}/>
                <Button onPress={handleValidationEmail} title='Confirmar'/>
                <Text style={style.backToLogin}>Voltar para o login</Text>
            </View>
        </View>
    );
}