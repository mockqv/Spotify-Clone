import config from "../../config.json";

interface User{
    email: string;
    password: string;
};

export default async function signInWithEmail(user: User){
    try {
        const response = await fetch(`http:${config.localhost}:3000/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        });

        if (response){       
            const teste = await response.json();
            if (teste.content.name == "FirebaseError") return false;
            return true;
        }

        return true;

    } catch (err) {
        console.log(err);
        return false;
    }
};