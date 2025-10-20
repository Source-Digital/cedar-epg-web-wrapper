import React, { useState, useCallback } from 'react';
import './App.css';
import { EpgComponent } from '@dotstudiopro/fast-engine';
// import EpgComponent from './components/EPG/EpgComponent';

function App() {
  const [activeChannelIndex, setActiveChannelIndex] = useState(0);
  
  const PLAY_ICON = "https://via.placeholder.com/20x20/ff6b35/white?text=▶";

  const handleChannelSelect = useCallback((epgChannel, index) => {
    console.log('Selected channel:', epgChannel);
    setActiveChannelIndex(index);
  }, []);

  const handleProgramSelect = useCallback((epgChannelProgram, epgChannel, index) => {
    console.log('Selected program:', epgChannelProgram);
    console.log('From channel:', epgChannel);
    setActiveChannelIndex(index);
  }, []);

  const handleDataLoaded = useCallback((channels) => {
    console.log('EPG data loaded:', channels);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>BKFC TV EPG Demo</h1>
      </header>
      
      <main className="App-main">
        <EpgComponent
          type="FullEPG"
          onSelectEpgChannel={handleChannelSelect}
          onSelectEpgChannelProgram={handleProgramSelect}
          onDataLoaded={handleDataLoaded}
          activeChannelIndex={activeChannelIndex}
          logoAspectRatio={2}
          numberOfDays={7}
          // buttonIcon={PLAY_ICON}
          style={{
            margin: '20px',
            maxWidth: '1200px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}
        />
      </main>
    </div>
  );
}

export default App;