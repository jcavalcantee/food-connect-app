import React, { useEffect, useState } from "react";
import { View, Text, FlatList, ScrollView } from "react-native";
import { styles } from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderHome from "../../components/HeaderHome";
import FooterHome from "../../components/FooterHome";
import AccessibilityButton from "../../components/Accessibility/accessibilityButton";
import { getProducts } from "../../api/product/apiGetProducts";
import ProductItem from "../../components/CardProductCategory";
import ChooseSnackBarModal from "../../components/ChooseSnackBarModal/ChooseSnackBarModal";
import { getStoresGroupedByFoodCourt } from "../../api/product/apiGetSotresGroupedByFoodCourt";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
    Home: undefined;
    StoreProducts: {
        storeInfo: {
            foodCourt: string;
            storeName: string;
            storeId: number;
        };
    };
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

export default function ProfileScreen() {
    const [products, setProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState<{
        email: string;
        name: string;
        cellphoneNumber: string;
    } | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<any[]>([]);
    const [error, setError] = useState<string | null>(null);

    const navigation = useNavigation<NavigationProp>();

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
                const data = await getProducts();
                const groupedProducts = data.reduce((acc: any, product: any) => {
                    const category = String(product.category_name);
                    if (!acc[category]) {
                        acc[category] = [];
                    }
                    acc[category].push(product);
                    return acc;
                }, {});

                const formattedProducts = Object.keys(groupedProducts)
                    .map((category) => ({
                        title: String(category),
                        data: groupedProducts[category],
                    }))
                    .sort((a, b) => {
                        if (a.title === "Salgados") return -1;
                        if (b.title === "Salgados") return 1;
                        return 0;
                    });

                setProducts(formattedProducts);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
                setError("Não foi possível carregar os produtos. Tente novamente mais tarde.");
            } finally {
                setLoading(false);
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

    const renderItem = (item: any) => (
        <ProductItem {...item}
            onPress={async () => {
                try {
                    const stores = await getStoresGroupedByFoodCourt(item.product_name);
                    setSelectedProduct(stores);
                    setModalVisible(true);
                } catch (error) {
                    console.error("Erro ao buscar lojas:", error);
                }
            }}
        />
    );

    return (
        <>
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                <HeaderHome username={user?.name.split(" ")[0] || "Visitante"} />
                {products.map((category) => renderCategory(category))}
            </ScrollView>
            <FooterHome />

            <AccessibilityButton />

            <ChooseSnackBarModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                onConfirm={(lanchonete) => {
                    navigation.navigate('StoreProducts', { storeInfo: lanchonete });
                }}
                data={selectedProduct ? selectedProduct : []}
            />
        </>
    );
}