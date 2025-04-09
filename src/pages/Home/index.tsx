import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderHome from "../../components/HeaderHome";
import FooterHome from "../../components/FooterHome";
import { getProducts } from "../../api/product/apiGetProducts";
import ProductItem from "../../components/CardProductCategory";

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
                // Agrupar os produtos por categoria
                const groupedProducts = data.reduce((acc: any, product: any) => {
                    const category = String(product.category_name);
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
                    title: String(category),
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

    const renderItem = (item: any) => <ProductItem {...item} />;

    return (
        <>
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                <HeaderHome username={user?.name.split(" ")[0] || "Visitante"} />
                {products.map((category) => renderCategory(category))}
            </ScrollView>
            <FooterHome />
        </>
    );
}