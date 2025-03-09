import config from "../../config.json";
import { saveLoginData } from "../../src/Functions/SaveLoginData";
import User from "../../src/Interfaces/User";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getUserById from "./getUserbyId";

export default async function signInWithEmail(user: User) {
    try {

        const response = await fetch(`http://${config.localhost}:3000/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            const userData = await response.json();
            const userId = userData.content.user.uid;
            const fetchedUserData = await getUserById(userId);

            await saveLoginData(userData);

            if (fetchedUserData) {
                await AsyncStorage.setItem('@user_data', JSON.stringify({
                    ...fetchedUserData,
                    id: userId
                }))
            }

            return true;
        }

        return false;
    } catch (error) {
        console.error('Login error:', error);
        return false;
    }
}