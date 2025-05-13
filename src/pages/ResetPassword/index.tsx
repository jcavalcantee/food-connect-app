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
            Alert.alert("Erro", "Preencha todos os campos!");
            return;
        }

        if (passwordError || confirmPasswordError) {
            Alert.alert("Erro", "Corrija os erros antes de continuar!");
            return;
        }

        setLoading(true);

        try {
            const response = await resetPasswordCustomer(email, password);
            if (response.status === 200) {
                Alert.alert("Status: " + response.status, response.data);
                navigation.navigate('Login');
            }
        } catch (error) {
            Alert.alert("Erro", "Algo deu errado. Tente novamente mais tarde.");
        } finally {
            setLoading(false);
        }
    }

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
        </View>
    );
}