import config from "../../config.json";

export default async function getUserById(id: string) {
    try {
        const response = await fetch(`http://${config.localhost}:3000/getUserId/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })

        if (response.ok) {
            const userData = await response.json();

            return userData;
        } else {
            console.error("Error: User not found");
            return null; 
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        return null;
    }
}
