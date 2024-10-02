// utils/fetchFromStrapi.ts
import axios from 'axios';
import fs from 'fs';
import path from 'path';
import qs from 'qs';

const strapiToken = '';
const strapiBaseUrl = 'https://backoffice.roulerpouraider.fr';

// Check if the photos arent already downloaded
async function downloadImage(url, imagePath) {
    const response = await axios({
        url,
        responseType: 'stream',
    });
    return new Promise((resolve, reject) => {
        response.data.pipe(fs.createWriteStream(imagePath))
            .on('finish', () => resolve())
            .on('error', e => reject(e));
    });
}

// Main function to fetch data from Strapi and handle images
async function fetchFromStrapi(endpoint) {
    const endpointUrl = `${strapiBaseUrl}/${endpoint}`;
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${strapiToken}`,
    };

    const response = await axios.get(endpointUrl, { headers });
    const data = response.data;

    // console.log("Fetched data from backoffice:", data.data);

    // Iterate over all data objects and check for image URLs
    const promises = data.data.map(async item => {
        // I have to detect which key hold as value an object, in it there is a key data, in it there is a key attributes, in it there is a key url
        let keyHoldingObject;

        for (let key in item.attributes) {
        let value = item.attributes[key];
        
        if (typeof value === 'object' && value !== null && value.data && value.data.attributes && 'url' in value.data.attributes) {
            keyHoldingObject = key;
            break;
        }
        }


        // if (item.attributes.heroImage && item.attributes.heroImage.data) {
        //     const imageAttributes = item.attributes.heroImage.data.attributes;
        //     const imageUrl = strapiBaseUrl + imageAttributes.url;
        //     const imageName = path.basename(imageAttributes.url);
        //     const imagePath = path.resolve('public/backoffice', imageName); // Ensure this path matches your static assets directory structure

        //     await downloadImage(imageUrl, imagePath);
        // }

        if (item.attributes[keyHoldingObject] && item.attributes[keyHoldingObject].data) {
            const imageAttributes = item.attributes[keyHoldingObject].data.attributes;
            const imageUrl = strapiBaseUrl + imageAttributes.url;
            const imageName = path.basename(imageAttributes.url);
            const imagePath = path.resolve('public/backoffice', imageName); // Ensure this path matches your static assets directory structure

            await downloadImage(imageUrl, imagePath);

            // Update the item's image URL to point to the local version
            item.attributes[keyHoldingObject].data.attributes.url = `/backoffice/${imageName}`;
        }
        return item;
    });

    return Promise.all(promises);
};

// TODO : Faire un ajustement pour DL les fichiers audio et video si jamais
function main() {
    const staticEndpointsToFetch = [
    'api/partenaires?populate=*', 
    'api/who-are-wes?populate=*',
    'api/contacts?populate=*',
    'api/partenaires?populate=*',
    'api/articles?populate=*',
    'api/podcasts?populate=thumbnail&populate=podcast',
    'api/reportage-tvs?populate=*',
    'api/galleries?populate=*',
    ];

    const dynamicEndpointsToFetch = [
        {slug: 'api/heroes', query: '&populate=*'},
    ];

    staticEndpointsToFetch.forEach(async endpoint => {
        const data = await fetchFromStrapi(endpoint);
    });

    dynamicEndpointsToFetch.forEach(async endpoint => {
        const endpointUrl = `${strapiBaseUrl}/${endpoint.slug}`;
        const headers = {
            "Content-Type": "application/json",
            Authorization: `Bearer ${strapiToken}`,
        };

        let allEntries;
        try {
            allEntries = await axios.get(endpointUrl, { headers });
        } catch (error) {
            console.error(`Erreur lors de la récupération des données de ${endpointUrl}:`, error);
        }

        allEntries.data.data.forEach(async entry => {
            const slug = qs.stringify({
                filters: {
                slug: {
                    $eq: entry.attributes.slug,
                },
                },
            }, {
                encodeValuesOnly: true,
            });

            const url = `${endpoint.slug}?${slug}${endpoint.query}`;
            await fetchFromStrapi(url);
        });
    });
}

main();
