import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from "../../components/Button/button";
import { useNavigation } from '@react-navigation/native';
import HeaderApp from '../../components/Header/header';
import { style } from './styles';
import { getCustomerData, updateCustomerData } from '../../api/clients/customerClient';
import LoadingModal from "../../components/LoadingModal";
import { updatePassword } from '../../api/clients/customerClient';
import AccessibilityButton from "../../components/Accessibility/accessibilityButton";


export default function AlterUser() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                setLoading(true);

                const userInfoString = await AsyncStorage.getItem("userInfo");
                if (userInfoString) {
                    const userInfo = JSON.parse(userInfoString); // Convertendo de volta para objeto

                    setEmail(userInfo.email);
                    setName(userInfo.name);
                    setPhone(userInfo.cellphoneNumber);
                }
            } catch (error) {
                Alert.alert("Erro", "Erro ao buscar dados do cliente");
            } finally {
                setLoading(false);
            }
        };

        fetchCustomerData();
    }, []);

    const validatePassword = (text: string) => {
        if (!text) {
            setError('Campo obrigatório');
        } else if (text.length < 6) {
            setError('A senha deve ter pelo menos 6 caracteres');
        } else {
            setError('');
        }
        setPassword(text);
    };

    const handleSaveChanges = async () => {

        try {
            setLoading(true);

            // Atualiza os dados do cliente
            const updatedCustomer = { name, email, phoneNumber: phone };
            await updateCustomerData(updatedCustomer);

            if (password.trim() !== '') {
                await updatePassword({ email, password });
            }
            // Se a senha foi alterada, atualiza a senha

            Alert.alert("Dados atualizados com sucesso!");
            navigation.goBack();
        } catch (error) {
            Alert.alert("Erro ao atualizar os dados do cliente");
        } finally {
            setLoading(false);
        }
    };



    return (
        <View style={style.container}>
            <HeaderApp />
            <View style={style.content}>
                <Text style={style.title}>Alterar Dados:</Text>

                <TextInput
                    style={style.input}
                    placeholder="Digite seu nome completo"
                    value={name}
                    onChangeText={setName}
                />

                <TextInput
                    style={style.input}
                    placeholder="email@com"
                    value={email}
                    editable={false}
                />

                <TextInput
                    style={style.input}
                    placeholder="Digite seu número"
                    value={phone}
                    onChangeText={setPhone}
                />

                <TextInput
                    style={[style.input, { borderColor: error ? 'red' : '#ccc' }]}
                    placeholder="Digite sua senha"
                    secureTextEntry
                    value={password}
                    onChangeText={validatePassword}
                />
                {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

                <View style={style.footer}>
                    <View style={style.footer}>
                        <Button
                            title="Salvar Alterações"
                            onPress={() => { handleSaveChanges(); }}
                        />
                    </View>
                </View>
            </View>
            <LoadingModal visible={loading} />
            <AccessibilityButton />
        </View>
    );
}