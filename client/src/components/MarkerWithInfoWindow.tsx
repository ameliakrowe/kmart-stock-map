import { InfoWindow, AdvancedMarker, Pin, useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import React, { useCallback, useState } from 'react';
import { PinColors } from "../types/PinColors";
import { StockLocation } from "../types/StockLocation";

type MarkerWithInfoWindowProps = {
    location: StockLocation,
    position: google.maps.LatLngLiteral
}

const generatePinColorsForLocation = (location: StockLocation): PinColors => {
  if (location.inStoreStockLevel === "Low" && location.quantityAvailable === 0) {
    return {
      backgroundColor: '#D22D2D',
      borderColor: '#7E1B1B'
    }
  }
  if (location.inStoreStockLevel === "Low" || location.quantityAvailable === 0) {
    return {
      backgroundColor: '#FFCC33',
      borderColor: '#997300'
    }
  }
  return {
    backgroundColor: '#24A824',
    borderColor: '#125412'
  }
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

    const pinColors = generatePinColorsForLocation(location);
    const { backgroundColor, borderColor } = pinColors;
  
    return (
      <>
        <AdvancedMarker ref={markerRef} position={position} onClick={handleMarkerClick}>
          <Pin background={backgroundColor} glyphColor={'#000'} borderColor={borderColor}/>
        </AdvancedMarker>
  
        {infoWindowShown && (
          <InfoWindow anchor={marker} headerContent={<b>{location.publicName}</b>} onClose={handleClose}>
            <p>Quantity available for click and collect: {location.quantityAvailable}</p>
            {location.inStoreStockLevel && <p>Stock level in store: {location.inStoreStockLevel}</p>}
          </InfoWindow>
        )}
      </>
    );
  };