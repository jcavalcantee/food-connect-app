import React from 'react';
import { View, SafeAreaView, Text, Image, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { styles } from './styles';
import Logo from "../../assets/images/logo-sem-fundo.png"
import SenacCampus from "../../assets/images/senac_campus.jpg"

interface HeaderHomeProps {
    username: string;
}

export default function HeaderHome({ username }: HeaderHomeProps) {
    return (
        <SafeAreaView style={styles.safeare}>
            <View style={styles.container}>
                <View style={{ width: '10%' }}></View>
                <Image source={Logo} style={styles.imageLogo} />
                <TouchableOpacity>
                    <MaterialCommunityIcons name="shopping-outline" size={30} color="black" />
                </TouchableOpacity>
            </View>
            <Text style={styles.usernameText}>Olá, {username}</Text>
            <View style={styles.subheader}>
                <Image source={SenacCampus} style={styles.imageCarrosel} />
            </View>
        </SafeAreaView>
    );
}