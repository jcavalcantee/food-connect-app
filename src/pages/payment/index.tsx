import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Clipboard } from 'react-native';
import { styles } from './styles'
import { Dimensions } from 'react-native';

const PaymentScreen = () => {
  const [timeLeft, setTimeLeft] = useState(5 * 60); // 5 minutos em segundos
  const pixCode = '0020150840358408.BR...';

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds:number) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  };

  const copyToClipboard = () => {
    Clipboard.setString(pixCode);
    alert('Código copiado!');
  };

  // const progressWidth = `${((5 * 60 - timeLeft) / (5 * 60)) * 100}%`;
  const screenWidth = Dimensions.get('window').width;
  const progressWidth = ((5 * 60 - timeLeft) / (5 * 60)) * screenWidth;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>PAGAMENTO</Text>
      <Image
        source={require('../../assets/images/pixLogo.png')}
        style={styles.logo}
      />
      <Text style={styles.subtitle}>PEDIDO AGUARDANDO PAGAMENTO</Text>
      <Text style={styles.instruction}>
        Copie o código abaixo e utilize o Pix Copia e Cola no aplicativo que irá utilizar para realizar o pagamento
      </Text>

      <View style={styles.inputContainer}>
        <TextInput value={pixCode} editable={false} style={styles.input} />
        <TouchableOpacity onPress={copyToClipboard} style={styles.copyButton}>
          <Text style={styles.copyText}>📋</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.timerLabel}>Tempo para pagamento:</Text>
      <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
      <View style={styles.progressBarBackground}>
        <View style={[styles.progressBarFill, { width: progressWidth }]} />
      </View>
    </View>
  );
};

export default PaymentScreen;
