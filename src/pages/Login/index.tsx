import { useState } from 'react';
import { View, Text, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { style } from "./styles";
import TextInputForms from "../../components/TextInput/inputTextForms";
import HeaderApp from "../../components/Header/header";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginCustomer } from '../../api/login/apiLoginCustomer';
import InputPasswordForms from '../../components/PasswordInput';
import { sendResetPasswordValidationCode } from '../../api/email/apiEmailSender';
import AccessibilityButton from "../../components/Accessibility/accessibilityButton";
import InfoModal from '../../components/InfoModal';

type RootStackParamList = {
    Login: undefined;
    SolicitacaoEmail: undefined;
    EmailResetValidation: undefined;
    Home: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

export default function Login() {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [emailError, setEmailError] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState<string>('');
    const [modalMessage, setModalMessage] = useState<string>('');
    const [onModalCloseAction, setOnModalCloseAction] = useState<(() => void) | null>(null);
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
            setModalTitle("Erro");
            setModalMessage("Preencha todos os campos!");
            setModalVisible(true);
            return;
        }

        if (emailError) {
            setModalTitle("Erro");
            setModalMessage("Corrija o e-mail antes de continuar!");
            setModalVisible(true);
            return;
        }

        setLoading(true);

        try {
            const response = await loginCustomer(email, password);
            if (response.status === "Sucesso") {
                await AsyncStorage.setItem("userInfo", JSON.stringify(response.data.customerInfo));
                setModalTitle(response.status);
                setModalMessage(response.message);
                setOnModalCloseAction(() => () => navigation.navigate('Home'));
                setModalVisible(true);
            } else {
                setModalTitle(response.status);
                setModalMessage(response.message);
                setModalVisible(true);
            }
        } catch (error) {
            setModalTitle("Erro");
            setModalMessage("Erro ao realizar requisição. Tente novamente mais tarde.");
            setModalVisible(true);
        } finally {
            setLoading(false);
        }
    };

    const handleResetPassword = async () => {
        if (!email) {
            setModalTitle("Erro");
            setModalMessage("Preencha o campo de e-mail!");
            setModalVisible(true);
            return;
        }

        if (emailError) {
            setModalTitle("Erro");
            setModalMessage("Corrija o e-mail antes de continuar!");
            setModalVisible(true);
            return;
        }

        setLoading(true);

        try {
            const response = await sendResetPasswordValidationCode(email);
            if (response.status === "Sucesso") {
                await saveValue(email);
                setModalTitle(response.status);
                setModalMessage(response.message);
                setOnModalCloseAction(() => () => navigation.navigate('EmailResetValidation'));
                setModalVisible(true);
            } else {
                setModalTitle(response.status);
                setModalMessage(response.message);
                setModalVisible(true);
            }
        } catch (error) {
            setModalTitle("Erro");
            setModalMessage("Algo deu errado. Tente mais tarde!");
            setModalVisible(true);
        } finally {
            setLoading(false);
        }
    }

    const saveValue = async (email: string) => {
        try {
            await AsyncStorage.setItem('resetEmail', email);
        } catch (e) {
            console.error("Erro ao salvar email", e);
        }
    };

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
                <Text style={style.title}>Bem Vindo!</Text>
                <Text style={style.info}>Informe suas credenciais para validação.</Text>
                <TextInputForms placeholder="Digite seu e-mail" value={email} onChangeText={validateEmail} />
                {emailError && <Text style={style.errorText}>{emailError}</Text>}
                <InputPasswordForms placeholder='Digite sua senha' value={password} onChangeText={setPassword} />
                <View style={style.forgotpasswordcontainer}>
                    <TouchableOpacity onPress={handleResetPassword}>
                        <Text style={style.forgotpassword}>Esqueci minha senha</Text>
                    </TouchableOpacity>
                </View>
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
            <AccessibilityButton />
            <InfoModal
                visible={modalVisible}
                onClose={handleModalClose}
                title={modalTitle}
                message={modalMessage}
            />
        </View>
    );
}