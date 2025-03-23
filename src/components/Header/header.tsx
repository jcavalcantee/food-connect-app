import Logo from "../../assets/images/logo-sem-fundo.png"
import { View, Image, StyleProp, ImageStyle, ViewStyle } from 'react-native';
import { style } from './styles';

interface HeaderProps {
    headerStyle?: StyleProp<ViewStyle>;
    logoStyle?: StyleProp<ImageStyle>;
}

const HeaderApp: React.FC<HeaderProps> = ({ headerStyle, logoStyle }) => {
    return (
        <View style={[style.header, headerStyle]}>
            <Image
                source={Logo}
                style={[style.logo, logoStyle]}
                resizeMode="contain"
            />
        </View>
    );
};

export default HeaderApp;