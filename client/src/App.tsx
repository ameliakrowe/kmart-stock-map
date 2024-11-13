import "./styles.css";
import { LocationBanner } from "./components/LocationBanner";
import { LocationModal } from "./components/LocationModal";
import { MapDisplay } from "./components/MapDisplay";
import { Result } from "./types/Result";
import { ProductSearch } from "./components/ProductSearch";
import { SearchRadius } from "./components/SearchRadius";
import React, { useEffect, useState } from "react";
import { APIProvider } from "@vis.gl/react-google-maps";
import { StockLocation } from "./types/StockLocation";
import { SearchError } from "./components/SearchError";

const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY || "";

function App() {
    console.log(process.env.GOOGLE_MAPS_API_KEY);
    const [currentLocation, setCurrentLocation] = useState<Result>({
        suburb: "SYDNEY",
        postcode: "2000",
        state: "NSW",
        location: {
            lat: -33.8697,
            lon: 151.2099,
        },
    });
    const [availableProductLocations, setAvailableProductLocations] = useState<
        StockLocation[]
    >([]);
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
    const [searchRadius, setSearchRadius] = useState<number>(30);
    const [mapSearchRadius, setMapSearchRadius] = useState<number>(30);
    const [searchPending, setSearchPending] = useState<boolean>(false);
    const [searchError, setSearchError] = useState<string | null>(null);

    function handleSearchStarted(): void {
        setSearchPending(true);
        setAvailableProductLocations([]);
        setSearchError(null);
    }

    useEffect(() => {
        const debounceSetMapSearchRadius = setTimeout(() => {
            setMapSearchRadius(searchRadius);
        }, 750);

        return () => clearTimeout(debounceSetMapSearchRadius);
    }, [searchRadius]);

    return (
        <div className="App">
            <LocationBanner
                selectedLocation={currentLocation}
                handleOpenModal={() => setModalIsOpen(true)}
            />
            <header className="App-header">
                <p>Kmart Stock Map</p>
            </header>
            <LocationModal
                isOpen={modalIsOpen}
                onClose={() => setModalIsOpen(false)}
                onSetLocation={setCurrentLocation}
            />
            <ProductSearch
                currentLocation={currentLocation}
                isSearchPending={searchPending}
                onProductAvailabilityFetched={setAvailableProductLocations}
                searchRadius={searchRadius}
                onSearchError={setSearchError}
                onSearchStarted={handleSearchStarted}
                onSearchFinished={() => setSearchPending(false)}
            />
            <SearchRadius onChange={setSearchRadius} value={searchRadius} />
            {!!searchError && <SearchError message={searchError} />}
            <APIProvider
                apiKey={apiKey}
                onLoad={() => console.log("Maps API loaded")}
            >
                <MapDisplay
                    centerLocation={currentLocation.location}
                    searchRadius={mapSearchRadius}
                    stockLocations={availableProductLocations}
                />
            </APIProvider>
        </div>
    );
}

export default App;
