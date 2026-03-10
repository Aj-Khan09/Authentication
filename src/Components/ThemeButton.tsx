import React from 'react';
import {
    TouchableOpacity,
    Text,
    StyleSheet,
    ActivityIndicator,
    ViewStyle,
    TextStyle,
} from 'react-native';
import { Colors } from '../Utils/Colors';
import { Fonts } from '../Utils/Fonts';

interface ThemeButtonProps {
    title: string;
    onPress?: () => void;
    loading?: boolean;
    disabled?: boolean;
    style?: ViewStyle;
    textStyle?: TextStyle;
}

const ThemeButton = ({
    title,
    onPress,
    loading = false,
    disabled = false,
    style,
    textStyle,
}: ThemeButtonProps) => {
    const isDisabled = disabled || loading;

    return (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={onPress}
            disabled={isDisabled}
            style={[
                styles.button,
                isDisabled && styles.disabledButton,
                style,
            ]}
        >
            {loading ? (
                <ActivityIndicator color={Colors.white} />
            ) : (
                <Text style={[styles.buttonText, textStyle]}>{title}</Text>
            )}
        </TouchableOpacity>
    );
};

export default ThemeButton;

const styles = StyleSheet.create({
    button: {
        height: 52,
        borderRadius: 12,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },

    disabledButton: {
        opacity: 0.6,
    },

    buttonText: {
        fontSize: 16,
        color: Colors.white,
        fontFamily: Fonts.medium,
    },
});