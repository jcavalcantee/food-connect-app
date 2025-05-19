import React, { useState } from 'react';
import { View, SafeAreaView, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';
import Logo from "../../assets/images/icon.png";
import SenacCampus from "../../assets/images/senac_campus.jpg";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface HeaderHomeProps {
    username: string;
}
type RootStackParamList = {
    Cart: { storeId: number };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Cart'>;

export default function HeaderHome({ username }: HeaderHomeProps) {
    const navigation = useNavigation<NavigationProp>();
    const [cartCount, setCartCount] = useState(0);

    useFocusEffect(
        React.useCallback(() => {
            const fetchCartCount = async () => {
                const storedCart = await AsyncStorage.getItem('@cartItems');
                if (storedCart) {
                    const items = JSON.parse(storedCart);
                    setCartCount(items.length);
                } else {
                    setCartCount(0);
                }
            };
            fetchCartCount();
        }, [])
    );

    return (
        <SafeAreaView style={styles.safeare}>
            <View style={styles.container}>
                <View style={{ width: '10%' }}></View>
                <Image source={Logo} style={styles.imageLogo} />
                <TouchableOpacity onPress={() => navigation.navigate('Cart', { storeId: 1 })}>
                    <MaterialCommunityIcons name="shopping-outline" size={30} color="black" />
                    {cartCount > 0 && (
                        <Text style={styles.cartItemsCount}>{cartCount}</Text>
                    )}
                </TouchableOpacity>
            </View>
            <Text style={styles.usernameText}>Olá, {username}</Text>
            <View style={styles.subheader}>
                <Image source={SenacCampus} style={styles.imageCarrosel} />
            </View>
        </SafeAreaView>
    );
}