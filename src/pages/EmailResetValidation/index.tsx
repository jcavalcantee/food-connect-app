import { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, Alert, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { style } from "./styles";
import HeaderApp from "../../components/Header/header"
import ValidationCode from "../../components/TextInputCode/inputTextCode"
import Button from "../../components/Button/button"
import { validateAccount } from "../../api/validation/apiValidation"
import { sendResetPasswordValidationCode } from '../../api/email/apiEmailSender';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LoadingModal from '../../components/LoadingModal';
import AccessibilityButton from "../../components/Accessibility/accessibilityButton";
import InfoModal from '../../components/InfoModal';

type RootStackParamList = {
    EmailResetValidation: undefined;
    Login: undefined;
    ResetPassword: { email: string };
};

type EmailResetValidationNavigationProp = StackNavigationProp<RootStackParamList, 'EmailResetValidation'>;

export default function EmailResetValidation() {
    const navigation = useNavigation<EmailResetValidationNavigationProp>();
    const isFocused = useIsFocused();
    const [timeLeft, setTimeLeft] = useState(600);
    const [codeValues, setCodeValues] = useState(['', '', '', '']);
    const [email, setEmail] = useState<string>('');
    const [cooldown, setCooldown] = useState(false);
    const [cooldownTimeLeft, setCooldownTimeLeft] = useState(0);
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState<string>('');
    const [modalMessage, setModalMessage] = useState<string>('');
    const [onModalCloseAction, setOnModalCloseAction] = useState<(() => void) | null>(null);

    useEffect(() => {
        if (timeLeft <= 0 && isFocused) {
            navigation.navigate('Login');
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
            setModalTitle('Aguarde para reenviar');
            setModalMessage(`Tempo restante para reenvio de código: ${formatTime(cooldownTimeLeft)} minutos`);
            setModalVisible(true);
            return;
        }

        setLoading(true);

        try {
            const response = await sendResetPasswordValidationCode(email);
            if (response.status === 'Sucesso') {
                setModalTitle(response.status);
                setModalMessage(response.message);
                setModalVisible(true);
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
                setModalTitle(response.status);
                setModalMessage(response.message);
                setModalVisible(true);
            }
        } catch (error) {
            setModalTitle('Erro');
            setModalMessage('Algo deu errado.\nTente mais tarde!');
            setModalVisible(true);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const getSavedEmail = async () => {
            try {
                const savedEmail = await AsyncStorage.getItem('resetEmail');
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
            setModalTitle('Código inválido');
            setModalMessage('Código de validação deve conter 4 dígitos.');
            setModalVisible(true);
            return;
        }

        try {
            setLoading(true);
            const response = await validateAccount(email, code);
            if (response.status === 'Sucesso') {
                setModalTitle(response.status);
                setModalMessage(response.message);
                setOnModalCloseAction(() => () => navigation.navigate('ResetPassword', { email }));
                setModalVisible(true);
            } else {
                setModalTitle(response.status);
                setModalMessage(response.message);
                setModalVisible(true);
            }
        } catch (error: any) {
            if (error.response && error.response.status === 400) {
                setModalTitle('Código inválido');
                setModalMessage('O Código de validação fornecido não é válido.');
                setModalVisible(true);
            } else {
                setModalTitle('Erro');
                setModalMessage('Algo deu errado.\nTente mais tarde!');
                setModalVisible(true);
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

    const handleModalClose = () => {
        setModalVisible(false);
        if (onModalCloseAction) {
            onModalCloseAction();
            setOnModalCloseAction(null);
        }
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
                    <Text style={style.info}>Informe o código recebido por e-mail para validar sua identidade e seguir com a redefinição de senha.</Text>
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
                    style={{ height: '30%' }}
                />
            </View>
            <LoadingModal visible={loading} />
            <AccessibilityButton />
            <InfoModal
                visible={modalVisible}
                onClose={handleModalClose}
                title={modalTitle}
                message={modalMessage}
            />
        </KeyboardAvoidingView>
    );
}