import { InfoWindow, AdvancedMarker, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import React, { useCallback, useState } from 'react';
import { StockLocation } from "../types/StockLocation";

type MarkerWithInfoWindowProps = {
    location: StockLocation,
    position: google.maps.LatLngLiteral
}

export const MarkerWithInfoWindow = (props: MarkerWithInfoWindowProps) => {
    const { location, position } = props;
    const [markerRef, marker] = useAdvancedMarkerRef();
  
    const [infoWindowShown, setInfoWindowShown] = useState(false);
  
    const handleMarkerClick = useCallback(
      () => setInfoWindowShown(isShown => !isShown),
      []
    );
  
    const handleClose = useCallback(() => setInfoWindowShown(false), []);
  
    return (
      <>
        <AdvancedMarker
          ref={markerRef}
          position={position}
          onClick={handleMarkerClick}
        />
  
        {infoWindowShown && (
          <InfoWindow anchor={marker} headerContent={<b>{location.publicName}</b>} onClose={handleClose}>
            <p>Quantity available for click and collect: {location.quantityAvailable}</p>
            {location.inStoreStockLevel && <p>Stock level in store: {location.inStoreStockLevel}</p>}
          </InfoWindow>
        )}
      </>
    );
  };