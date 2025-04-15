import { StyleSheet } from 'react-native';
import { themas } from "../../global/themas"

export const style = StyleSheet.create({
    passwordContainer: {
        width: '70%',
        height: '13%',
        marginTop: '10%',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: themas.colors.boxInputColor,
        borderRadius: 15,
        paddingLeft: '4%',
    },
    boxInput: {
        flex: 1,
    },
    iconEye: {
        position: 'absolute',
        right: 15,
    }
})