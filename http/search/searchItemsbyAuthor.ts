import config from "../../config.json";

export default async function SearchItemsByAuthor(name: string) {
    try {
        const response = await fetch(`http://${config.localhost}:3000/searchItemsByAuthor/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch songs');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch songs');
    }
}