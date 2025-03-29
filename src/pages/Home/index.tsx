import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import HeaderHome from "../../components/HeaderHome";
import FooterHome from "../../components/FooterHome";
import { themas } from "../../global/themas";

type RootStackParamList = {
    Home: undefined;
};

type HomeNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

const mockProdutos = [
    {
        id: 1,
        name: "Bolo de Chocolate",
        price: 25.9,
        disponible: "Disponível em: P2",
        image: require("../../assets/images/tortamorangofatia-removebg-preview.png"),
    },
    {
        id: 2,
        name: "Cupcake de Morango",
        price: 8.5,
        disponible: "Disponível em: P1",
        image: require("../../assets/images/tortamorangofatia-removebg-preview.png"),
    },
    {
        id: 3,
        name: "Torta de Limão",
        price: 32.0,
        disponible: "Disponível em: P1/P2/P3",
        image: require("../../assets/images/tortamorangofatia-removebg-preview.png"),
    },
    {
        id: 4,
        name: "Pão de Mel",
        price: 5.0,
        disponible: "Disponível em: P1",
        image: require("../../assets/images/tortamorangofatia-removebg-preview.png"),
    },
    {
        id: 5,
        name: "Linguiça Artesanal",
        price: 5.0,
        disponible: "Disponível em: P1",
        image: require("../../assets/images/tortamorangofatia-removebg-preview.png"),
    }
];

export default function ProfileScreen() {
    const navigation = useNavigation<HomeNavigationProp>();

    const [user, setUser] = useState<{
        email: string;
        name: string;
        cellphoneNumber: string;
    } | null>(null);

    useEffect(() => {
        const getUserInfo = async () => {
            const userData = await AsyncStorage.getItem("userInfo");
            if (userData) {
                setUser(JSON.parse(userData));
            }
        };

        getUserInfo();
    }, []);

    const renderItem = ({ item }: { item: { id: number; name: string; price: number; disponible: string; image: any } }) => (
        <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.itemImage} />
            <Text 
                style={styles.itemTitle}
                numberOfLines={2} 
                ellipsizeMode="tail" // Adiciona reticências se o texto for muito longo
                >
                {item.name}
            </Text>
            <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
            <Text
                style={[
                    styles.itemDisponible,
                ]}
            >
                {item.disponible}
            </Text>
        </View>
    );

    return (
        <>
            <HeaderHome />
            <View style={styles.container}>
                <FlatList
                    data={mockProdutos} 
                    renderItem={renderItem} 
                    keyExtractor={(item) => item.id.toString()} 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{ paddingHorizontal: 10 }} 
                    ItemSeparatorComponent={() => <View style={styles.itemSeparator} />} 
                />
            </View>
            <FooterHome />
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        padding: 10,
        backgroundColor: "#f4f4f4",
    },
    itemContainer: {
        width: 170, 
        height: 200, 
        marginHorizontal: 8, 
        borderRadius: 8,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        alignItems: "center",
        padding: 10,
        justifyContent: "space-between",
    },
    itemImage: {
        width: 120,
        height: 100,
        borderRadius: 8,
    },
    itemTitle: {
        fontSize: 14,
        fontWeight: "bold",
        textAlign: "center",
        color: "#333",
    },
    itemPrice: {
        fontSize: 16,
        color: "#333",
        fontWeight: "bold",
    },
    itemDisponible: {
        fontSize: 11,
        textAlign: "center",
        color: themas.colors.lightGray,
    },
    itemSeparator: {
        width: 0.5, 
        backgroundColor: themas.colors.lightGray, 
    },
});

