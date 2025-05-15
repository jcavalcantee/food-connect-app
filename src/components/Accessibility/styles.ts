import { StyleSheet } from 'react-native';
import { themas } from '../../global/themas';

export const style = StyleSheet.create({

    button: {
        position: 'absolute',
        right: 10,
        top: '50%',
        marginTop: -25, 
        backgroundColor: themas.colors.primary,
        padding: 6,
        borderRadius: 30,
        elevation: 5, 
        shadowColor: '#000', 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
    },

    touchableArea: {
    backgroundColor: themas.colors.primary,
    padding: 6, 
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
    },
})