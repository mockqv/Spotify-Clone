import config from "../../config.json";
import Playlist from "../../src/interfaces/Playlist";



export default async function getPlaylists(): Promise<Playlist[] | null> {
    try {
        const response = await fetch(`http://${config.localhost}:3000/playlists`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (response) {
            const data = await response.json();

            if (data.content && data.content.name === "FirebaseError") return null;

            return data as Playlist[];
        }

        return null;
    } catch (err) {
        console.log(err);
        return null;
    }
};