import { useState } from 'react';
import { View, Text, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { style } from "./styles";
import TextInputForms from "../../components/TextInput/inputTextForms";
import HeaderApp from "../../components/Header/header";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCESS_IP_API } from '@env';

type RootStackParamList = {
    Login: undefined;
    SolicitacaoEmail: undefined;
    Home: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<string | null>(null);

    const navigation = useNavigation<NavigationProp>();

    const validateEmail = (email: string) => {
        const allowedDomains = ["@senacsp.edu.br", "@sp.senac.br"];
        const isValid = allowedDomains.some(domain => email.endsWith(domain));

        if (!isValid) {
            setEmailError("Use um e-mail institucional válido");
        } else {
            setEmailError(null);
        }

        setEmail(email);
    };

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Erro", "Preencha todos os campos!");
            return;
        }

        if(emailError) {
            Alert.alert("Erro", "Corrija o e-mail antes de continuar!");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch(`${ACCESS_IP_API}:8082/CustomerLogin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if(response.status === 200) {
                await AsyncStorage.setItem("userInfo", JSON.stringify(data.customerInfo));
                Alert.alert(data.status, data.message);
                console.log("Bateu aqui");
                navigation.navigate('Home');
            } else {
                Alert.alert(data.status, data.message);
            }
        } catch (error) {
            Alert.alert("Erro", "Erro ao conectar com o servidor" + error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={style.container}>
            <HeaderApp />
            <View style={style.content}>
                <Text style={style.title}>Bem Vindo!</Text>
                <Text style={style.info}>Informe suas credenciais para validação.</Text>
                <TextInputForms placeholder="Digite seu e-mail" value={email} onChangeText={validateEmail} />
                {emailError && <Text style={style.errorText}>{emailError}</Text>}
                <TextInputForms placeholder='Digite sua senha' value={password} onChangeText={setPassword} secureTextEntry />
            </View>
            <View style={style.footer}>
                <TouchableOpacity style={style.button} onPress={handleLogin} disabled={loading} >
                    {loading ? (
                        <ActivityIndicator size='small' color='#fff' />
                    ) : (
                        <Text style={style.buttonText}>Entrar</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('SolicitacaoEmail')}>
                    <Text style={style.cadastrese}>Cadastre-se aqui</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}