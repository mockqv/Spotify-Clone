import config from "../../config.json";

interface User{
    email: string;
    password: string;
};

export default async function signUpWithEmail(user: User){
    try {
        const response = await fetch(`http:${config.localhost}:3000/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        });
        
        if (response)
            return true;

    } catch (err) {
        return false;
    }
};
