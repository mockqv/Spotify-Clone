import AsyncStorage from '@react-native-async-storage/async-storage';

export async function saveLoginData(data: object): Promise<void> {
    try {
        const jsonData = JSON.stringify(data);
        await AsyncStorage.setItem('@user_login', jsonData);
    } catch (error) {
        console.error('Error saving login data:', error);
    }
}