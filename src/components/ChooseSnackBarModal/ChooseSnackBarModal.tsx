import React, { useState, useEffect } from 'react';
import { styles } from './styles';
import {
  Modal,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import SelectDropdown from '../../components/SelectDropdown/SelectDropdown';

type Store = {
  storeId: number;
  storeName: string;
};

type GroupedByFoodCourt = {
  foodCourt: string;
  stores: Store[];
};

type Props = {
  visible: boolean;
  onClose: () => void;
  onConfirm: (storeId: string | number) => void;
  data: GroupedByFoodCourt[];
};

const ChooseSnackBarModal: React.FC<Props> = ({
  visible,
  onClose,
  onConfirm,
  data,
}) => {
  const [pracaSelecionada, setPracaSelecionada] = useState<string | number>('');
  const [lanchoneteSelecionada, setLanchoneteSelecionada] = useState<string | number | null>(null);

  const pracas = data.map((item) => ({
    label: item.foodCourt,
    value: item.foodCourt,
  }));

  const lanchonetes = pracaSelecionada
    ? data
      .find((item) => item.foodCourt === pracaSelecionada)
      ?.stores.map((store) => ({
        label: store.storeName,
        value: store.storeId,
      })) ?? []
    : [];

  useEffect(() => {
    if (!visible) {
      setPracaSelecionada('');
      setLanchoneteSelecionada(null);
    }
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>

          <Text style={styles.title}>Escolha a lanchonete</Text>

          <Text style={styles.subtitle}>Praça de alimentação</Text>
          <SelectDropdown
            options={pracas}
            selectedValue={pracaSelecionada}
            onValueChange={(value) => {
              setPracaSelecionada(value);
              setLanchoneteSelecionada(null);
            }}
          />

          <Text style={styles.subtitle}>Lanchonete</Text>
          <SelectDropdown
            options={lanchonetes}
            selectedValue={lanchoneteSelecionada}
            onValueChange={setLanchoneteSelecionada}
          />

          <TouchableOpacity
            style={styles.confirmBtn}
            onPress={() => {
              if (lanchoneteSelecionada !== null) {
                onConfirm(lanchoneteSelecionada);
                onClose();
              }
            }}
            disabled={!pracaSelecionada || lanchoneteSelecionada === null}
          >
            <Text style={styles.confirmText}>Confirmar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ChooseSnackBarModal;