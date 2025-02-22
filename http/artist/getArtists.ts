import config from "../../config.json";
import Artist from "../../src/Interfaces/Artist";



export default async function getArtists(): Promise<Artist[] | null> {
    try {
        const response = await fetch(`http:${config.localhost}:3000/artists`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response) {
            const data = await response.json();

            if (data.content && data.content.name === "FirebaseError") return null;
            
            return data as Artist[];
        }

        return null;
    } catch (err) {
        console.log(err);
        return null;
    }
};
