import { StyleSheet } from 'react-native';
import { themas } from "../../global/themas"

export const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.4)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    modal: {
      backgroundColor: '#fff',
      borderRadius: 15,
      width: '100%',
      padding: 20,
    },
    closeBtn: {
      alignSelf: 'flex-end',
    },
    closeText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: themas.colors.primary,
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 16,
      textAlign: 'center',
      color: themas.colors.primary,
    },
    subtitle: {
      fontSize: 16,
      fontWeight: '500',
      marginTop: 12,
    },
    confirmBtn: {
      backgroundColor: themas.colors.primary,
      borderRadius: 15,
      padding: 12,
      marginTop: 24,
      alignItems: 'center',
    },
    confirmText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold'
    },
});