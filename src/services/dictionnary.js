export {fetchDictionaryData, getDefinitions, getSynonyms, getSound};

async function getDefinitions(word){
    try {
        const data = await fetchDictionaryData(word);
        if (Array.isArray(data) && data.length > 0) {
            let result = '';
            let index = 1; 
            data[0].meanings.forEach(meaning => {
                result += `${index++}. ${meaning.partOfSpeech}\n`;
                meaning.definitions.forEach(def => {
                    result += `${def.definition}\n `;
                });
                result += '\n';
            });
            return result; // Trim whitespace from result
        } else {
            throw new Error('No data found or invalid data structure');
        }
    } catch (error) {
        console.error('Error getting definitions:', error);
        throw error; // Propagate the error to the caller
    }
}

async function getSynonyms(word){
    try {
        const data = await fetchDictionaryData(word);
        
        // Check if data is an array and has at least one item
        if (Array.isArray(data) && data.length > 0) {
            let result = '';
            let index = 1; 
            // Iterate through meanings
            data[0].meanings.forEach(meaning => {
                // Iterate through definitions
                result += `${index++}. ${meaning.partOfSpeech}\n`;
                meaning.definitions.forEach(def => {
                    result += `${def.synonyms}\n `;
                });
                result += '\n';
            });
            const msg = document.createElement('p');
            msg.innerText = result.trim();
            return msg; // Trim whitespace from result
        } else {
            throw new Error('No data found or invalid data structure');
        }
    } catch (error) {
        console.error('Error getting synonyms:', error);
        throw error; // Propagate the error to the caller
    }
}

async function getSound(word){
    try {
        const data = await fetchDictionaryData(word);
        
        if (Array.isArray(data) && data.length > 0) {
            let result = []
            data[0].phonetics.forEach(phonetic => {
                if (phonetic.audio != ""){
                    result.push(phonetic.audio)
                }
            });
            return result
        } else {
            throw new Error('No data found or invalid data structure');
        }
    } catch (error) {
        console.error('Error getting definitions:', error);
        throw error;
    }
}

async function fetchDictionaryData(word) {
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
