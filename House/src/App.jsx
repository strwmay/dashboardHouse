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
    <div className={`d-flex flex-column align-items-center ${darkMode ? "bg-dark text-light" : "bg-light text-dark"} divMain`}>
      <h1 className={'mt-5'}>⚙️Smart House⚙️</h1>
      <button className="btn btn-secondary mb-4" onClick={toggleTheme}>
        Alternar para {darkMode ? "Light" : "Dark"} Mode
      </button>

        <div className='row d-flex justify-content-evenly gap-2 mt-4 h-100'>
        <LivingRoom darkMode={darkMode} />
        <Bedroom darkMode={darkMode} />
        <Garage darkMode={darkMode} />
      </div>
    </div>
  );
}

export default App;