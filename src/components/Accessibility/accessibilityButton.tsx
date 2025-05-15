import React, { useRef, useState } from 'react';
import { TouchableOpacity, Alert, Animated, PanResponder, Dimensions } from 'react-native';
import { style } from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

// const AccessibilityButton = () => {
//     const handlePress = () => {
//         Alert.alert(
//             "Acessibilidade",
//             "Funções disponíveis:\n- Alto contraste\n- Ajuste de fonte\n- Navegação simplificada",
//             [{ text: "OK" }]
//         );
//     };

//     return (
//         <TouchableOpacity style={style.button} onPress={handlePress}>
//             <FontAwesome name="universal-access" size={30} color="#fff" />
//         </TouchableOpacity>
//     );
// };

const screenHeight = Dimensions.get('window').height;

const AccessibilityButton = () => {
    const translateY = useRef(new Animated.Value(200)).current;
    const offsetY = useRef(200); // Posição acumulada após cada arraste

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,

            onPanResponderMove: (_, gestureState) => {
                const newY = offsetY.current + gestureState.dy;

                // Limita dentro da tela
                const clampedY = Math.max(50, Math.min(screenHeight - 100, newY));
                translateY.setValue(clampedY);
            },

            onPanResponderRelease: (_, gestureState) => {
                const newOffset = offsetY.current + gestureState.dy;

                // Atualiza a posição acumulada (offset)
                offsetY.current = Math.max(50, Math.min(screenHeight - 100, newOffset));
                translateY.setValue(offsetY.current); // Garante que a posição final fique aplicada
            },
        })
    ).current;

    const handlePress = () => {
        Alert.alert(
            'Acessibilidade',
            'Funções disponíveis:\n- Alto contraste\n- Ajuste de fonte\n- Navegação simplificada',
            [{ text: 'OK' }]
        );
    };

    return (
        <Animated.View
            {...panResponder.panHandlers}
            style={[
                style.button,
                {
                    transform: [{ translateY }],
                },
            ]}
        >
            <TouchableOpacity
                style={style.touchableArea}
                onPress={handlePress}
                activeOpacity={0.8}
            >
                <FontAwesome name="universal-access" size={30} color="#fff" />
            </TouchableOpacity>
        </Animated.View>
    );
};

export default AccessibilityButton;