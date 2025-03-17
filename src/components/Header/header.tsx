import { View, Image} from 'react-native';
import Logo from "../../assets/images/logo-sem-fundo.png"
import { style } from "./styles"

export default function Header() {
    return (
        <View style={style.header}>
            <Image
                source={Logo}
                style={style.logo}
            />
        </View>
    );
}