import { StyleSheet } from "react-native";
import { themas } from "../../global/themas";

export const styles = StyleSheet.create({
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
});