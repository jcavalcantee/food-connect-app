import { useState } from 'react';
import { View, Text, Alert, TouchableOpacity } from 'react-native';
import { style } from "./styles";
import Button from "../../components/Button/button";
import TextInputForms from "../../components/TextInput/inputTextForms";
import HeaderApp from "../../components/Header/header";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { ACCESS_IP_API } from '@env';

// Definir as telas disponíveis na navegação
type RootStackParamList = {
    Login: undefined;
    SolicitacaoEmail: undefined;
};

// Tipar corretamente a navegação
type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // Usar o hook com tipagem correta
    const navigation = useNavigation<NavigationProp>();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Erro", "Preencha todos os campos!");
            return;
        }

        try {
            const response = await fetch(`${ACCESS_IP_API}:8082/CustomerLogin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            Alert.alert(data.status, data.message);
        } catch (error) {
            Alert.alert("Erro", "Erro ao conectar com o servidor" + error);
        }
    };

    return (
        <View style={style.container}>
            <HeaderApp />
            <View style={style.content}>
                <Text style={style.title}>Bem Vindo!</Text>
                <Text style={style.info}>Informe suas credenciais para validação.</Text>
                <TextInputForms placeholder="Digite seu e-mail" value={email} onChangeText={setEmail} />
                <TextInputForms placeholder='Digite sua senha' value={password} onChangeText={setPassword} />
                <View style={style.footer}>
                    <Button onPress={handleLogin} title='Entrar' />
                </View>
                
                {/* Navegação corrigida */}
                <TouchableOpacity onPress={() => navigation.navigate('SolicitacaoEmail')}>
                    <Text style={style.cadastrese}>Cadastre-se aqui</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}
