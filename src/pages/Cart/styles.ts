import { StyleSheet } from "react-native"

export const style = StyleSheet.create({
    container: {
        padding: 24,
        backgroundColor: '#fff',
    },
    backButton: {
        marginBottom: 16,
    },
    backText: {
        marginTop: 20,
        fontSize: 24,
        color: 'red',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 24,
    },
    storeHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    logo: {
        width: 40,
        height: 40,
        marginRight: 12,
    },
    storeName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    addMore: {
        color: 'red',
        fontWeight: 'bold',
        marginTop: 4,
    },
    sectionTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginTop: 16,
    },
    clearButton: {
        position: 'absolute',
        right: 24,
        top: 220,
    },
    clearText: {
        color: 'red',
        fontWeight: 'bold',
    },
    item: {
        flexDirection: 'row',
        marginVertical: 12,
        alignItems: 'center',
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: 8,
        marginRight: 12,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontWeight: 'bold',
    },
    itemPrice: {
        marginVertical: 2,
    },
    itemSubtitle: {
        color: 'gray',
        fontSize: 12,
    },
    quantityBox: {
        flexDirection: 'row',
        backgroundColor: '#eee',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 8,
        alignItems: 'center',
    },
    quantityButton: {
        fontSize: 18,
        marginHorizontal: 8,
    },
    quantityText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    summary: {
        marginTop: 24,
    },
    summaryTitle: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 12,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 4,
    },
    payButton: {
        backgroundColor: 'red',
        borderRadius: 20,
        paddingVertical: 14,
        marginTop: 24,
        alignItems: 'center',
    },
    payText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    itemsContainer: {
        maxHeight: 300,
        marginBottom: 20,
    }

});