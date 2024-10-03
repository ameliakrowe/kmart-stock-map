import axios from 'axios';

const kmartAPIUrl = "https://api.kmart.com.au/gateway/graphql";

export async function getPostcodeSuggestions(queryString: string) {
    const apiQuery = `
        query getPostcodeSuggestions($input: PostcodeQueryInput!) {
            postcodeQuery(input: $input) {
                postcode
                suburb
                state
                location {
                    lat
                    lon
                }
            }
        }
    `;

    const variables = {
        input: {
            country: "AU",
            query: queryString
        }
    }

    try {
        const response = await axios.post(kmartAPIUrl, {
            query: apiQuery,
            operationName: "getPostcodeSuggestions",
            variables
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        //console.log(JSON.stringify(response.data));
        return response.data;
    } catch (error) {
        console.error("Error fetching data from GraphQL API:", error);
        throw new Error("Failed to fetch data");
    }
}