import { StatusBar, StyleSheet } from 'react-native';
import { themas } from '../../global/themas';
const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

export const styles = StyleSheet.create({
    safeare: {
        height: '40%',
        width: themas.dimensions.width
    },
    container: {
        paddingTop: statusBarHeight,
        height: '55%',
        // backgroundColor: 'darkorange',
        // alignItems: 'center',
        flexDirection: 'row',
        
        justifyContent: 'space-between',
        paddingHorizontal: '5%'
    },
    imageLogo: {
        width: '50%',
        height: '80%',
    },
    subheader: {
        height: '35%',
        width: '100%',
        // backgroundColor: 'lightblue',
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
        paddingBottom: '2%'
    }
})