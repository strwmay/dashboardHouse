import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import LivingRoom from './components/LivingRoom';
import Bedroom from './components/Bedroom';
import Garage from './components/Garage';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <div className={`d-flex flex-column align-items-center ${darkMode ? "bg-dark text-light" : "bg-light text-dark"}`}>
      <h1 className={'mt-5'}>⚙️Smart House⚙️</h1>
      <button className="btn btn-secondary mb-4" onClick={toggleTheme}>
        Alternar para {darkMode ? "Light" : "Dark"} Mode
      </button>
      <div className="d-flex flex-wrap justify-content-center gap-4 mt-4">
        <LivingRoom darkMode={darkMode} />
        <Bedroom darkMode={darkMode} />
        <Garage darkMode={darkMode} />
      </div>
    </div>
  );
}

export default App;