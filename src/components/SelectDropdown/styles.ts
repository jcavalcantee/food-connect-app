import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    selectBox: {
      borderWidth: 1,
      borderColor: '#aaa',
      borderRadius: 15,
      padding: 12,
      marginVertical: 8,
      backgroundColor: '#fff',
    },
    selectText: {
      color: '#333',
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.3)',
      justifyContent: 'center',
      padding: 20,
    },
    modalContent: {
      backgroundColor: '#fff',
      borderRadius: 6,
      paddingVertical: 8,
      maxHeight: '60%',
    },
    option: {
      padding: 14,
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
    },
    optionText: {
      fontSize: 16,
      color: '#333',
    },
});