import config from "../../config.json";
import AsyncStorage from "@react-native-async-storage/async-storage";
import getUserById from "./getUserbyId";

interface User{
    id: string;
    name: string;
    photo: string;
}

export default async function updateUser(user: User) {
    try {
        const response = await fetch(`http:${config.localhost}:3000/updateuser`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            const updatedUser = await getUserById(user.id);
            if (updatedUser) {
                await AsyncStorage.setItem('@user_data', JSON.stringify(updatedUser));
                return true;
            }
        }

        return false;
    } catch (err) {
        console.error("Error updating user:", err);
        return false;
    }
}
