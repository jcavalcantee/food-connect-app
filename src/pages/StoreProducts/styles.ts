import { CardStyleInterpolators } from "@react-navigation/stack";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height: '50%',
    },
    header: {
        flexDirection: 'row',
        paddingTop: 30,
        width: '100%',
        height: '15%',
        justifyContent: 'space-between',
        paddingHorizontal: '5%'
    },
    headerImage: {
        width: '30%',
        height: '50%',
        borderRadius: 50,
        backgroundColor: 'white',
        borderWidth: 0.5,
        borderColor: 'gray',
    },
    storeName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    location: {
        fontSize: 12,
        color: 'gray',
    },
    tabs: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        borderBottomWidth: 1,
        borderColor: '#ccc',
        height: '5%',
        marginTop: 20,
    },
    tab: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black'
    },
    activeTab: {
        color: 'red',
        borderBottomColor: 'red',
        borderBottomWidth: 2,
    },
    list: {
        paddingHorizontal: 10,
        paddingBottom: '20%',
    },
    card: {
        flexDirection: 'row',
        padding: 10,
        marginVertical: 6,
        borderWidth: 1,
        borderColor: '#eee',
        borderRadius: 15,
        alignItems: 'center',
    },
    productImage: {
        width: 60,
        height: 60,
        borderRadius: 15,
        marginRight: 10,
    },
    productInfo: {
        flex: 1,
    },
    price: {
        fontWeight: 'bold',
    },
    name: {
        fontSize: 14,
    },
    estimated: {
        fontSize: 12,
        color: 'gray',
    },
    quantityRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    tabCircle: {
        padding: 6,
        marginHorizontal: 8,
    },
    circleButton: {
        marginHorizontal: 8,
        backgroundColor: '#f0f0f0',
        borderRadius: 15,
        width: 30,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    quantityText: {
        fontSize: 16,
    },
    cartIcon: {
        padding: 8,
    },

    imageLogo: {
        width: '20%',
        height: '60%',
    },
    imageCarrosel: {
        width: '100%',
        height: '70%'
    },
    storeInfoBox: {
        marginTop: -50,
        width: '50%',
        height: '60%',
        backgroundColor: '#fff',
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 0.5,
        borderColor: 'gray',
    },
    imagesContainer: {
        width: '100%',
        height: '20%',
        alignItems: 'center',
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
    },
});