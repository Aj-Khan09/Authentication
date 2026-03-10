import SharedPreference from '../../Utils/SharedPreference';
import { STORAGE } from '../../Configs/Constants';
import {
    LoginRequestDto,
    RegisterRequestDto,
    User,
} from '../../types/auth';

export default class AuthService {
    static async syncUserProfile(user?: User | null) {
        if (user) {
            await SharedPreference.setItem(STORAGE.USER_DETAILS, JSON.stringify(user));
        } else {
            await SharedPreference.removeItem(STORAGE.USER_DETAILS);
        }
    }

    static async getStoredUser(): Promise<User | null> {
        const userString = await SharedPreference.getItem(STORAGE.USER_DETAILS);
        return userString ? JSON.parse(userString) : null;
    }

    static async signup(body: RegisterRequestDto): Promise<User> {
        const user: User = {
            name: body.name,
            email: body.email,
        };

        await this.syncUserProfile(user);
        return user;
    }

    static async login(body: LoginRequestDto): Promise<User> {
        const storedUser = await this.getStoredUser();

        if (!storedUser) {
            throw new Error('No user found. Please signup first.');
        }

        if (storedUser.email.toLowerCase() !== body.email.toLowerCase()) {
            throw new Error('Incorrect credentials. Please try again.');
        }

        return storedUser;
    }

    static async logout() {
        await this.syncUserProfile(null);
    }
}