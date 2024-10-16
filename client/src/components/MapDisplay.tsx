import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { Coords } from "../types/Coords";
import { StockLocation } from "../types/StockLocation";
import { MarkerWithInfoWindow } from "./MarkerWithInfoWindow";
import React, { useEffect, useState } from 'react';

const apiKey = "AIzaSyDmbbvMi4lj4awzK3ptp4ZOquivm9X6PdQ";

type MapDisplayProps = {
    centerLocation: Coords,
    stockLocations: StockLocation[]
}

export const MapDisplay = (props: MapDisplayProps) => {
    const { lat, lon } = props.centerLocation;

    const [ mapCenter, setMapCenter ] = useState<google.maps.LatLngLiteral>({lat, lng: lon});

    useEffect(() => {
        setMapCenter({lat, lng: lon});
    }, [props.centerLocation]);

    return (
        <div className="map-area">
            <APIProvider
                apiKey={apiKey}
                onLoad={() => console.log("Maps API loaded")}
            >
                <Map
                    className="Map-display"
                    center={mapCenter}
                    defaultZoom={13}
                    mapId={"dbe7c4267f83fb4e"}
                    onCenterChanged={(map) => setMapCenter(map.detail.center)}
                >
                    {props.stockLocations.map((location: StockLocation) => (
                        <MarkerWithInfoWindow key={location.locationId} location={location} position={{lat: Number(location.lat), lng: Number(location.lon)}}/>
                    ))}
                </Map>
            </APIProvider>
        </div>
        
    )
};