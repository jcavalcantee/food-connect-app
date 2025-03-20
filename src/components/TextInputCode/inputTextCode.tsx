import { useRef } from 'react';
import { View, TextInput, Text } from 'react-native';
import { style } from "./styles"

export default function TextInputCode() {

    const inputRefs = useRef<TextInput[]>([]); // Cria referências para os inputs

    const handleChangeText = (text: string, index: number) => {
        if (text.length === 1 && index < inputRefs.current.length - 1) {
            // Move o foco para o próximo input
            inputRefs.current[index + 1].focus();
        } else if (text.length === 0 && index > 0) {
            // Volta o foco para o input anterior se apagar um número
            inputRefs.current[index - 1].focus();
        }
    };

    return (
        <View style={style.container}>
            {[...Array(4)].map((_, index) => (
                <TextInput
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el!)} // Associa a referência ao input
                    style={style.textInputCode}
                    maxLength={1}
                    keyboardType="number-pad"
                    onChangeText={(text) => handleChangeText(text, index)}
                />
            ))}
        </View>
    );
}