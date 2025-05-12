import React from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import { style } from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AccessibilityButton = () => {
    const handlePress = () => {
        Alert.alert(
            "Acessibilidade",
            "Funções disponíveis:\n- Alto contraste\n- Ajuste de fonte\n- Navegação simplificada",
            [{ text: "OK" }]
        );
    };

    return (
        <TouchableOpacity style={style.button} onPress={handlePress}>
            <FontAwesome name="universal-access" size={30} color="#fff" />
        </TouchableOpacity>
    );
};

export default AccessibilityButton;