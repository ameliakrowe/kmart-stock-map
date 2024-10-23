import axios from 'axios';
import { getNearestLocations } from './getNearestLocations';
import { ClickAndCollectVariables } from './types/ClickAndCollectVariables';
import { ClickAndCollectSearchLocation } from './types/ClickAndCollectSearchLocation';
import { ResponseLocation } from './types/ResponseLocation';
import { FullLocation } from './types/FullLocation';
import { NearestLocationsResponse } from './types/NearestLocationsResponse';
import { NearestLocation } from './types/NearestLocation';
import { getDistance } from "geolib";
import * as locationData from '../locations.json';
import { CLICK_AND_COLLECT_API_QUERY, IN_STORE_API_QUERY, KMART_API_URL } from './constants';
import { InStoreVariables } from './types/InStoreVariables';

const allLocations = locationData.locations as NearestLocation[];

function getFullLocationsFromResponseLocations(locations: ResponseLocation[]): FullLocation[] {
    //console.log(JSON.stringify(locations));
    //const nearestLocationsResponse: NearestLocationsResponse = await getNearestLocations(searchLat, searchLon, "100");
    //console.log(JSON.stringify(nearestLocationsResponse));
    //console.log(JSON.stringify(locations));
    //console.log(JSON.stringify(nearestLocationsResponse));

    const result: FullLocation[] = [];

    locations.forEach((location) => {
        //console.log(JSON.stringify(location));
        const matchingLocations = allLocations.filter((nearestLocation: NearestLocation) => nearestLocation.locationId == location.location.locationId);
        //console.log(JSON.stringify(matchingLocations));
        const matchingLocation = matchingLocations.length > 0 ? matchingLocations[0] : null;
        const matchingFulfilmentLocations = allLocations.filter((nearestLocation: NearestLocation) => nearestLocation.locationId == location.fulfilment.locationId);
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
}

function getLocationsWithinRadius(lat: string, lon: string, searchRadius: number): NearestLocation[] {
    return allLocations.filter((location: NearestLocation) => getDistance({latitude: location.latitude, longitude: location.longitude},
        {latitude: lat, longitude: lon})/1000 < searchRadius
    );
}

function generateClickAndCollectVariables(postcode: string, productSKU: string): ClickAndCollectVariables {
    return {
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
    };
}

export function generateInStoreVariables(postcode: string, productSKU: string): InStoreVariables {
    return {
        input: {
          country: "AU",
          postcode,
          keycodes: [productSKU]
        }
    };
}

export async function getProductAvailability(productSKU: string, postcode: string, lat: string, lon: string, searchRadius: number) {
    const locationsWithinRadius = getLocationsWithinRadius(lat, lon, searchRadius);
    //console.log(locationsWithinRadius);
 
    let locationsToSearchClickAndCollect: ClickAndCollectSearchLocation[] = locationsWithinRadius.map((location) => ({
        locationId: location.locationId,
        postcode: location.postcode
    }));

    const clickAndCollectSearchResults: ResponseLocation[] = [];

    function addNewResultsToClickAndCollectSearchResults(newResults: ResponseLocation[], locationsToInclude: NearestLocation[]): void {
        newResults.forEach((newResult) => {
            const existingMatchingLocations = clickAndCollectSearchResults.filter((existingResult) => newResult.location.locationId === existingResult.location.locationId);
            if (existingMatchingLocations.length < 1 && locationsToInclude.map((location) => location.locationId).includes(newResult.location.locationId)) {
                clickAndCollectSearchResults.push(newResult);
            }
        });
    }

    //const locationsToSearchInStore = locationsWithinRadius;

    while (locationsToSearchClickAndCollect.length > 0) {
        try {
            const clickAndCollectResponse = await axios.post(KMART_API_URL, {
                query: CLICK_AND_COLLECT_API_QUERY,
                operationName: "getProductAvailability",
                variables: generateClickAndCollectVariables(locationsToSearchClickAndCollect[0].postcode, productSKU)
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            const clickAndCollectLocations = clickAndCollectResponse.data.data.getProductAvailability.availability.CLICK_AND_COLLECT[0].locations as ResponseLocation[];
            const locationIdsFound = clickAndCollectLocations.map((location) => location.location.locationId)
            locationsToSearchClickAndCollect = locationsToSearchClickAndCollect.filter((location) => !locationIdsFound.includes(location.locationId));
            addNewResultsToClickAndCollectSearchResults(clickAndCollectLocations, locationsWithinRadius);
        }
        catch (error) {
            console.error("Error getting product availability", error);
            throw new Error("Failed to fetch data");
        }
    }
    console.log(clickAndCollectSearchResults);
    const fullLocations = await getFullLocationsFromResponseLocations(clickAndCollectSearchResults);

    try {
        const inStoreResponse = await axios.post(KMART_API_URL, {
            query: IN_STORE_API_QUERY,
            operationName: "getFindInStore",
            variables: generateInStoreVariables(postcode, productSKU)
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const transformedResponse = {
            clickAndCollect: fullLocations,
            inStore: inStoreResponse.data.data.findInStoreQuery[0].inventory
        };
        return transformedResponse;
    } catch (error) {
        console.error("Error fetching data from GraphQL API:", error);
        throw new Error("Failed to fetch data");
    }
}