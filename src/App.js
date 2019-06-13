import React from 'react';
import logo from './logo.svg';
import './App.css';
import Histomap from './Histomap';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Histomap />
      </header>
    </div>
  );
}

export default App;
