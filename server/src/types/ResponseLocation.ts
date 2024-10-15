export type ResponseLocation = {
    fulfilment: {
        isBuddyLocation: boolean,
        locationId: string,
        stock: {
            available: number
        }
    },
    location: {
        locationId: string
    }
}