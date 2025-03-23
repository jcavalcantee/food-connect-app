import { Text, TouchableOpacity, GestureResponderEvent } from 'react-native';
import { style } from "./styles"

interface ButtonProps{
    onPress: (event: GestureResponderEvent) => void;
    title?: string;
    disabled?: boolean;
}
export default function Button({ onPress, title="Confirmar" }: ButtonProps) {
    return (
        <TouchableOpacity style={style.confirmButton} onPress={onPress}>
            <Text style={style.buttonText}>{title}</Text>
        </TouchableOpacity>
    );
}