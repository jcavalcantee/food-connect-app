import { StyleSheet } from "react-native";
import { themas } from "../../global/themas";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        height: '50%',
    },
    header: {
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: 'darkorange',
        width: '70%',
        height: '25%',
        alignSelf: 'center',
        borderRadius: 15,
    },
    headerImage: {
        width: '20%',
        height: '50%',
        borderRadius: 50,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'black',
    },
    headerInfo: {
        // marginTop: 10,
        alignItems: 'center',
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
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        height: '10%',
    },
    tab: {
        fontSize: 16,
        color: 'gray',
    },
    activeTab: {
        color: 'red',
        borderBottomColor: 'red',
        borderBottomWidth: 2,
    },
    list: {
        paddingHorizontal: 10,
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
    circleButton: {
        backgroundColor: '#eee',
        borderRadius: 20,
        padding: 6,
        marginHorizontal: 8,
    },
    quantityText: {
        fontSize: 16,
    },
    cartIcon: {
        padding: 8,
    },
});