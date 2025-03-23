// filepath: c:\Users\lucas\Senac\5º SEMESTRE\PI\frontend_mobile\food-connect-app\src\components\Controller\ControlledTextInput.tsx
import React from "react";
import { Controller } from "react-hook-form";
import { View, Text, StyleSheet } from "react-native";
import { style } from "../../pages/RegisterCustomerScreen/styles";
import { TextInput } from "react-native";

interface ControlledTextInputProps {
    control: any;
    name: string;
    label: string;
    placeholder: string;
    rules?: any;
    secureTextEntry?: boolean;
    errorMessage?: string;
    editable?: boolean;
    style?: any;
}

export default function ControlledTextInput({ control, name, label, rules, errorMessage, ...textInputProps }: ControlledTextInputProps) {
    return (
        <View style={[style.inputContainer]}>
            <Text style={style.label}>{label}</Text>
            
            <Controller
                control={control}
                name={name}
                rules={rules}
                render={({ field }) => (
                    <TextInput
                        style={style.input}
                        {...textInputProps}
                        value={field.value}
                        onChangeText={field.onChange}
                        onBlur={field.onBlur}
                    />
                )}
            />

            {errorMessage && <Text style={style.errorText}>{errorMessage}</Text>}
        </View>
    );
}