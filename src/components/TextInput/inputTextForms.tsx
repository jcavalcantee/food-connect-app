import { TextInput } from 'react-native';
import { style } from "./styles"

export default function InputTextForms() {
    return (
        <TextInput
            style={style.boxInput}
            placeholder='Digite seu e-mail'
        />
    );
}