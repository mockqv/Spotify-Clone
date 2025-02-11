import config from "../../config.json";
import { saveLoginData } from "../../src/functions/SaveLoginData";

interface User{
    email: string;
    password: string;
};

export default async function signInWithEmail(user: User) {
    try {
        const response = await fetch(`http:${config.localhost}:3000/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });

        if (response.ok) {
            const userData = await response.json();
            await saveLoginData(userData);
            return true;
        }

        return false;
    } catch (error) {
        console.error('Login error:', error);
        return false;
    }

}
