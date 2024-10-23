import axios from 'axios';

const kmartAPIUrl = "https://api.kmart.com.au/gateway/graphql";

export async function getNearestLocations(lat: string, lon: string, distance: string) {
    const apiQuery = `
        query getNearestLocations($lat: String!, $lon: String!, $distance: String!) {
            nearestLocations(input: {lat: $lat, lon: $lon, distance: $distance}) {
                locationId
                publicName
                latitude
                longitude
                postcode
            }
        }
    `;

    const variables = {
        lat,
        lon,
        distance: distance + "km"
    };

    try {
        const response = await axios.post(kmartAPIUrl, {
            query: apiQuery,
            operationName: "getNearestLocations",
            variables
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response.data.data.nearestLocations ? response.data.data : {
            "nearestLocations": []
        };
    } catch (error) {
        console.error("Error fetching data from GraphQL API:", error);
        throw new Error("Failed to fetch data");
    }
}