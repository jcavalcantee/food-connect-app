import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';
import { MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';

export default function FooterHome() {
 return (
   <View style={styles.footer}>
         <TouchableOpacity style={styles.iconContainer}>
              <MaterialIcons name="home" size={30} color="white" />
              <Text style={styles.iconText}>INÍCIO</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.iconContainer}>
              <Feather name="search" size={30} color="white" />
              <Text style={styles.iconText}>BUSCAR</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.iconContainer}>
              <Ionicons name="receipt-outline" size={30} color="white" />
              <Text style={styles.iconText}>PEDIDOS</Text>
         </TouchableOpacity>
         <TouchableOpacity style={styles.iconContainer}>
              <Feather name="user" size={30} color="white" />
              <Text style={styles.iconText}>PERFIL</Text>
         </TouchableOpacity>
    </View>
  );
}