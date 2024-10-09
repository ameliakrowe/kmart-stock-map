import { APIProvider, Map } from "@vis.gl/react-google-maps";

const apiKey = "AIzaSyDmbbvMi4lj4awzK3ptp4ZOquivm9X6PdQ";

export const MapDisplay = () => {
    return (
        <div className="map-area">
            <APIProvider
                apiKey={apiKey}
                onLoad={() => console.log("Maps API loaded")}
            >
                <Map
                    className="Map-display"
                    defaultZoom={13}
                    defaultCenter={{lat: -33.86, lng: 151.21}}
                />
            </APIProvider>
        </div>
        
    )
};