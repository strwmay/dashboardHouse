import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import LivingRoom from './components/LivingRoom';
import Bedroom from './components/Bedroom';
import Garage from './components/Garage';

function App() {
  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <h1>Smart House</h1>
      <div className="container">
        <LivingRoom />
        <Bedroom />
        <Garage />
      </div>
    </div>
  );
}

export default App;