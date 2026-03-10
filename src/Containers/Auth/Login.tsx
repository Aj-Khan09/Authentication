import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import TextInputWithTitle from '../../Components/TextInputWithTitle';
import { loginSchema } from '../../Utils/Validations';
import { useAuth } from '../../Context/AuthContext';
import { Colors } from '../../Utils/Colors';
import { Fonts } from '../../Utils/Fonts';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigators/AppNavigator';
import { SCREEN_NAMES } from '../../Configs/Constants';
import ThemeButton from '../../Components/ThemeButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({ navigation }: Props) => {
    const { login, loading } = useAuth();
    const [apiError, setApiError] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <Text style={styles.subtitle}>Welcome back</Text>

            <Formik
                initialValues={{ email: '', password: '' }}
                validationSchema={loginSchema}
                onSubmit={async values => {
                    try {
                        setApiError('');
                        await login(values);
                    } catch (error: any) {
                        setApiError(error?.message || 'Something went wrong');
                    }
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleSubmit,
                    setFieldTouched,
                }) => (
                    <>
                        <TextInputWithTitle
                            title="Email"
                            isRequired
                            value={values.email}
                            onChangeText={handleChange('email')}
                            onBlur={() => setFieldTouched('email')}
                            error={touched.email ? errors.email : undefined}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />

                        <TextInputWithTitle
                            title="Password"
                            isRequired
                            value={values.password}
                            onChangeText={handleChange('password')}
                            onBlur={() => setFieldTouched('password')}
                            error={touched.password ? errors.password : undefined}
                            isPassword
                        />

                        {!!apiError && <Text style={styles.apiError}>{apiError}</Text>}

                        <ThemeButton
                            title="Login"
                            onPress={handleSubmit}
                            loading={loading}
                        />
                        <TouchableOpacity
                            onPress={() => navigation.navigate(SCREEN_NAMES.REGISTER)}
                        >
                            <Text style={styles.linkText}>Go to Signup</Text>
                        </TouchableOpacity>
                    </>
                )}
            </Formik>
        </View>
    );
};

export default Login;

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
    },
    subtitle: {
        marginTop: 8,
        marginBottom: 24,
        fontSize: 14,
        fontFamily: Fonts.regular,
        color: Colors.subText,
    },
    button: {
        height: 52,
        borderRadius: 12,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 8,
    },
    buttonText: {
        color: Colors.white,
        fontSize: 16,
        fontFamily: Fonts.medium,
    },
    linkText: {
        marginTop: 18,
        textAlign: 'center',
        color: Colors.primary,
        fontFamily: Fonts.medium,
    },
    apiError: {
        marginBottom: 10,
        color: Colors.red,
        fontFamily: Fonts.regular,
    },
});