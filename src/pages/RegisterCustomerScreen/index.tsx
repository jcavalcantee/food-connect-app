import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { View, Text, Alert } from "react-native";
import HeaderApp from "../../components/Header/header";
import { style } from "./styles";
import ControlledTextInput from "../../components/Controller/ControlledTextInput";
import Button from "../../components/Button/button";
import { registerCustomer } from '../../api/register/apiRegisterCustomer';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import LoadingModal from "../../components/LoadingModal";
import { TextInputMask } from 'react-native-masked-text'; // Importando a biblioteca de máscara

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

    const { control, handleSubmit, setValue, formState: { errors, isValid } } = useForm<RegisterCustomerForm>({
        mode: 'onChange',
        defaultValues: {
            name: '',
            email: receivedEmail,
            password: '',
            phoneNumber: '',
        },
    });

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
                Alert.alert("Cliente cadastrado com sucesso!");
                navigation.navigate('Login');
            } else {
                Alert.alert("Erro no cadastro do cliente!");
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
                    <Button title="Cadastrar" onPress={handleSubmit(handleRegisterCustomer)} />
                </View>
            </View>
            <LoadingModal visible={loading} />
        </View>
    );
}
