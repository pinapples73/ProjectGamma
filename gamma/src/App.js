import React from 'react';
import './App.css';
import MainContainer from './containers/MainContainer';
import WeatherContainer from "./containers/WeatherContainer";

function App() {
  return (
      <div className="grid-layout">
        <MainContainer/>
        <WeatherContainer />
      </div>
    );
}

export default App;
