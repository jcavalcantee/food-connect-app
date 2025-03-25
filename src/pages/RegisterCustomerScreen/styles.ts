import { StyleSheet } from 'react-native';
import { themas } from '../../global/themas';

export const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 20,
    },

    content: {
        width: "100%",
        height: "30%",
    },

    title: {
        fontSize: 22,
        marginBottom: 20,
        fontWeight: "bold",
        color: "#333",
        alignSelf: "flex-start",
    },

    label: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#555",
    },

    footer: {
        width: "100%",
        alignItems: "center",
    },

    inputMasked: {
        width: "95%",
        height: "25%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 50,
        paddingHorizontal: 10,
        marginTop: 5,
        backgroundColor: themas.colors.boxInputColor,
    },

    senha: {
        marginTop: '6%',
    },

    errorText: {
        color: "red",
        fontSize: 12,
        textAlign: "left",
        width: "100%",
    },
});
