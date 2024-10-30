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

const apiKey = "AIzaSyDmbbvMi4lj4awzK3ptp4ZOquivm9X6PdQ";

function App() {
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
    const [searchRadius, setSearchRadius] = useState<number>(25);
    const [mapSearchRadius, setMapSearchRadius] = useState<number>(25);
    const [searchPending, setSearchPending] = useState<boolean>(false);

    function handleSearchStarted(): void {
        setSearchPending(true);
        setAvailableProductLocations([]);
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
                handleSearchResultClick={setCurrentLocation}
            />
            <ProductSearch
                currentLocation={currentLocation}
                isSearchPending={searchPending}
                onProductAvailabilityFetched={setAvailableProductLocations}
                searchRadius={searchRadius}
                onSearchStarted={handleSearchStarted}
                onSearchFinished={() => setSearchPending(false)}
            />
            <SearchRadius onChange={setSearchRadius} value={searchRadius} />
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
