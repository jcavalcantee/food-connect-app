import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { style } from "./styles"
import Button from "../../components/Button/button"
import TextInputForms from "../../components/TextInput/inputTextForms"
import HeaderApp from "../../components/Header/header"

export default function Header() {
    return (
        <View style={style.container}>
            <HeaderApp />
            <View style={style.content}>
                <Text style={style.title}>Informe seu email</Text>
                <Text style={style.info}>Informe seu e-mail institucional para validação.</Text>

                <TextInputForms />
                <Button />

                <Text style={style.backToLogin}>Voltar para o login</Text>
            </View>

        </View>
    );
}