import AsyncStorage from "@react-native-async-storage/async-storage";

export async function clearLoginData(): Promise<void> {
    try {
        await AsyncStorage.removeItem('@user_login');
        console.log('Login data cleared successfully.');
    } catch (error) {
    }
}