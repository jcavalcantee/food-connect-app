import { View, TouchableOpacity, Text } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, Feather, Ionicons } from '@expo/vector-icons';
import { NavigationProp } from '@react-navigation/native';

export default function FooterHome() {

  type RootStackParamList = {
    Home: undefined;
    AlterUser: undefined;
  };

  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('Home')}
      >
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
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={() => navigation.navigate('AlterUser')}
      >
        <Feather name="user" size={30} color="white" />
        <Text style={styles.iconText}>PERFIL</Text>
      </TouchableOpacity>
    </View>
  );
}