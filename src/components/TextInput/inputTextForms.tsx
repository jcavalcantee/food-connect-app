import { TextInput, TextInputProps } from 'react-native';
import { style } from "./styles"

interface InputTextFormsProps extends TextInputProps {
    placeholder?: string;
    value: string;
    onChangeText: (text: string) => void;
  }

export default function InputTextForms({ placeholder = "Digite aqui", value, onChangeText, ...rest }: InputTextFormsProps) {
    return (
        <TextInput
            style={style.boxInput}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            {...rest}
        />
    );
}