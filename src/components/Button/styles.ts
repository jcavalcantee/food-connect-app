import { StyleSheet } from 'react-native';
import { themas } from "../../global/themas"

export const style = StyleSheet.create({
    confirmButton: {
        width: '40%',
        height: '30%',
        borderRadius: 15,
        marginTop: '12%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: themas.colors.primary
    },

    buttonText: {
        fontSize: 15,
        color: themas.colors.whiteText,
        fontWeight: 'bold'
    }
})