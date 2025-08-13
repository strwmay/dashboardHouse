import React from 'react';
import ReactLogo from './assets/react.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import LivingRoom from './components/LivingRoom';

function App() {
  return (
    <div className="d-flex justify-content-center ">
      <div className="text-center mt-5">
        <h1>Smart House</h1>
        <LivingRoom/>
        <button className=''></button>
      </div>
    </div>
  );
}

export default App;