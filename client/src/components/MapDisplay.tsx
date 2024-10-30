import { Map, useMap } from "@vis.gl/react-google-maps";
import { Coords } from "../types/Coords";
import { computeDestinationPoint } from "geolib";
import { StockLocation } from "../types/StockLocation";
import { MarkerWithInfoWindow } from "./MarkerWithInfoWindow";
import React, { useEffect, useState } from "react";

type MapDisplayProps = {
    centerLocation: Coords;
    searchRadius: number;
    stockLocations: StockLocation[];
};

function computeMapBounds(
    centerLocation: Coords,
    searchRadius: number,
): google.maps.LatLngBoundsLiteral {
    const { lat, lon } = centerLocation;
    const north = computeDestinationPoint(
        { latitude: lat, longitude: lon },
        searchRadius * 1000,
        0,
    ).latitude;
    const south = computeDestinationPoint(
        { latitude: lat, longitude: lon },
        searchRadius * 1000,
        180,
    ).latitude;
    const east = computeDestinationPoint(
        { latitude: lat, longitude: lon },
        searchRadius * 1000,
        90,
    ).longitude;
    const west = computeDestinationPoint(
        { latitude: lat, longitude: lon },
        searchRadius * 1000,
        270,
    ).longitude;

    return {
        north,
        south,
        east,
        west,
    };
}

export const MapDisplay = (props: MapDisplayProps) => {
    const { centerLocation, searchRadius, stockLocations } = props;
    const { lat, lon } = centerLocation;

    const [mapCenter, setMapCenter] = useState<google.maps.LatLngLiteral>({
        lat,
        lng: lon,
    });

    const map = useMap();

    function fitBoundsToMap(bounds: google.maps.LatLngBoundsLiteral) {
        console.log(bounds);
        if (!map) return;

        map.fitBounds(bounds);
    }

    useEffect(() => {
        setMapCenter({ lat: centerLocation.lat, lng: centerLocation.lon });
    }, [centerLocation]);

    useEffect(() => {
        fitBoundsToMap(computeMapBounds(centerLocation, searchRadius));
    }, [centerLocation, searchRadius]);

    return (
        <div className="map-area">
            <Map
                className="Map-display"
                center={mapCenter}
                defaultZoom={13}
                mapId={"dbe7c4267f83fb4e"}
                onCenterChanged={(map) => setMapCenter(map.detail.center)}
            >
                {stockLocations.map((location: StockLocation) => (
                    <MarkerWithInfoWindow
                        key={location.locationId}
                        location={location}
                        position={{
                            lat: Number(location.lat),
                            lng: Number(location.lon),
                        }}
                    />
                ))}
            </Map>
        </div>
    );
};
