import AsyncStorage from '@react-native-async-storage/async-storage';

export default class SharedPreference {
    static async setItem(key: string, value: string) {
        await AsyncStorage.setItem(key, value);
    }

    static async getItem(key: string) {
        return AsyncStorage.getItem(key);
    }

    static async removeItem(key: string) {
        await AsyncStorage.removeItem(key);
    }
}