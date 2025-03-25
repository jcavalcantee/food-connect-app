import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Control, Controller } from "react-hook-form";
import { style } from "./styles"; // Importe seu estilo aqui

interface ControlledTextInputProps {
    control: Control<any>;
    name: string;
    label: string;
    placeholder: string;
    rules?: object;
    secureTextEntry?: boolean;
    errorMessage?: string;
    editable?: boolean;
    keyboardType?: any;
    maxLength?: number;
    value?: string;
    style?: any;
    onChangeText?: (text: string) => void;
}

export default function ControlledTextInput({
    control,
    name,
    label,
    rules,
    errorMessage,
    keyboardType,
    maxLength,
    value,
    onChangeText,
    ...textInputProps
}: ControlledTextInputProps) {
    return (
        <View style={[style.inputContainer]}>
            <Text style={style.label}>{label}</Text>

            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field: { onChange, onBlur, value } }) => (
                    <TextInput
                        style={style.input}
                        {...textInputProps}
                        value={value} // Aqui o valor é controlado pelo react-hook-form
                        onChangeText={(text) => {
                            onChange(text); // Atualiza o estado do react-hook-form
                            if (onChangeText) {
                                onChangeText(text); // Chama a função adicional para manipulação do telefone
                            }
                        }}
                        onBlur={onBlur}
                        placeholder={textInputProps.placeholder}
                        secureTextEntry={textInputProps.secureTextEntry}
                        editable={textInputProps.editable}
                        keyboardType={keyboardType}
                        maxLength={maxLength}
                    />
                )}
            />

            {errorMessage && <Text style={style.errorText}>{errorMessage}</Text>}
        </View>
    );
}