import config from "../../config.json";
import Song from "../../src/Interfaces/Song";



export default async function getSongs(): Promise<Song[] | null> {
    try {
        const response = await fetch(`http:${config.localhost}:3000/songs`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response) {
            const data = await response.json();

            if (data.content && data.content.name === "FirebaseError") return null;
            
            return data as Song[];
        }

        return null;
    } catch (err) {
        console.log(err);
        return null;
    }
};
