import {
    InfoWindow,
    AdvancedMarker,
    Pin,
    useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import React, { useCallback, useState } from "react";
import { PinColors } from "../types/PinColors";
import { StockLocation } from "../types/StockLocation";

type MarkerWithInfoWindowProps = {
    location: StockLocation;
    position: google.maps.LatLngLiteral;
};

const generatePinColors = (location: StockLocation): PinColors => {
    const isAvailableInStore =
        !!location.inStoreStockLevel && location.inStoreStockLevel !== "Low";
    const isAvailableCandC = location.quantityAvailable > 0;
    if (!isAvailableInStore && !isAvailableCandC) {
        return {
            backgroundColor: "#D22D2D",
            borderColor: "#7E1B1B",
        };
    }
    if (!isAvailableInStore || !isAvailableCandC) {
        return {
            backgroundColor: "#FFCC33",
            borderColor: "#997300",
        };
    }
    return {
        backgroundColor: "#24A824",
        borderColor: "#125412",
    };
};

const generateInStoreStockText = (location: StockLocation): string => {
    if (!location.inStoreStockLevel) {
        return "Item not sold in store";
    }
    if (location.inStoreStockLevel === "High") {
        return "In stock in store";
    }
    if (location.inStoreStockLevel === "Medium") {
        return "Low stock in store";
    }
    return "Out of stock in store";
};

export const MarkerWithInfoWindow = (props: MarkerWithInfoWindowProps) => {
    const { location, position } = props;
    const [markerRef, marker] = useAdvancedMarkerRef();

    const [infoWindowShown, setInfoWindowShown] = useState(false);

    const handleMarkerClick = useCallback(
        () => setInfoWindowShown((isShown) => !isShown),
        [],
    );

    const handleClose = useCallback(() => setInfoWindowShown(false), []);

    const pinColors = generatePinColors(location);
    const { backgroundColor, borderColor } = pinColors;

    return (
        <>
            <AdvancedMarker
                ref={markerRef}
                position={position}
                onClick={handleMarkerClick}
            >
                <Pin
                    background={backgroundColor}
                    glyphColor={"#000"}
                    borderColor={borderColor}
                />
            </AdvancedMarker>

            {infoWindowShown && (
                <InfoWindow
                    anchor={marker}
                    headerContent={
                        <div className="info-window-header">
                            <p className="info-window-header-text">
                                {location.publicName}
                            </p>
                        </div>
                    }
                    onClose={handleClose}
                >
                    <div className="info-window-body">
                        <p>
                            Quantity available for click and collect:{" "}
                            {location.quantityAvailable}
                        </p>
                        <p>{generateInStoreStockText(location)}</p>
                    </div>
                </InfoWindow>
            )}
        </>
    );
};
