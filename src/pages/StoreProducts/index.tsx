import React, { useEffect, useState } from "react";
import {
    View,
    Text,
    Image,
    FlatList,
    TouchableOpacity
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import { styles } from "./styles";
import HeaderHome from "../../components/HeaderHome";
import FooterHome from "../../components/FooterHome";
import { getProductsByStore } from "../../api/product/apiGetProducts";
import Logo from "../../assets/images/logo-sem-fundo.png"

type Product = {
    id: number;
    name: string;
    price: number;
    image_url: string;
    product_category_id: number;
};

export default function StoreProductsScreen() {
    const [allProducts, setAllProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<number>(1);
    const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
    const route = useRoute();
    const { storeId } = route.params as { storeId: number };

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProductsByStore(storeId);
                setAllProducts(data);
                filterByCategory(1, data);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };
        fetchProducts();
    }, []);

    const filterByCategory = (category: number, productsList = allProducts) => {
        const filtered = productsList.filter((p) => p.product_category_id === category);
        setFilteredProducts(filtered);
        setSelectedCategory(category);
    };

    const increment = (id: number) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: (prev[id] || 0) + 1,
        }));
    };

    const decrement = (id: number) => {
        setQuantities((prev) => ({
            ...prev,
            [id]: Math.max((prev[id] || 0) - 1,),
        }));
    };

    const renderProduct = ({ item }: { item: Product }) => (
        <View style={styles.card}>
            <Image source={{ uri: item.image_url }} style={styles.productImage} />
            <View style={styles.productInfo}>
                <Text style={styles.price}>R$ {item.price.toFixed(2)}</Text>
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
            <TouchableOpacity style={styles.cartIcon}>
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