import React from "react";
import { View, Text, Image } from "react-native";
import { styles } from "./styles";

interface ProductItemProps {
    product_name: string;
    product_image: string;
    available_in_food_courts: string;
}

export default function ProductItem({ product_name, product_image, available_in_food_courts }: ProductItemProps) {
    return (
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
            <Text style={styles.itemDisponible}>{available_in_food_courts}</Text>
        </View>
    );
}