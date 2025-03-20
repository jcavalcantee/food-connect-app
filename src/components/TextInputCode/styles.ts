import { StyleSheet } from "react-native";
import { themas } from "../../global/themas"

export const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // backgroundColor: 'darkorange',
        width: '100%',
        paddingStart: 66,
        paddingEnd: 66,
        paddingTop: 44 
    },

    textInputCode: {
        backgroundColor: themas.colors.boxInputColor,
        width: '16%',
        height: '100%',
        fontSize: 28,
        textAlign: 'center'
    },
})