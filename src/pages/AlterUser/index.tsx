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
import InfoModal from '../../components/InfoModal';


export default function AlterUser() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalTitle, setModalTitle] = useState<string>('');
    const [modalMessage, setModalMessage] = useState<string>('');

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

        // Atualiza o AsyncStorage com os novos dados
        const updatedUserInfo = {
            email,
            name,
            cellphoneNumber: phone
        };
        await AsyncStorage.setItem("userInfo", JSON.stringify(updatedUserInfo));

        if (password.trim() !== '') {
            await updatePassword({ email, password });
        }
        setModalTitle("Sucesso");
        setModalMessage("Dados atualizados com sucesso!");
        setModalVisible(true);
        // Alert.alert("Dados atualizados com sucesso!");
        // navigation.goBack();
    } catch (error) {
        setModalTitle("Erro");
        setModalMessage("Erro ao atualizar os dados do cliente");
        setModalVisible(true);
        // Alert.alert("Erro ao atualizar os dados do cliente");
    } finally {
        setLoading(false);
    }
};

    const handleCloseModal = () => {
        setModalVisible(false);
        if (modalTitle === "Sucesso") {
            navigation.goBack();
        }
    };



    return (
        <View style={style.container}>
            <HeaderApp />
            <View style={style.content}>
                <Text style={style.title}>Alterar Dados:</Text>

                <Text style={{ marginBottom: 4 , fontWeight: 'bold' }}>Nome completo</Text>
                <TextInput
                    style={style.input}
                    placeholder="Digite seu nome completo"
                    value={name}
                    onChangeText={setName}
                />

                <Text style={{ marginBottom: 4, marginTop: 12 , fontWeight: 'bold' }}>E-mail</Text>
                <TextInput
                    style={style.input}
                    placeholder="email@com"
                    value={email}
                    editable={false}
                />

                <Text style={{ marginBottom: 4, marginTop: 12 , fontWeight: 'bold' }}>Número de telefone</Text>
                <TextInput
                    style={style.input}
                    placeholder="Digite seu número"
                    value={phone}
                    onChangeText={setPhone}
                />

                <Text style={{ marginBottom: 4, marginTop: 12 , fontWeight: 'bold' }}>Senha</Text>
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
                            title="Voltar"
                            onPress={() => { navigation.goBack(); }}
                            style={{ width: 150, height: 60, alignSelf: 'center', marginBottom: 1 }}
                        />
                        <Button
                            title="Salvar Alterações"
                            onPress={() => { handleSaveChanges(); }}
                            style={{ width: 150, alignSelf: 'center', marginTop: 10, height: 60 }}
                        />
                    </View>
                </View>
            </View>
            <LoadingModal visible={loading} />
            <InfoModal
                visible={modalVisible}
                title={modalTitle}
                message={modalMessage}
                onClose={handleCloseModal}
            />
            <AccessibilityButton />
        </View>
    );
}