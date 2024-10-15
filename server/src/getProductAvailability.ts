import axios from 'axios';
import { getNearestLocations } from './getNearestLocations';
import { ResponseLocation } from './types/ResponseLocation';
import { FullLocation } from './types/FullLocation';
import { NearestLocationsResponse } from './types/NearestLocationsResponse';
import { NearestLocation } from './types/NearestLocation';

const kmartAPIUrl = "https://api.kmart.com.au/gateway/graphql";

async function getFullLocationsFromResponseLocations(locations: ResponseLocation[], searchLat: string, searchLon: string): Promise<FullLocation[]> {
    try {
        //console.log(JSON.stringify(locations));
        const nearestLocationsResponse: NearestLocationsResponse = await getNearestLocations(searchLat, searchLon, "100");
        console.log(JSON.stringify(nearestLocationsResponse));
        //console.log(JSON.stringify(locations));
        //console.log(JSON.stringify(nearestLocationsResponse));

        const result: FullLocation[] = [];

        locations.forEach((location) => {
            //console.log(JSON.stringify(location));
            const matchingLocations = nearestLocationsResponse.nearestLocations.filter((nearestLocation: NearestLocation) => nearestLocation.locationId == location.location.locationId);
            //console.log(JSON.stringify(matchingLocations));
            const matchingLocation = matchingLocations.length > 0 ? matchingLocations[0] : null;
            const matchingFulfilmentLocations = nearestLocationsResponse.nearestLocations.filter((nearestLocation: NearestLocation) => nearestLocation.locationId == location.fulfilment.locationId);
            //console.log(JSON.stringify(matchingFulfilmentLocations));
            const matchingFulfilmentLocation = matchingFulfilmentLocations.length > 0 ? matchingFulfilmentLocations[0] : null;
            const locationResult = matchingLocation && matchingFulfilmentLocation ? {
                locationId: location.location.locationId,
                publicName: matchingLocation.publicName,
                lat: matchingLocation.latitude,
                lon: matchingLocation.longitude,
                isBuddyLocation: location.fulfilment.isBuddyLocation,
                fulfilmentLocationId: location.fulfilment.locationId,
                fulfilmentLocationName: matchingFulfilmentLocation.publicName,
                quantityAvailable: location.fulfilment.stock.available
            }: undefined;
            //console.log(locationResult);

            // eslint-disable-next-line @typescript-eslint/no-unused-expressions
            locationResult && result.push(locationResult);
        });
        //console.log(result);
        return result;
    } catch (error) {
        console.error("Error fetching data from nearest locations API", error);
        throw new Error("Failed to fetch data");
    }
}

export async function getProductAvailability(productSKU: string, postcode: string, lat: string, lon: string) {
    const clickAndCollectApiQuery = `
        query getProductAvailability($input: ProductAvailabilityQueryInput!) {
            getProductAvailability(input: $input) {
                availability {
                    CLICK_AND_COLLECT {
                        locations {
                            fulfilment {
                                isBuddyLocation
                                locationId
                                stock {
                                    available
                                }
                            }
                            location {
                                locationId
                            }
                        }
                    }
                }
            }
        }
    `;

    const clickAndCollectVariables = {
        input: {
          country: "AU",
          postcode,
          products: [
            {
              keycode: productSKU,
              quantity: 1,
              isNationalInventory: false,
              isClickAndCollectOnly: false
            }
          ],
          fulfilmentMethods: [
            "CLICK_AND_COLLECT"
          ]
        }
    }

    const inStoreApiQuery = `
        query getFindInStore($input: FindInStoreQueryInput!) {
            findInStoreQuery(input: $input) {
                keycode
                inventory {
                    locationName
                    locationId
                    stockLevel
                }
            }
        }
    `;

    const inStoreVariables = {
        input: {
          country: "AU",
          postcode,
          keycodes: [productSKU]
        }
    };

    //console.log(clickAndCollectApiQuery);
    //console.log(clickAndCollectVariables);

    try {
        const clickAndCollectResponse = await axios.post(kmartAPIUrl, {
            query: clickAndCollectApiQuery,
            operationName: "getProductAvailability",
            variables: clickAndCollectVariables
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const clickAndCollectInfo = clickAndCollectResponse.data.data.getProductAvailability.availability.CLICK_AND_COLLECT;

        const inStoreResponse = await axios.post(kmartAPIUrl, {
            query: inStoreApiQuery,
            operationName: "getFindInStore",
            variables: inStoreVariables
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        try {
            const fullLocations = await getFullLocationsFromResponseLocations(clickAndCollectInfo[0].locations, lat, lon);

            const transformedResponse = {
                clickAndCollect: fullLocations,
                inStore: inStoreResponse.data.data.findInStoreQuery[0].inventory
            };
            return transformedResponse;
        }
        catch (error) {
            console.error("Error getting full location details:", error);
            throw new Error("Failed to fetch data");
        }
    } catch (error) {
        console.error("Error fetching data from GraphQL API:", error);
        throw new Error("Failed to fetch data");
    }
}