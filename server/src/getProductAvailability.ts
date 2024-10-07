import axios from 'axios';

const kmartAPIUrl = "https://api.kmart.com.au/gateway/graphql";

function convertClickAndCollectLocationtoResponse(location: any) {
    return {
        locationId: location.location.locationId,
        isBuddyLocation: location.fulfilment.isBuddyLocation,
        fulfilmentLocationId: location.fulfilment.locationId,
        quantityAvailable: location.fulfilment.stock.available
    }
}

export async function getProductAvailability(productSKU: string, postcode: string) {
    const apiQuery = `
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

    const variables = {
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

    try {
        const response = await axios.post(kmartAPIUrl, {
            query: apiQuery,
            operationName: "getProductAvailability",
            variables
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const responseClickAndCollect = response.data.data.getProductAvailability.availability.CLICK_AND_COLLECT;

        const transformedResponse = {
            clickAndCollect: [responseClickAndCollect[0].locations.map((location: any) => convertClickAndCollectLocationtoResponse(location))],
            inStore: []
        };
        return transformedResponse;
    } catch (error) {
        console.error("Error fetching data from GraphQL API:", error);
        throw new Error("Failed to fetch data");
    }
}