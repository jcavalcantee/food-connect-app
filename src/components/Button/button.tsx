import { Text, TouchableOpacity, GestureResponderEvent, ActivityIndicator } from 'react-native';
import { style as defaultStyles } from "./styles"
import React from 'react';

interface ButtonProps{
    onPress: (event: GestureResponderEvent) => void;
    title?: string;
    disabled?: boolean;
    style?: object;
}

const Button: React.FC<ButtonProps> = ({ onPress, title, disabled, style }) => {
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[defaultStyles.confirmButton, style]}
            disabled={disabled}
        >
            {disabled ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
                <Text style={defaultStyles.buttonText}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

export default Button;