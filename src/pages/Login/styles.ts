import { StyleSheet } from 'react-native';
import { themas } from "../../global/themas"

export const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: themas.dimensions.height,
        width: themas.dimensions.width
    },
    content: {
        height: '60%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    info: {
        fontSize: 13,
        marginTop: '2%'
    },
    footer: {
        height: '20%',
        width: '100%',
        alignItems: 'center'
    },
    cadastrese: {
        marginTop: '10%',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        fontSize: 13
    },
    forgotpasswordcontainer: {
        width: '100%',
        paddingHorizontal: '15%'
    },
    forgotpassword: {
        marginTop: '1%',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        fontSize: 13,
        alignSelf: 'flex-start',
    },
    errorText: {
        color: 'red',
        fontSize: 13,
        marginTop: '2%'
    },
    button: {
        backgroundColor: themas.colors.primary,
        height: '30%',
        width: '30%',
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        color: themas.colors.whiteText,
        fontSize: 15
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
    modalButton: {
        backgroundColor: '#007BFF',
        padding: 10,
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
})