import Logo from "../../assets/images/icon.png";
import { View, Modal, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from './styles';

type Props = {
    visible: boolean;
    onClose: () => void;
    title: string;
    message: string;
};

const InfoModal: React.FC<Props> = ({
    visible,
    onClose,
    title,
    message
}) => {

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Image source={Logo} style={styles.imageLogo} />
                    <Text style={styles.modalTitle}>{title}</Text>
                    <Text style={styles.modalMessage}>{message}</Text>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>Fechar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
}

export default InfoModal;