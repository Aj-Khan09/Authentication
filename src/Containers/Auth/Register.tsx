import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Formik } from 'formik';
import TextInputWithTitle from '../../Components/TextInputWithTitle';
import { signupSchema } from '../../Utils/Validations';
import { useAuth } from '../../Context/AuthContext';
import { Colors } from '../../Utils/Colors';
import { Fonts } from '../../Utils/Fonts';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../Navigators/AppNavigator';
import { SCREEN_NAMES } from '../../Configs/Constants';
import ThemeButton from '../../Components/ThemeButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

const Register = ({ navigation }: Props) => {
    const { signup, loading } = useAuth();
    const [apiError, setApiError] = useState('');

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Signup</Text>
            <Text style={styles.subtitle}>Create your account</Text>

            <Formik
                initialValues={{ name: '', email: '', password: '' }}
                validationSchema={signupSchema}
                onSubmit={async values => {
                    try {
                        setApiError('');
                        await signup(values);
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
                            title="Name"
                            isRequired
                            value={values.name}
                            onChangeText={handleChange('name')}
                            onBlur={() => setFieldTouched('name')}
                            error={touched.name ? errors.name : undefined}
                        />

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
                            title="Signup"
                            onPress={handleSubmit}
                            loading={loading}
                        />

                        <TouchableOpacity
                            onPress={() => navigation.navigate(SCREEN_NAMES.LOGIN)}
                        >
                            <Text style={styles.linkText}>Go to Login</Text>
                        </TouchableOpacity>
                    </>
                )}
            </Formik>
        </View>
    );
};

export default Register;

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