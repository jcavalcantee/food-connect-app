import { Text, TouchableOpacity } from 'react-native';
import { style } from "./styles"

export default function Button() {
    return (
        <TouchableOpacity
            style={style.confirmButton}>

            <Text style={style.buttonText}>Confirmar</Text>
        </TouchableOpacity>
    );
}