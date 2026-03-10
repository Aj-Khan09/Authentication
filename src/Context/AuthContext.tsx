import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
    AuthContextType,
    LoginRequestDto,
    RegisterRequestDto,
    User,
} from '../types/auth';
import AuthService from '../Service/auth/AuthService';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        initAuth();
    }, []);

    const initAuth = async () => {
        try {
            const storedUser = await AuthService.getStoredUser();
            setUser(storedUser);
        } catch (error) {
            console.log('initAuth error:', error);
        } finally {
            setLoading(false);
        }
    };

    const login = async (body: LoginRequestDto) => {
        setLoading(true);
        try {
            const loggedInUser = await AuthService.login(body);
            await AuthService.syncUserProfile(loggedInUser);
            setUser(loggedInUser);
        } finally {
            setLoading(false);
        }
    };

    const signup = async (body: RegisterRequestDto) => {
        setLoading(true);
        try {
            const registeredUser = await AuthService.signup(body);
            setUser(registeredUser);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        try {
            await AuthService.logout();
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const value = useMemo(
        () => ({
            user,
            loading,
            login,
            signup,
            logout,
        }),
        [user, loading],
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error('useAuth must be used within AuthProvider');
    }

    return context;
};