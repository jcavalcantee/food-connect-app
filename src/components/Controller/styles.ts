import { StyleSheet } from 'react-native';
import { themas } from "../../global/themas"

export const style = StyleSheet.create({

    inputContainer: {
        width: "120%",
        height: "50%",
    },

    label: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#555",
    },

    errorText: {
        color: "red",
        fontSize: 12,
        textAlign: "left",
        width: "100%",
    },

    input: {
        width: "80%",
        height: "55%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 50,
        paddingHorizontal: 10,
        marginTop: 5,
        backgroundColor: themas.colors.boxInputColor,
    },

    inputMasked: {
        width: "95%",
        height: "45%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 50,
        paddingHorizontal: 10,
        marginTop: 5,
        backgroundColor: themas.colors.boxInputColor,
    },

    disabledInput: {
        width: "80%",
        height: "50%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 50,
        paddingHorizontal: 10,
        marginTop: 5,
        backgroundColor: "#C0C0C0",
    },
});
