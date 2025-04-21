import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import FooterHome from "../../components/FooterHome";
import HeaderApp from "../../components/Header/header";
import { styles } from "./styles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Define the RootStackParamList type
type RootStackParamList = {
  AlterUser: undefined;
  Notifications: undefined;
};



export default function Profile() {
  
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

    return (
        <View style={styles.container}>
          <HeaderApp />
            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('AlterUser')}>
              <MaterialIcons name="account-circle" size={24} color="#000" />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.itemTitle}>Dados da conta</Text>
                <Text style={styles.itemSubtitle}>Minhas informações da conta</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Notifications')}>
              <Ionicons name="notifications" size={24} color="#000" />
              <View style={{ marginLeft: 10 }}>
                <Text style={styles.itemTitle}>Notificações</Text>
                <Text style={styles.itemSubtitle}>Minha central de notificações</Text>
              </View>
            </TouchableOpacity>
          <FooterHome />
        </View>
    );
}