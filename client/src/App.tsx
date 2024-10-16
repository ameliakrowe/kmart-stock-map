import './styles.css';
import { LocationBanner } from './components/LocationBanner';
import { LocationModal } from './components/LocationModal';
import { MapDisplay } from './components/MapDisplay';
import { Result } from './types/Result';
import { ProductSearch } from './components/ProductSearch';
import React, { useState } from 'react';
import { StockLocation } from "./types/StockLocation";

function App() {
  const [currentLocation, setCurrentLocation] = useState<Result>({
    suburb: "SYDNEY",
    postcode: "2000",
    state: "NSW",
    location: {
      lat: -33.8697,
      lon: 151.2099
    }
  });
  const [availableProductLocations, setAvailableProductLocations] = useState<StockLocation[]>([]);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);

  return (
    <div className="App">
      <LocationBanner selectedLocation={currentLocation} handleOpenModal={() => setModalIsOpen(true)}/>
      <header className="App-header">
        <p>
          Kmart Stock Map
        </p>
      </header>
      <LocationModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)} handleSearchResultClick={setCurrentLocation}/>
      <ProductSearch currentLocation={currentLocation} onProductAvailabilityFetched={setAvailableProductLocations}/>
      <MapDisplay centerLocation={currentLocation.location} stockLocations={availableProductLocations}/>
    </div>
  );
}

export default App;
