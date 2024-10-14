import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { Coords } from "../types/Coords";
import { StockLocation } from "../types/StockLocation";

const apiKey = "AIzaSyDmbbvMi4lj4awzK3ptp4ZOquivm9X6PdQ";

type MapDisplayProps = {
    centerLocation: Coords,
    stockLocations: StockLocation[]
}

export const MapDisplay = (props: MapDisplayProps) => {
    const { lat, lon } = props.centerLocation;
    return (
        <div className="map-area">
            <APIProvider
                apiKey={apiKey}
                onLoad={() => console.log("Maps API loaded")}
            >
                <Map
                    className="Map-display"
                    center={lat === 0 && lon === 0 ? {lat: -33.86, lng: 151.21} : {lat, lng: lon}}
                    defaultZoom={13}
                />
            </APIProvider>
        </div>
        
    )
};