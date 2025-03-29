import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderHome from "../../components/HeaderHome";
import FooterHome from "../../components/FooterHome";
import { themas } from "../../global/themas";

const mockCategorias = [
    {
        title: "Salgados",
        data: [
            {
                id: 1,
                name: "Coxinha de Frango",
                price: 7.0,
                disponible: "Disponível: P1, P2 e P3",
                image: require("../../assets/images/coxinha.png"),
            },
            {
                id: 2,
                name: "Esfiha de Carne",
                price: 7.0,
                disponible: "Disponível: P1",
                image: require("../../assets/images/coxinha.png"),
            },
            {
                id: 3,
                name: "Croissant de Queijo",
                price: 7.0,
                disponible: "Disponível: P1",
                image: require("../../assets/images/coxinha.png"),
            },
            {
                id: 10,
                name: "Kibe",
                price: 6.0,
                disponible: "Disponível: P1, P3",
                image: require("../../assets/images/coxinha.png"),
            },
            {
                id: 11,
                name: "Empada de Frango",
                price: 8.0,
                disponible: "Disponível: P2",
                image: require("../../assets/images/coxinha.png"),
            },
        ],
    },
    {
        title: "Bebidas",
        data: [
            {
                id: 4,
                name: "Coca Cola - 350ml",
                price: 5.0,
                disponible: "Disponível: P1, P2 e P3",
                image: require("../../assets/images/coca.jpg"),
            },
            {
                id: 5,
                name: "Guaraviton - 500ml",
                price: 6.0,
                disponible: "Disponível: P1",
                image: require("../../assets/images/coca.jpg"),
            },
            {
                id: 6,
                name: "Guaraná Zero - 350ml",
                price: 5.0,
                disponible: "Disponível: P2",
                image: require("../../assets/images/coca.jpg"),
            },
            {
                id: 12,
                name: "Água Mineral - 500ml",
                price: 3.0,
                disponible: "Disponível: P1, P2",
                image: require("../../assets/images/coca.jpg"),
            },
            {
                id: 13,
                name: "Suco de Laranja - 300ml",
                price: 7.0,
                disponible: "Disponível: P1, P3",
                image: require("../../assets/images/coca.jpg"),
            },
        ],
    },
    {
        title: "Pratos Feitos",
        data: [
            {
                id: 7,
                name: "Virada à Paulista",
                price: 25.0,
                disponible: "Disponível: P2 e P3",
                image: require("../../assets/images/pf.jpg"),
            },
            {
                id: 8,
                name: "Bife à Parmegiana",
                price: 30.0,
                disponible: "Disponível: P2 e P3",
                image: require("../../assets/images/pf.jpg"),
            },
            {
                id: 9,
                name: "Bife Acebolado",
                price: 28.0,
                disponible: "Disponível: P2 e P3",
                image: require("../../assets/images/pf.jpg"),
            },
            {
                id: 14,
                name: "Frango Grelhado",
                price: 22.0,
                disponible: "Disponível: P1, P3",
                image: require("../../assets/images/pf.jpg"),
            },
            {
                id: 15,
                name: "Peixe Frito com Arroz e Salada",
                price: 35.0,
                disponible: "Disponível: P1, P2",
                image: require("../../assets/images/pf.jpg"),
            },
        ],
    },
    {
        title: "Sobremesas",
        data: [
            {
                id: 16,
                name: "Torta de Morango",
                price: 12.0,
                disponible: "Disponível: P1",
                image: require("../../assets/images/tortamorangofatia-removebg-preview.png"),
            },
            {
                id: 17,
                name: "Pudim de Leite",
                price: 10.0,
                disponible: "Disponível: P2 e P3",
                image: require("../../assets/images/tortamorangofatia-removebg-preview.png"),
            },
            {
                id: 18,
                name: "Brigadeiro",
                price: 3.0,
                disponible: "Disponível: P1, P3",
                image: require("../../assets/images/tortamorangofatia-removebg-preview.png"),
            },
            {
                id: 19,
                name: "Mousse de Maracujá",
                price: 8.0,
                disponible: "Disponível: P1, P2",
                image: require("../../assets/images/tortamorangofatia-removebg-preview.png"),
            },
            {
                id: 20,
                name: "Bolo de Cenoura",
                price: 15.0,
                disponible: "Disponível: P1, P3",
                image: require("../../assets/images/tortamorangofatia-removebg-preview.png"),
            },
        ],
    },
];

export default function ProfileScreen() {
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

    const renderCategory = (category: { title: string; data: any[] }) => (
        <View key={category.title} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <FlatList
                data={category.data}
                renderItem={({ item }) => renderItem(item)}
                keyExtractor={(item) => item.id.toString()}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10 }}
                ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            />
        </View>
    );

    const renderItem = (item: { id: number; name: string; price: number; disponible: string; image: any }) => (
        <View style={styles.itemContainer}>
            <Image source={item.image} style={styles.itemImage} />
            <Text style={styles.itemTitle} numberOfLines={2} ellipsizeMode="tail">
                {item.name}
            </Text>
            <Text style={styles.itemPrice}>R$ {item.price.toFixed(2)}</Text>
            <Text style={styles.itemDisponible}>{item.disponible}</Text>
        </View>
    );

    return (
        <>
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                <HeaderHome />
                {mockCategorias.map((category) => renderCategory(category))}
            </ScrollView>
            <FooterHome />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContent: {
        paddingBottom: "100%"
    },
    categoryContainer: {
        marginVertical: 15,
    },
    categoryTitle: {
        fontSize: 20,
        fontWeight: "bold",
        color: "black",
        marginLeft: 10,
        paddingLeft: "5%",
    },
    itemContainer: {
        width: 160,
        height: 200,
        marginHorizontal: 8,
        borderRadius: 8,
        alignItems: "center",
        padding: 10,
        justifyContent: "space-between",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
    },
    itemImage: {
        width: 120,
        height: 100,
        borderRadius: 15,
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
        color: themas.colors.lightGrayForText,
    },
    itemSeparator: {
        width: 0.5,
        backgroundColor: themas.colors.lightGrayForSeparator,
    },
});

