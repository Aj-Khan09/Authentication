import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '../../Context/AuthContext';
import { Colors } from '../../Utils/Colors';
import { Fonts } from '../../Utils/Fonts';
import ThemeButton from '../../Components/ThemeButton';

const Home = () => {
    const { user, logout, loading } = useAuth();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Home</Text>

            <View style={styles.card}>
                <Text style={styles.label}>Name</Text>
                <Text style={styles.value}>{user?.name}</Text>

                <Text style={[styles.label, { marginTop: 16 }]}>Email</Text>
                <Text style={styles.value}>{user?.email}</Text>
            </View>

            <ThemeButton
                title="Logout"
                onPress={logout}
                loading={loading}
            />
        </View>
    );
};

export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        backgroundColor: Colors.background,
    },
    title: {
        fontSize: 28,
        fontFamily: Fonts.bold,
        color: Colors.text,
        marginBottom: 24,
    },
    card: {
        padding: 20,
        borderRadius: 16,
        backgroundColor: Colors.white,
        borderWidth: 1,
        borderColor: Colors.border,
    },
    label: {
        fontSize: 13,
        color: Colors.subText,
        fontFamily: Fonts.medium,
    },
    value: {
        marginTop: 4,
        fontSize: 18,
        color: Colors.text,
        fontFamily: Fonts.regular,
    },
    button: {
        marginTop: 24,
        height: 52,
        borderRadius: 12,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.white,
        fontSize: 16,
        fontFamily: Fonts.medium,
    },
});