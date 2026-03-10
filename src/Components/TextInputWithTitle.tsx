import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TextInputProps,
    TouchableOpacity,
} from 'react-native';
import { Colors } from '../Utils/Colors';
import { Fonts } from '../Utils/Fonts';

interface Props extends TextInputProps {
    title: string;
    error?: string;
    isPassword?: boolean;
    isRequired?: boolean;
}

const TextInputWithTitle = ({
    title,
    error,
    isPassword = false,
    isRequired = false,
    ...props
}: Props) => {
    const [secureTextEntry, setSecureTextEntry] = useState(isPassword);

    return (
        <View style={styles.wrapper}>
            <Text style={styles.title}>
                {title}
                {isRequired ? <Text style={styles.required}> *</Text> : null}
            </Text>

            <View style={[styles.inputContainer, !!error && styles.errorBorder]}>
                <TextInput
                    {...props}
                    style={styles.input}
                    placeholderTextColor={Colors.placeholder}
                    secureTextEntry={secureTextEntry}
                />

                {isPassword ? (
                    <TouchableOpacity
                        onPress={() => setSecureTextEntry(prev => !prev)}
                        style={styles.eyeButton}
                    >
                        <Text style={styles.eyeText}>
                            {secureTextEntry ? 'Show' : 'Hide'}
                        </Text>
                    </TouchableOpacity>
                ) : null}
            </View>

            {!!error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>
    );
};

export default TextInputWithTitle;

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 16,
    },
    title: {
        fontSize: 14,
        color: Colors.text,
        marginBottom: 8,
        fontFamily: Fonts.medium,
    },
    required: {
        color: Colors.red,
    },
    inputContainer: {
        minHeight: 52,
        borderWidth: 1,
        borderColor: Colors.border,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 14,
        backgroundColor: Colors.white,
    },
    errorBorder: {
        borderColor: Colors.red,
    },
    input: {
        flex: 1,
        color: Colors.text,
        fontSize: 15,
        fontFamily: Fonts.regular,
    },
    eyeButton: {
        paddingLeft: 12,
    },
    eyeText: {
        color: Colors.primary,
        fontSize: 13,
        fontFamily: Fonts.medium,
    },
    errorText: {
        marginTop: 6,
        color: Colors.red,
        fontSize: 12,
        fontFamily: Fonts.regular,
    },
});