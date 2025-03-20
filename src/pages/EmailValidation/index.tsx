import { useState, useEffect } from 'react';
import { View, Text, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard, ScrollView, TouchableOpacity } from 'react-native';

import { style } from "./styles"
import HeaderApp from "../../components/Header/header"
import ValidationCode from "../../components/TextInputCode/inputTextCode"
import Button from "../../components/Button/button"

export default function EmailValidation() {

    const [timeLeft, setTimeLeft] = useState(600); // 10 minutos em segundos

    // Função para iniciar a contagem regressiva
    useEffect(() => {
        if (timeLeft <= 0) return; // Para quando chegar a 0

        const timer = setInterval(() => {
            setTimeLeft(prevTime => prevTime - 1);
        }, 1000);

        return () => clearInterval(timer); // Limpa o timer ao desmontar o componente
    }, [timeLeft]);

    // Formata o tempo para mm:ss
    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };

    // Função para reenviar o código e reiniciar o timer
    const handleResendCode = () => {
        setTimeLeft(600); // Reseta para 10 minutos
        console.log("Código reenviado!");
    };

    const handleValidationEmail = async () => { }
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"} 
            style={style.container}
        >
            <HeaderApp />

            <ScrollView style={{flex: 1}}>

            <View style={style.content}>

                    <Text style={style.title}>Valide seu E-mail</Text>
                    <Text style={style.info}>Informe o código recebido por e-mail para validar sua identidade.</Text>

                <ValidationCode/>

                <Text style={style.timer}>O código expira em {formatTime(timeLeft)}</Text>
                
                <TouchableOpacity onPress={handleResendCode}>
                    <Text style={style.reenviarEmail}>Reenviar Código</Text>
                </TouchableOpacity>

            </View>

            </ScrollView>

            <View style={style.footer}>
                <Button onPress={handleValidationEmail} title='Confirmar' />
            </View>
            
        </KeyboardAvoidingView>
    );
}