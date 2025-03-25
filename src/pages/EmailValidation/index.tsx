import { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, Alert, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { style } from "./styles"
import HeaderApp from "../../components/Header/header"
import ValidationCode from "../../components/TextInputCode/inputTextCode"
import Button from "../../components/Button/button"
import { validateAccount } from "../../api/validation/apiValidation"
import { sendValidationCode } from '../../api/email/apiEmailSender';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LoadingModal from '../../components/LoadingModal';

type RootStackParamList = {
    EmailValidation: undefined;
    RegisterCustomerScreen: { email: string };
    SolicitacaoEmail: undefined;
};

type EmailValidationNavigationProp = StackNavigationProp<RootStackParamList, 'EmailValidation'>;

export default function EmailValidation() {
    const navigation = useNavigation<EmailValidationNavigationProp>();
    const isFocused = useIsFocused();
    const [timeLeft, setTimeLeft] = useState(600);
    const [codeValues, setCodeValues] = useState(['', '', '', '']);
    const [email, setEmail] = useState<string>('');
    const [cooldown, setCooldown] = useState(false);
    const [cooldownTimeLeft, setCooldownTimeLeft] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (timeLeft <= 0 && isFocused) {
            navigation.navigate('SolicitacaoEmail');
            return;
        }

        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer); 
    }, [timeLeft, isFocused]);

    // Formata o tempo para mm:ss
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    const handleResendCode = async () => {
        if (cooldown) {
            Alert.alert(`Tempo restante para reenvio de código: ${formatTime(cooldownTimeLeft)} minutos`);
            return;
        }

        setLoading(true);

        try {
            const response = await sendValidationCode(email);
            if (response === 201) {
                Alert.alert("Código reenviado com sucesso!");
                setTimeLeft(600);
                setCodeValues(['', '', '', '']);
                setCooldown(true);
                setCooldownTimeLeft(300);
                const cooldownTimer = setInterval(() => {
                    setCooldownTimeLeft(prevTime => {
                        if (prevTime <= 1) {
                            clearInterval(cooldownTimer);
                            setCooldown(false);
                            return 0;
                        }
                        return prevTime - 1;
                    });
                }, 1000);
            } else {
                Alert.alert("Erro no reenvio do código");
            }
        } catch (error) {
            Alert.alert("Algo deu errado.\nTente mais tarde!");
        } finally {
            setLoading(false);
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
            setLoading(true);
            const response = await validateAccount(email, code);
            if (response === 200) {
                Alert.alert("Email validado com sucesso!");
                navigation.navigate('RegisterCustomerScreen', { email });
            } else {
                Alert.alert("Erro na validação do email");
            }
        } catch (error: any) {
            if(error.response && error.response.status === 400) {
                Alert.alert("O Código de validação fornecido não é válido.");
            }
        } finally {
            setLoading(false);
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
                        <Text style={style.reenviarEmail}>Reenviar código</Text>
                    </TouchableOpacity>

                    {loading && <ActivityIndicator size="small" color="#FFFFFF" />}

                </View>

            </ScrollView>

            <View style={style.footer}>
                <Button 
                    onPress={handleValidationAccount} 
                    title='Confirmar' 
                    disabled={false}
                    style={{ height: '30%'}}
                />
            </View>
            <LoadingModal visible={loading} />

        </KeyboardAvoidingView>
    );
}