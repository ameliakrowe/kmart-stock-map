import './styles.css';
import { LocationBanner } from './components/LocationBanner';
import { LocationModal } from './components/LocationModal';
import { MapDisplay } from './components/MapDisplay';
import { SearchArea } from './components/SearchArea';
import { useState } from 'react';

function App() {
  const [currentLocation, setCurrentLocation] = useState<string>("Ultimo");
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  return (
    <div className="App">
      <LocationBanner selectedLocation={currentLocation} handleOpenModal={() => setModalIsOpen(true)}/>
      <header className="App-header">
        <p>
          Kmart Stock Map
        </p>
      </header>
      <SearchArea />
      <LocationModal isOpen={modalIsOpen} onClose={() => setModalIsOpen(false)}/>
    </div>
  );
}

export default App;
