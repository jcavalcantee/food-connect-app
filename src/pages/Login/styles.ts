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

    cadastrese: {
        marginTop: '10%',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        fontSize: 13
    }
})