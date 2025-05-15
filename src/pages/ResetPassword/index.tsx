import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { style } from "./styles";
import HeaderApp from "../../components/Header/header";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputPasswordForms from '../../components/PasswordInput';
import { resetPasswordCustomer } from '../../api/resetPassword/apiResetPasswordCustomer';
import AccessibilityButton from "../../components/Accessibility/accessibilityButton";
import InfoModal from '../../components/InfoModal';

type RootStackParamList = {
    ResetPassword: undefined;
    Login: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'ResetPassword'>;

export default function ResetPassword() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [passwordError, setPasswordError] = useState<string | null>(null);
    const [confirmPasswordError, setConfirmPasswordError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState<string>('');
    const [modalMessage, setModalMessage] = useState<string>('');
    const [onModalCloseAction, setOnModalCloseAction] = useState<(() => void) | null>(null);
    const navigation = useNavigation<NavigationProp>();

    useEffect(() => {
        const getEmail = async () => {
            try {
                const savedEmail = await AsyncStorage.getItem('resetEmail');
                if (savedEmail) {
                    setEmail(savedEmail);
                }
            } catch (error) {
                console.error("Erro ao recuperar email", error);
            }
        };

        getEmail();
    });

    const validatePassword = (password: string) => {
        if (password.length < 6) {
            setPasswordError("A senha deve ter pelo menos 6 caracteres.");
        } else {
            setPasswordError(null);
        }
    };

    const confirmPasswordValidation = (password: string, confirmPassword: string) => {
        if (password !== confirmPassword) {
            setConfirmPasswordError("As senhas não coincidem.");
        } else {
            setConfirmPasswordError(null);
        }
    }

    const handleResetPassword = async () => {
        if (!password || !confirmPassword) {
            setModalTitle("Erro");
            setModalMessage("Preencha todos os campos!");
            setModalVisible(true);
            return;
        }

        if (passwordError || confirmPasswordError) {
            setModalTitle("Erro");
            setModalMessage("Corrija os erros antes de continuar!");
            setModalVisible(true);
            return;
        }

        setLoading(true);

        try {
            const response = await resetPasswordCustomer(email, password);
            if (response.status === 200) {
                setModalTitle("Sucesso");
                setModalMessage("Senha redefinida com sucesso!");
                setOnModalCloseAction(() => () => navigation.navigate('Login'));
                setModalVisible(true);
            }
        } catch (error) {
            setModalTitle("Erro");
            setModalMessage("Algo deu errado. Tente novamente mais tarde.");
            setOnModalCloseAction(() => () => navigation.navigate('Login'));
            setModalVisible(true);
        } finally {
            setLoading(false);
        }
    }

    const handleModalClose = () => {
        setModalVisible(false);
        if (onModalCloseAction) {
            onModalCloseAction();
            setOnModalCloseAction(null);
        }
    };

    return (
        <View style={style.container}>
            <HeaderApp />
            <View style={style.content}>
                <Text style={style.title}>Redefinir Senha</Text>
                <Text style={style.info}>Informe sua nova senha e confirme-a.</Text>
                <InputPasswordForms placeholder='Digite sua senha' value={password} 
                    onChangeText={setPassword} onBlur={() => validatePassword(password)} />
                {passwordError && <Text style={style.errorText}>{passwordError}</Text>}
                <InputPasswordForms placeholder='Confirme sua senha' value={confirmPassword} 
                    onChangeText={setConfirmPassword} onBlur={() => confirmPasswordValidation(password, confirmPassword)} />
                {confirmPasswordError && <Text style={style.errorText}>{confirmPasswordError}</Text>}
            </View>
            <View style={style.footer}>
                <TouchableOpacity style={style.button} onPress={handleResetPassword} disabled={loading} >
                    {loading ? (
                        <ActivityIndicator size='small' color='#fff' />
                    ) : (
                        <Text style={style.buttonText}>Confirmar</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={style.cadastrese}>Voltar à tela de Login</Text>
                </TouchableOpacity>
            </View>
            <AccessibilityButton />
            <InfoModal
                visible={modalVisible}
                title={modalTitle}
                message={modalMessage}
                onClose={handleModalClose}
            />
        </View>
    );
}