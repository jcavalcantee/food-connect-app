import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import HeaderHome from "../../components/HeaderHome";
import FooterHome from "../../components/FooterHome";

type RootStackParamList = {
    Home: undefined;
};

type HomeNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function ProfileScreen() {
    const navigation = useNavigation<HomeNavigationProp>();

    const [user, setUser] = useState<{ email: string; name: string; cellphoneNumber: string } | null>(null);

    useEffect(() => {
        const getUserInfo = async () => {
            const userData = await AsyncStorage.getItem("userInfo");
            if (userData) {
                setUser(JSON.parse(userData));
            }
        };

        getUserInfo();
    }, []);

    return (
        // <View>
        //     {user ? (
        //         <>
        //             <Text>Email: {user.email}</Text>
        //             <Text>Nome: {user.name}</Text>
        //             <Text>Telefone: {user.cellphoneNumber}</Text>
        //         </>
        //     ) : (
        //         <Text>Erro ao recuperar informações do asyncStorage</Text>
        //     )}
        // </View>
        <>
            <HeaderHome/>
            <FooterHome/>
        </>
    );
}