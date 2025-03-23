import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Alert } from 'react-native';
import Button from "../../components/Button/button"; 
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import HeaderApp from '../../components/Header/header';
import { style } from './styles';
import { getCustomerData, updateCustomerData } from '../../api/clients/customerClient';
import LoadingModal from "../../components/LoadingModal";

type RootStackParamList = {
    AlterUser: { email: string };
};

type AlterUserRouteProp = RouteProp<RootStackParamList, 'AlterUser'>;

export default function AlterUser() {
  const navigation = useNavigation();
  const route = useRoute<AlterUserRouteProp>();

  // Mocando o email diretamente (substitua com o valor que você quer testar)
  const email = 'gabriel@gmail.com'; // Mocando o valor do email aqui

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
      const fetchCustomerData = async () => {
          try {
              setLoading(true);
              const customerData = await getCustomerData(email); // Usando o valor do email "mocado"
              setName(customerData.name);
              setPhone(customerData.phoneNumber);
          } catch (error) {
              Alert.alert("Erro ao buscar dados do cliente");
          } finally {
              setLoading(false);
          }
      };

      fetchCustomerData();
  }, [email]);

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
          const updatedCustomer = { name, email, phoneNumber: phone, password };
          await updateCustomerData(updatedCustomer);
          Alert.alert("Dados alterados com sucesso!");
          navigation.goBack();
      } catch (error) {
          Alert.alert("Erro ao alterar dados do cliente");
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
                  value={email}  // Agora está usando o email "mocado"
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
                  <Button title="Salvar Alterações" onPress={handleSaveChanges} />
              </View>
          </View>
          <LoadingModal visible={loading} />
      </View>
  );
}

