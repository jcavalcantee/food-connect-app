import { StyleSheet } from 'react-native';
import { themas } from "../../global/themas"

export const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        alignItems: 'center',
    },
    imageLogo: {
        width: 55,
        height: 50,
        marginBottom: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: themas.colors.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 15,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});