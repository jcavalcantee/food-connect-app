import { useEffect, useState } from 'react';
import { View, Text, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { style } from "./styles";
import Button from "../../components/Button/button";
import TextInputForms from "../../components/TextInput/inputTextForms";
import HeaderApp from "../../components/Header/header";
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendValidationCode } from "../../api/email/apiEmailSender";
import { useNavigation } from '@react-navigation/native';
import LoadingModal from "../../components/LoadingModal"; 

type RootStackParamList = {
    Login: undefined;
    SolicitacaoEmail: undefined;
    EmailValidation: undefined;
};

type SolicitacaoEmailNavigationProp = StackNavigationProp<RootStackParamList, 'SolicitacaoEmail'>;

export default function SolicitacaoEmail() {
    const [email, setEmail] = useState<string>('');
    const [savedValue, setSavedValue] = useState('');
    const [loading, setLoading] = useState(false); // Estado do modal de loading
    
    const navigation = useNavigation<SolicitacaoEmailNavigationProp>();

    const handleValidationEmail = async () => {
        if (!email) {
            Alert.alert("Por favor, insira um email!");
            return;
        }

        try {
            setLoading(true); // Ativa o modal de loading
            const response = await sendValidationCode(email);

            if (response === 201) {
                Alert.alert("Email enviado com sucesso!");
                await saveValue(email);
                navigation.navigate('EmailValidation');
            } else {
                Alert.alert("Erro no envio do email");
            }
        } catch (error) {
            Alert.alert("Algo deu errado.\nTente mais tarde!");
        } finally {
            setLoading(false); // Desativa o modal de loading
        }
    };

    const saveValue = async (email: string) => {
        try {
            await AsyncStorage.setItem('email', email);
            setSavedValue(email);
            console.info(`Email enviado com sucesso para: ${email}`);
        } catch (e) {
            console.error("Erro ao salvar email", e);
        }
    };

    const getSavedValue = async () => {
        try {
            const value = await AsyncStorage.getItem('email');
            if (value) {
                setSavedValue(value);
            }
        } catch (e) {
            console.error("Erro ao recuperar email", e);
        }
    };

    useEffect(() => {
        getSavedValue();
    }, []);

    return (
        <View style={style.container}>
            <HeaderApp />
            <View style={style.content}>
                <Text style={style.title}>Informe seu email</Text>
                <Text style={style.info}>Informe seu e-mail institucional para validação.</Text>
                
                <TextInputForms 
                    placeholder="Digite seu e-mail" 
                    value={email} 
                    onChangeText={setEmail} 
                />

                {loading ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                    <Button onPress={handleValidationEmail} title='Confirmar' />
                )}

                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={style.backToLogin}>Voltar para o login</Text>
                </TouchableOpacity>
            </View>
            <LoadingModal visible={loading} />
        </View>
    );
}
