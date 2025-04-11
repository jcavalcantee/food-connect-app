import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";

interface ProductItemProps {
    product_name: string;
    product_image: string;
    available_in_food_courts: string;
    onPress?: () => void;
}

export default function ProductItem({
    product_name,
    product_image,
    available_in_food_courts,
    onPress,
}: ProductItemProps) {
    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.itemContainer}>
                <Image
                    source={
                        product_image
                            ? { uri: product_image }
                            : require("../../assets/images/tortamorangofatia-removebg-preview.png")
                    }
                    style={styles.itemImage}
                />
                <Text style={styles.itemTitle} numberOfLines={2} ellipsizeMode="tail">
                    {product_name}
                </Text>
                <Text style={styles.itemDisponible}>Disponível em: {available_in_food_courts}</Text>
            </View>
        </TouchableOpacity>
    );
}