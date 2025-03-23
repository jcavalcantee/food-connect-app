import { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { style } from "./styles"
import HeaderApp from "../../components/Header/header"
import ValidationCode from "../../components/TextInputCode/inputTextCode"
import Button from "../../components/Button/button"
import AsyncStorage from '@react-native-async-storage/async-storage'
import { validateAccount } from "../../api/validation/apiValidation"
import { sendValidationCode } from '../../api/email/apiEmailSender';

type RootStackParamList = {
    EmailValidation: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EmailValidation'>;

interface Props {
    navigation: HomeScreenNavigationProp;
}

export default function EmailValidation() {

    const [timeLeft, setTimeLeft] = useState(600);
    const [codeValues, setCodeValues] = useState(['', '', '', '']);
    const [email, setEmail] = useState<string>('');

    // Função para iniciar a contagem regressiva
    useEffect(() => {
        if (timeLeft <= 0) return; // Para quando chegar a 0

        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer); // Limpa o timer ao desmontar o componente
    }, [timeLeft]);

    // Formata o tempo para mm:ss
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleResendCode = async () => {
        try {
            const response = await sendValidationCode(email);
            if (response === 201) {
                Alert.alert("Email reenviado com sucesso!");
                setTimeLeft(600);
                setCodeValues(['', '', '', '']);
            } else {
                Alert.alert("Erro no reenvio do email");
            }
        } catch (error) {
            Alert.alert("Algo deu errado.\nTente mais tarde!");
        }
    }

    useEffect(() => {
        const getSavedEmail = async () => {
            try {
                const savedEmail = await AsyncStorage.getItem('email');
                if (savedEmail) {
                    setEmail(savedEmail);
                }
            } catch (e) {
                console.error("Erro ao recuperar email", e);
            }
        };

        getSavedEmail();
    }, []);

    const handleValidationAccount = async () => {
        const code = codeValues.join('');
        if (code.length !== 4) {
            Alert.alert("Código de validação deve conter 4 dígitos.");
            return;
        }

        try {
            const response = await validateAccount(email, code);
            if (response === 200) {
                Alert.alert("Email validado com sucesso!");
            } else {
                Alert.alert("Erro na validação do email");
            }
        } catch (error) {
            Alert.alert("Algo deu errado.\nTente mais tarde!");
        }
    }

    const setCodeValue = (index: number, value: string) => {
        const newCodeValues = [...codeValues];
        newCodeValues[index] = value;
        setCodeValues(newCodeValues);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={style.container}
        >
            <HeaderApp />

            <ScrollView style={{ flex: 1 }}>

                <View style={style.content}>

                    <Text style={style.title}>Valide seu E-mail</Text>
                    <Text style={style.info}>Informe o código recebido por e-mail para validar sua identidade.</Text>
                    <ValidationCode values={codeValues} setValues={setCodeValue} />

                    <Text style={style.timer}>O código expira em {formatTime(timeLeft)}</Text>

                    <TouchableOpacity onPress={handleResendCode}>
                        <Text style={style.reenviarEmail}>Reenviar Código</Text>
                    </TouchableOpacity>

                </View>

            </ScrollView>

            <View style={style.footer}>
                <Button onPress={handleValidationAccount} title='Confirmar' />
            </View>

        </KeyboardAvoidingView>
    );
}