import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';

export default function FooterHome() {

  type RootStackParamList = {
    OrderList: undefined; // Define the route and its parameters
    Home: undefined; // Define the route and its parameters
    AlterUser: undefined; // Define the route and its parameters
    Profile: undefined; // Define the route and its parameters
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.iconContainer}
        onPress={() => navigation.navigate('Home')}>
        <MaterialIcons name="home" size={30} color="white" />
        <Text style={styles.iconText}>INÍCIO</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.iconContainer}
        onPress={() => navigation.navigate('OrderList')}>
        <Ionicons name="receipt-outline" size={30} color="white" />
        <Text style={styles.iconText}>PEDIDOS</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Profile')}
      >
        <Feather name="user" size={30} color="white" />
        <Text style={styles.iconText}>PERFIL</Text>
      </TouchableOpacity>
    </View>
  );
}