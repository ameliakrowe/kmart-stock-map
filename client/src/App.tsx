import './styles.css';
import { MapDisplay } from './components/MapDisplay';
import { SearchArea } from './components/SearchArea';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Kmart Stock Map
        </p>
      </header>
      <SearchArea />
    </div>
  );
}

export default App;
