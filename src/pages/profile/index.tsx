import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import FooterHome from "../../components/FooterHome";
import HeaderApp from "../../components/Header/header";
import { styles } from "./styles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AccessibilityButton from "../../components/Accessibility/accessibilityButton";
import { Alert } from "react-native";
import InfoModal from "../../components/InfoModal";

// Define the RootStackParamList type
type RootStackParamList = {
  AlterUser: undefined;
  Notifications: undefined;
  Login: undefined;
};
export default function Profile() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState<string>('');
  const [modalMessage, setModalMessage] = useState<string>('');
  const [onModalCloseAction, setOnModalCloseAction] = useState<(() => void) | null>(null);

  const handleModalClose = () => {
    setModalVisible(false);
    if (onModalCloseAction) {
      onModalCloseAction();
      setOnModalCloseAction(null);
    }
  };

  const confirmLogout = (navigation: StackNavigationProp<RootStackParamList>) => {
    Alert.alert(
      "Confirmar Logout",
      "Você tem certeza que deseja sair da sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sair",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.clear();
              setModalTitle("Logout");
              setModalMessage("Você saiu da sua conta com sucesso!");
              setOnModalCloseAction(() => () => navigation.navigate('Login'));
              setModalVisible(true);
            } catch (error) {
              setModalTitle("Erro");
              setModalMessage("Não foi possível realizar o logout. Tente novamente.");
              setModalVisible(true);
              console.error("Erro ao realizar logout:", error);
            }
          },
        },
      ]
    );
  };

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

      <TouchableOpacity style={styles.item} onPress={() => confirmLogout(navigation)}>
        <Ionicons name="log-out" size={24} color="#000" />
        <View style={{ marginLeft: 10 }}>
          <Text style={styles.itemTitle}>Sair</Text>
          <Text style={styles.itemSubtitle}>Encerrar sessão</Text>
        </View>
      </TouchableOpacity>
      <FooterHome />

      <AccessibilityButton />
      <InfoModal
        visible={modalVisible}
        onClose={handleModalClose}
        title={modalTitle}
        message={modalMessage}
      />

    </View>
  );
}

function setModalTitle(arg0: string) {
  throw new Error("Function not implemented.");
}
function setModalMessage(arg0: string) {
  throw new Error("Function not implemented.");
}

