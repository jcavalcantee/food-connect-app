import { StatusBar, StyleSheet } from 'react-native';
import { themas } from '../../global/themas';
const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

export const styles = StyleSheet.create({
    safeare: {
        height: '30%',
        width: themas.dimensions.width
    },
    container: {
        paddingTop: statusBarHeight,
        height: '50%',
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '5%'
    },
    imageLogo: {
        width: '20%',
        height: '60%',
    },
    subheader: {
        height: '35%',
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    imageCarrosel: {
        width: '90%',
        height: '100%',
        borderRadius: 15,
    },
    usernameText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: '5%',
        paddingBottom: '2%',
        backgroundColor: '#fff',
        height: '15%',
    },
    cartItemsCount: {
        position: 'absolute',
        top: 20,
        right: -4,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 15,
        height: 15,
        textAlign: 'center',
        color: 'white',
        fontSize: 10,
        fontWeight: 'bold',
    }
})