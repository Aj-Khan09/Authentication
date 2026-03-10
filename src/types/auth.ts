export interface User {
    name: string;
    email: string;
}

export interface LoginRequestDto {
    email: string;
    password: string;
}

export interface RegisterRequestDto {
    name: string;
    email: string;
    password: string;
}

export interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (body: LoginRequestDto) => Promise<void>;
    signup: (body: RegisterRequestDto) => Promise<void>;
    logout: () => Promise<void>;
}