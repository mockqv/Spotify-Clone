import config from "../../config.json";

interface SearchResult {
    artists: any[];
    playlists: any[];
    songs: any[];
}

/**
 * Function to search for items by name from the API
 * @param { string } name - The name to search for
 * @returns { Promise<SearchResult | null> } - Returns the search results or null if an error occurs
 */
export default async function searchItems(name: string): Promise<SearchResult | null> {
    try {
        // Sending GET request to the search-items endpoint
        const response = await fetch(`http://${config.localhost}:3000/searchItems?name=${name}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        // Check if the response is OK (status code 200-299)
        if (response.ok) {
            const data = await response.json();  // Parse the JSON response
            return data.data;  // Return the search results
        } else {
            // If the response was not OK, log the error
            console.error("Error fetching data:", response.status);
            return null;
        }
    } catch (err) {
        // Catch any errors that occur during the fetch operation
        console.error("An error occurred:", err);
        return null;
    }
}