type Location = {
    lat: number,
    lon: number
}

export type Result = {
    postcode: string,
    suburb: string,
    state: string
    location: Location
}