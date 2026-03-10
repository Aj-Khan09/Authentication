import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SCREEN_NAMES } from '../Configs/Constants';
import Register from '../Containers/Auth/Register';
import { useAuth } from '../Context/AuthContext';
import Home from '../Containers/Home/Home';
import Login from '../Containers/Auth/Login';

export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
    const { user } = useAuth();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {user ? (
                    <Stack.Screen name={SCREEN_NAMES.HOME} component={Home} />
                ) : (
                    <>
                        <Stack.Screen name={SCREEN_NAMES.LOGIN} component={Login} />
                        <Stack.Screen name={SCREEN_NAMES.REGISTER} component={Register} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;