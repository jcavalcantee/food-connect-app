import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import { styles } from "./styles";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import FooterHome from "../../components/FooterHome";
import { getProductsByStore } from "../../api/product/apiGetProducts";
import Logo from "../../assets/images/logo-sem-fundo.png";
import AsyncStorage from '@react-native-async-storage/async-storage';

type Product = {
    id: number;
    name: string;
    price: number;
    image_url: string;
    product_category_id: number;
    expected_delivery_time?: string;
};

type RootStackParamList = {
    Cart: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Cart'>;

export default function StoreProductsScreen() {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number>(1);
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
    const route = useRoute();
    const { storeId } = route.params as { storeId: number };
    const navigation = useNavigation<NavigationProp>();

    useFocusEffect(
        React.useCallback(() => {
            const fetchProductsAndQuantities = async () => {
                try {
                    const data = await getProductsByStore(storeId);
                    setAllProducts(data);
                    filterByCategory(1, data);

                    const existingCart = await AsyncStorage.getItem('@cartItems');
                    const cartItems = existingCart ? JSON.parse(existingCart) : [];

                    const loadedQuantities: { [key: string]: number } = {};
                    cartItems.forEach((item: any) => {
                        loadedQuantities[item.id] = item.quantidade;
                    });

                    setQuantities(loadedQuantities);
                } catch (error) {
                    console.error("Erro ao buscar produtos ou quantidades:", error);
                }
            };

            fetchProductsAndQuantities();
        }, [storeId])
    );


    const saveQuantitiesToStorage = async (updatedQuantities: any) => {
        try {
            const existingCart = await AsyncStorage.getItem('@cartItems');
            const cartItems = existingCart ? JSON.parse(existingCart) : [];

            const updatedCart = cartItems.map((item: any) => ({
                ...item,
                quantidade: updatedQuantities[item.id] || 0
            }));

            await AsyncStorage.setItem('@cartItems', JSON.stringify(updatedCart));
        } catch (error) {
            console.error('Erro ao atualizar quantidades no AsyncStorage:', error);
        }
    };

    const filterByCategory = (category: number, productsList = allProducts) => {
        const filtered = productsList.filter((p) => p.product_category_id === category);
        setFilteredProducts(filtered);
        setSelectedCategory(category);
    };

    const increment = (id: number) => {
        setQuantities((prev) => {
            const updated = { ...prev, [id]: (prev[id] || 0) + 1 };
            saveQuantitiesToStorage(updated);
            return updated;
        });
    };

    const decrement = (id: number) => {
        setQuantities((prev) => {
            const newQty = Math.max((prev[id] || 0) - 1, 0);
            const updated = { ...prev, [id]: newQty };
            saveQuantitiesToStorage(updated);
            return updated;
        });
    };


    const addToCart = async (product: Product, quantity: number) => {
        if (quantity <= 0) return;

        const newItem = {
            id: product.id,
            nome: product.name,
            preco: product.price * quantity,
            imagem: product.image_url,
            quantidade: quantity,
            estimativa: product.expected_delivery_time || 'Previsão indisponível'
        };


        try {
            const existingCart = await AsyncStorage.getItem('@cartItems');
            const cartItems = existingCart ? JSON.parse(existingCart) : [];

            // Se o produto já estiver no carrinho, atualiza a quantidade
            const index = cartItems.findIndex((item: any) => item.id === product.id);
            if (index !== -1) {
                cartItems[index].quantidade += quantity;
                cartItems[index].preco += newItem.preco;
            } else {
                cartItems.push(newItem);
            }

            await AsyncStorage.setItem('@cartItems', JSON.stringify(cartItems));
            navigation.navigate('Cart');
        } catch (error) {
            console.error('Erro ao salvar no carrinho:', error);
        }
    };

    const renderProduct = ({ item }: { item: Product }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image_url }} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={styles.price}>R$ {item.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</Text>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.quantityRow}>
                    <TouchableOpacity onPress={() => decrement(item.id)} style={styles.circleButton}>
                        <Text>-</Text>
                    </TouchableOpacity>
                    <Text style={styles.quantityText}>{quantities[item.id] || 0}</Text>
                    <TouchableOpacity onPress={() => increment(item.id)} style={styles.circleButton}>
                        <Text>+</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={styles.cartIcon} onPress={() => addToCart(item, quantities[item.id] || 0)}>
                <Text>🛒</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image source={Logo} style={styles.headerImage} />
                    <View style={styles.headerInfo}>
                        <Text style={styles.storeName}>Engenheiros do Açaí</Text>
                        <Text style={styles.location}>Localização: PI</Text>
                    </View>
                </View>

                <View style={styles.tabs}>
                    <TouchableOpacity onPress={() => filterByCategory(2)} style={styles.circleButton}>
                        <Text style={[styles.tab, selectedCategory === 2 && styles.activeTab]}>Salgados</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => filterByCategory(1)} style={styles.circleButton}>
                        <Text style={[styles.tab, selectedCategory === 1 && styles.activeTab]}>Bebidas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => filterByCategory(3)} style={styles.circleButton}>
                        <Text style={[styles.tab, selectedCategory === 3 && styles.activeTab]}>Pratos Prontos</Text>
                    </TouchableOpacity>

                </View>

                <FlatList
                    data={filteredProducts}
                    renderItem={renderProduct}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.list}
                />
            </View>
            <FooterHome />
        </>
    );
}