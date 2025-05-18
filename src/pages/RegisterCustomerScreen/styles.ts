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
        height: "30%",
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalText: {
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
    },
    modalButtons: {
        flexDirection: 'row', // Organiza os botões em linha
        justifyContent: 'space-around', // Espaçamento uniforme entre os botões
        marginTop: 20,
        width: '100%',
    },
    modalButton: {
        backgroundColor: '#007BFF', // Cor do botão "Aceitar"
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '40%', // Largura dos botões
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
