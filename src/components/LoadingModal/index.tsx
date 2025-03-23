import React from "react";
import { Modal, View, ActivityIndicator, StyleSheet } from "react-native";

export default function LoadingModal({ visible }: { visible: boolean }) {
    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.4)", // Efeito de blur (transparente escuro)
        justifyContent: "center",
        alignItems: "center",
    },
    loaderContainer: {
        width: 80,
        height: 80,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});