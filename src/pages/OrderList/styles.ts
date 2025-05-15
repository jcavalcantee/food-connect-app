import { StyleSheet } from 'react-native';
import { themas } from '../../global/themas';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 10, // ou 20 se não usar SafeAreaView
        backgroundColor: '#fff',
    },

    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    orderItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 8,
        marginBottom: 12,
        elevation: 2,
    },
    orderId: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: themas.colors.primary,
    },
    orderStatus: {
        fontSize: 16,
        marginBottom: 5,
        color: '#555',
    },
    orderDate: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    orderTotal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        width: '80%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
});

export default styles;
