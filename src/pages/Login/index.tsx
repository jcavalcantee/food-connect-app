import { useState } from 'react';
import { View, Text, Alert } from 'react-native';
import { style } from "./styles";
import Button from "../../components/Button/button";
import TextInputForms from "../../components/TextInput/inputTextForms";
import HeaderApp from "../../components/Header/header";

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Erro", "Preencha todos os campos!");
            return;
        }

        try {
            const response = await fetch('https://suaapi.com/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert("Sucesso", "Login realizado!");
                console.log("Token recebido:", data.token);
            } else {
                Alert.alert("Erro", data.message || "Falha no login");
            }
        } catch (error) {
            Alert.alert("Erro", "Erro ao conectar com o servidor");
        }
    };

    return (
        <View style={style.container}>
            <HeaderApp />
            <View style={style.content}>
                <Text style={style.title}>Bem Vindo!</Text>
                <Text style={style.info}>Informe suas credenciais para validação.</Text>
                <TextInputForms placeholder="Digite seu e-mail" value={email} onChangeText={setEmail}/>
                <TextInputForms placeholder='Digite sua senha' value={password} onChangeText={setPassword}/>
                <Button onPress={handleLogin} title='Entrar'/>
                <Text style={style.cadastrese}>Cadastre-se aqui</Text>
            </View>
        </View>
    );
}