import AsyncStorage from "@react-native-async-storage/async-storage";

export async function getLoginData(): Promise<object | null> {
    try {
        const jsonData = await AsyncStorage.getItem('@user_login');
        return jsonData != null ? JSON.parse(jsonData) : null;
    } catch (error) {
        return null;
    }
}