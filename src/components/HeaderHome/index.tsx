import React from 'react';
import { View, SafeAreaView, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';
import Logo from "../../assets/images/icon.png";
import SenacCampus from "../../assets/images/senac_campus.jpg";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

interface HeaderHomeProps {
    username: string;
}
type RootStackParamList = {
    Cart: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Cart'>;

export default function HeaderHome({ username }: HeaderHomeProps) {
    const navigation = useNavigation<NavigationProp>();
    return (
        <SafeAreaView style={styles.safeare}>
            <View style={styles.container}>
                <View style={{ width: '10%' }}></View>
                <Image source={Logo} style={styles.imageLogo} />
                <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                    <MaterialCommunityIcons name="shopping-outline" size={30} color="black" />
                    <Text style={styles.cartItemsCount}>10</Text>
                </TouchableOpacity>
            </View>
            <Text style={styles.usernameText}>Olá, {username}</Text>
            <View style={styles.subheader}>
                <Image source={SenacCampus} style={styles.imageCarrosel} />
            </View>
        </SafeAreaView>
    );
}