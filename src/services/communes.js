export { getPopulation, getNear }

const geoApiURL = "https://geo.api.gouv.fr/";


async function getPopulation(code) {
    try {
        const url = `${geoApiURL}communes?codePostal=${code}&fields=nom,population&format=json&geometry=centre`;
        const response = await fetch(url);
        console.log(url)
        if (!response.ok) {
            throw new Error('Failed to fetch dictionary data');
        }
        const data = await response.json();
        console.log(data)
        return (`The population for ${data[0].nom} is ${data[0].population}`);
    } catch (error) {
        console.error('Error getting definitions:', error);
        throw error;
    }
}

async function getNear(code, dist) {
    try {
        const url = `${geoApiURL}communes?codePostal=${code}&fields=nom,codeDepartement,centre`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Failed to fetch dictionary data');
        }
        const data = await response.json();
        const coordinates = data[0].centre.coordinates;
        const departement = data[0].codeDepartement;
        const coordurl = `${geoApiURL}departements/${departement}/communes?fields=nom,centre`;
        const coordresponse = await fetch(coordurl);
        if (!response.ok) {
            throw new Error('Failed to fetch dictionary data');
        }
        const coorddata = await coordresponse.json();
        let result = `Liste des comunes à moins de ${dist} kilomètres:\n`;
        coorddata.forEach(commune => {
            //piqué sur un site de cartographie
            const R = 6371e3;
            const φ1 = coordinates[0] * Math.PI / 180; // φ, λ in radians
            const φ2 = commune.centre.coordinates[0] * Math.PI / 180;
            const Δφ = (commune.centre.coordinates[0] - coordinates[0]) * Math.PI / 180;
            const Δλ = (commune.centre.coordinates[1] - coordinates[1]) * Math.PI / 180;

            const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
                Math.cos(φ1) * Math.cos(φ2) *
                Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            const d = R * c / 1000; // in metres
            if (d < dist){
                result+=`${commune.nom} est à ${d} kilomètres\n`;
            }
        });
        return result;
    } catch (error) {
        console.error('Error getting definitions:', error);
        throw error;
    }
}