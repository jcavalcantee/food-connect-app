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
        height: "50%",
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

    footer: {
        width: "100%",
        alignItems: "center",
    },
});
