import React, { useState } from 'react';
import { TextInput, View, TouchableOpacity } from 'react-native';
import { style } from './styles';
import { Ionicons } from '@expo/vector-icons';

interface InputPasswordFormsProps {
  placeholder?: string;
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
}

export default function InputPasswordForms({
  placeholder = "Digite sua senha",
  value,
  onChangeText,
  onBlur
}: InputPasswordFormsProps) {
  const [secureText, setSecureText] = useState(true);

  function toggleSecureText() {
    setSecureText(!secureText);
  }

  return (
    <View style={style.passwordContainer}>
      <TextInput
        style={style.boxInput}
        placeholder={placeholder}
        secureTextEntry={secureText}
        value={value}
        onChangeText={onChangeText}
        onBlur={onBlur}
      />
      <TouchableOpacity onPress={toggleSecureText} style={style.iconEye}>
        <Ionicons
          name={secureText ? 'eye-off' : 'eye'}
          size={24}
          color="gray"
        />
      </TouchableOpacity>
    </View>
  );
}