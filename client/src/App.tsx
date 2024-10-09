import './styles.css';
import { LocationBanner } from './components/LocationBanner';
import { LocationModal } from './components/LocationModal';
import { MapDisplay } from './components/MapDisplay';
import { Result } from './types/Result';
import { useState } from 'react';

function App() {
  const [currentLocation, setCurrentLocation] = useState<Result>({
    suburb: "",
    postcode: "",
    state: "",
    location: {
      lat: 0,
      lon: 0
    }
  });
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
      <MapDisplay location={currentLocation.location}/>
    </div>
  );
}

export default App;
