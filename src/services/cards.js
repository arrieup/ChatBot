export { fetchCardData, fetchRandomCardData }
async function fetchCardData(word) {
    try {
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch dictionary data');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching dictionary data:', error);
        return null;
    }
}
async function fetchRandomCardData() {
    try {
        const url = `https://db.ygoprodeck.com/api/v7/randomcard.php`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('Failed to fetch dictionary data');
        }

        const data = await response.json();
        return(data.card_images[0].image_url_small);
    } catch (error) {
        console.error('Error getting definitions:', error);
        throw error;
    }
}
