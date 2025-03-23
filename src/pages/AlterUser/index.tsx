import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import Button from "../../components/Button/button"; 
import { useNavigation } from '@react-navigation/native';
import HeaderApp from '../../components/Header/header';
import { style } from './styles';
import ControlledTextInput from '../../components/Controller/ControlledTextInput';

export default function AlterUser() {
    const navigation = useNavigation();

     // Estados para armazenar os dados
     const [name, setName] = useState('');
     const [email, setEmail] = useState('');
     const [phone, setPhone] = useState('');
     const [password, setPassword] = useState('');
     const [error, setError] = useState('');

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

    return (
        <View style={style.container}>
            <HeaderApp />
            <View style={style.content}>
                <Text style={style.title}>Alterar Dados:</Text>

                <TextInput style={style.input} placeholder="Digite seu nome completo" />
                    
                <TextInput style={style.input} placeholder="email@com" editable={false} />

                <TextInput style={style.input} placeholder="Digite seu número" />

                <TextInput
                    style={[
                        style.input,
                        { borderColor: error ? 'red' : '#ccc' }, 
                    ]}
                    placeholder="Digite sua senha"
                    secureTextEntry
                    value={password}
                    onChangeText={validatePassword}
                />
                {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

                <View style={style.footer}>
                    <Button title="Salvar Alterações" onPress={() => navigation.goBack()} />
                </View>
            </View>
        </View>
    );
}
