import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { View, Text, Modal, TouchableOpacity, Linking } from "react-native";
import HeaderApp from "../../components/Header/header";
import { style } from "./styles";
import ControlledTextInput from "../../components/Controller/ControlledTextInput";
import Button from "../../components/Button/button";
import { registerCustomer } from '../../api/register/apiRegisterCustomer';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LoadingModal from "../../components/LoadingModal";
import { TextInputMask } from 'react-native-masked-text'; // Importando a biblioteca de máscara
import AccessibilityButton from "../../components/Accessibility/accessibilityButton";
import InfoModal from "../../components/InfoModal";

// Tipos da navegação
type NavigationProp = StackNavigationProp<RootStackParamList, 'RegisterCustomerScreen'>;
type RootStackParamList = {
    RegisterCustomerScreen: { email?: string };
    Login: undefined;
};
type RegisterCustomerRouteProp = RouteProp<RootStackParamList, 'RegisterCustomerScreen'>;

type RegisterCustomerForm = {
    name: string;
    email: string;
    password: string;
    phoneNumber: string;
};

export default function RegisterCustomerScreen() {
    const navigation = useNavigation<NavigationProp>();
    const route = useRoute<RegisterCustomerRouteProp>();
    const receivedEmail = route.params?.email || '';
    const [loading, setLoading] = useState(false); 
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState<string>('');
    const [modalMessage, setModalMessage] = useState<string>('');
    const [onModalCloseAction, setOnModalCloseAction] = useState<(() => void) | null>(null);

    const handleModalClose = () => {
        setModalVisible(false);
        if (onModalCloseAction) {
            onModalCloseAction();
            setOnModalCloseAction(null);
        }
    };

    const { control, handleSubmit, setValue, formState: { errors, isValid } } = useForm<RegisterCustomerForm>({
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: receivedEmail,
            password: '',
            phoneNumber: '',
        },
    });
    const [isTermsModalVisible, setIsTermsModalVisible] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);

    // Função para registrar o cliente
    const handleRegisterCustomer = async (data: RegisterCustomerForm) => {
        try {
            setLoading(true);

            const cleanedData = {
                ...data,
                phoneNumber: data.phoneNumber.replace(/\D/g, ""), // Remove máscara antes de enviar
            };

            const response = await registerCustomer(cleanedData);
            if (response === 201) {
                setModalTitle("Sucesso");
                setModalMessage("Cliente cadastrado com sucesso!");
                setOnModalCloseAction(() => () => navigation.navigate('Login'));
                setModalVisible(true);
            } else {
                setModalTitle("Erro");
                setModalMessage("Erro no cadastro do cliente!");
                setModalVisible(true);
            }
        } catch (error) {
            console.error("Erro ao cadastrar cliente:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={style.container}>
            <HeaderApp headerStyle={{ height: '20%', width: '100%' }} logoStyle={{ height: '100%', width: '100%' }} />
            <View style={style.content}>
                <Text style={style.title}>Crie sua conta:</Text>

                <ControlledTextInput
                    control={control}
                    name="name"
                    rules={{ required: "Campo obrigatório" }}
                    placeholder="Digite seu nome completo"
                    label="Nome completo"
                    errorMessage={errors.name?.message}
                />

                <ControlledTextInput
                    control={control}
                    name="email"
                    rules={{
                        required: "Campo obrigatório",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Formato de email inválido"
                        }
                    }}
                    placeholder="Digite seu e-mail"
                    label="E-mail"
                    errorMessage={errors.email?.message}
                    editable={false}
                />

                <Text style={style.label}>{'Telefone'}</Text>
                <Controller
                    control={control}
                    name="phoneNumber"
                    rules={{
                        required: "Campo obrigatório",
                        minLength: {
                            value: 15,
                            message: "O telefone deve ter pelo menos 11 dígitos"
                        },
                    }}
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInputMask
                            type={'custom'}
                            options={{
                                mask: '(99) 99999-9999'
                            }}
                            value={value}
                            onChangeText={(maskedValue) => onChange(maskedValue)}
                            onBlur={onBlur}
                            placeholder="(99) 99999-9999"
                            keyboardType="numeric"
                            style={style.inputMasked}
                        />
                    )}
                />
                {errors.phoneNumber && <Text style={style.errorText}>{errors.phoneNumber?.message}</Text>}

                <Text style={style.senha}></Text>

                <ControlledTextInput
                    control={control}
                    name="password"
                    rules={{
                        required: "Campo obrigatório",
                        minLength: {
                            value: 6,
                            message: "A senha deve ter pelo menos 6 caracteres"
                        }
                    }}
                    placeholder="Digite sua senha"
                    label="Senha"
                    secureTextEntry
                    errorMessage={errors.password?.message}
                />

                <View style={style.footer}>
                    <Button title="Cadastrar" onPress={() => setIsTermsModalVisible(true)} />
                </View>

            </View>
            <LoadingModal visible={loading} />
            <Modal
                visible={isTermsModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setIsTermsModalVisible(false)}>
                <View style={style.modalContainer}>
                    <View style={style.modalContent}>
                        <Text style={style.modalTitle}>Termos de Uso</Text>
                        <Text style={style.modalText}>
                            Ao usar este aplicativo, você concorda em cumprir os{' '}
                            <Text
                                style={{ color: 'blue', textDecorationLine: 'underline' }}
                                onPress={() => Linking.openURL('https://foodconnectca.blob.core.windows.net/terms-polices/Termos-Politicas/Termos-de-uso.html')}>
                                Termos e condições
                            </Text>{' '}
                            estabelecidos. O aplicativo pode coletar e processar dados pessoais de acordo com a{' '}
                            <Text
                                style={{ color: 'blue', textDecorationLine: 'underline' }}
                                onPress={() => Linking.openURL('https://foodconnectca.blob.core.windows.net/terms-polices/Termos-Politicas/Politicas_privacidade.html')}
                            >
                                Política de Privacidade
                            </Text>.
                        </Text>
                        <Text style={style.modalText}>
                            Ao clicar em "Aceitar", você concorda que leu e está de acordo com os termos acima.
                        </Text>
                        <View style={style.modalButtons}>
                            <TouchableOpacity
                                style={style.modalButton}
                                onPress={() => {
                                    if (isValid) {
                                        setIsTermsModalVisible(false);
                                        handleSubmit(handleRegisterCustomer)(); // Envia os dados de cadastro
                                    } else {
                                        setModalTitle("Erro");
                                        setModalMessage("Preencha todos os campos corretamente antes de aceitar os termos.");
                                        setModalVisible(true);
                                    }
                                }}
                            >
                                <Text style={style.modalButtonText}>Aceitar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[style.modalButton, { backgroundColor: 'red' }]} // Botão "Fechar" com cor diferente
                                onPress={() => setIsTermsModalVisible(false)} // Fecha o modal
                            >
                                <Text style={style.modalButtonText}>Fechar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
