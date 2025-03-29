import { StyleSheet } from 'react-native';
import { themas } from '../../global/themas';

export const styles = StyleSheet.create({
    footer: {
        width: themas.dimensions.width,
        height: '8%',
        backgroundColor: themas.colors.primary,
        alignItems: 'center',
        justifyContent: 'space-around',
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row'
    },
    iconContainer: {
        alignItems: 'center',
      },
      iconText: {
        color: 'white',
        fontSize: 10,
        marginTop: 5,
      }
});