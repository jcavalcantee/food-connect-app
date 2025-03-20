import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: 'blue',
    },

    content: {
        alignItems: 'center',
        // backgroundColor: 'lightblue',
        // height: '50%',
        // width: '100%'
    },

    timer: {
        paddingTop: '5%'
    },

    footer: {
        // backgroundColor: 'green',
        height: '20%',
        width: '100%',
        alignItems: 'center'
    },

    title: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    
    info: {
        fontSize: 13,
        marginTop: '2%',
        textAlign: 'center'
    },

    infoCodigo: {
        backgroundColor: 'whitesmoke',
        alignItems: 'center',
        // marginTop: '-10%'
    },
    
    inputBox: {
        justifyContent: 'center',
        alignItems: 'center'
    },

    reenviarEmail: {
        marginTop: '10%',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        color: 'blue',
        fontSize: 13
    }
});