import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Image, ScrollView, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderHome from "../../components/HeaderHome";
import FooterHome from "../../components/FooterHome";
import { themas } from "../../global/themas";
import { getProducts } from "../../api/product/apiGetProducts";

export default function ProfileScreen() {
    const [products, setProducts] = useState<any[]>([]); // Estado para armazenar os produtos agrupados por categoria
    const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
    const [user, setUser] = useState<{
        email: string;
        name: string;
        cellphoneNumber: string;
    } | null>(null);

    const [error, setError] = useState<string | null>(null); // Estado para tratar erros

    useEffect(() => {
        const getUserInfo = async () => {
            const userData = await AsyncStorage.getItem("userInfo");
            if (userData) {
                setUser(JSON.parse(userData));
            }
        };
        getUserInfo();
    }, []);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts(); // Chamada à API
                console.log("Dados retornados pela API:", data); // Log dos dados retornados

                // Agrupar os produtos por categoria
                const groupedProducts = data.reduce((acc: any, product: any) => {
                    const category = product.category_name;
                    if (!acc[category]) {
                        acc[category] = [];
                    }

                    product.available_in_food_courts = `Disponível em: ${product.available_in_food_courts}`;

                    acc[category].push(product);
                    return acc;
                }, {});

                // Converter o objeto agrupado em um array
                const formattedProducts = Object.keys(groupedProducts)
                .map((category) => ({
                    title: category,
                    data: groupedProducts[category],
                }))
                .sort((a, b) => {
                    // Exibir "Salgados" antes de "Bebidas"
                    if (a.title === "Salgados") return -1;
                    if (b.title === "Salgados") return 1;
                    return 0;
                });

                setProducts(formattedProducts); // Atualiza o estado com os produtos agrupados
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
                setError("Não foi possível carregar os produtos. Tente novamente mais tarde.");
            } finally {
                setLoading(false); // Finaliza o carregamento
            }
        };
        fetchProducts();
    }, []);

    const renderCategory = (category: { title: string; data: any[] }) => (
        <View key={category.title} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.title}</Text>
            <FlatList
                data={category.data}
                renderItem={({ item }) => renderItem(item)}
                keyExtractor={(item) => item.product_name}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 10 }}
                ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
            />
        </View>
    );

    const renderItem = (item: { product_name: string; product_image: string; available_in_food_courts: string }) => (
        <View style={styles.itemContainer}>
            <Image
                source={item.product_image ? { uri: item.product_image } : require("../../assets/images/tortamorangofatia-removebg-preview.png")}
                style={styles.itemImage}
            />
            <Text style={styles.itemTitle} numberOfLines={2} ellipsizeMode="tail">
                {item.product_name}
            </Text>
            <Text style={styles.itemDisponible}>{item.available_in_food_courts}</Text>
        </View>
    );

    return (
        <>
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                <HeaderHome />
                {products.map((category) => renderCategory(category))}
            </ScrollView>
            <FooterHome />
        </>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    errorText: {
        color: "red",
        fontSize: 16,
        textAlign: "center",
        marginHorizontal: 20,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    emptyText: {
        fontSize: 16,
        color: "#666",
    },
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollContent: {
        paddingBottom: 400, // Espaço para o footer
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
    itemDisponible: {
        fontSize: 11,
        textAlign: "center",
        color: themas.colors.lightGrayForText,
    },
    itemSeparator: {
        width: 10,
        backgroundColor: "transparent",
    },
    
});

