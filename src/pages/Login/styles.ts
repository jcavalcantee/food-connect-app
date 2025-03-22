import { StyleSheet } from 'react-native';

export const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    content: {
        height: '60%',
        width: '100%',
        // backgroundColor: 'gray',
        alignItems: 'center',
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
        // backgroundColor: 'green',
        height: '20%',
        width: '100%',
        alignItems: 'center'
    },

    cadastrese: {
        marginTop: '10%',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        fontSize: 13
    }
})