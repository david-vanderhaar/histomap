import React, { useState } from 'react';
import './App.css';
import Histomap from './Histomap';
import * as Styles from './styles';

const switchTheme = (theme) => {
  if (theme === 'light') {
    return 'dark';
  } else {
    return 'light';
  }
}

function App() {
  const [theme, setTheme] = useState('light');

  return (
    <div className="App" style={{
      backgroundColor: Styles.themes[theme].background,
      // border: `solid ${Styles.themes[theme].element_body} 4px`,
      // margin: '50px',
    }}>
      {/* <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h2>Histomap</h2>
      </div> */}
      <Histomap onSwitchTheme={() => { setTheme(switchTheme(theme))}} theme={theme}/>
    </div>
  );
}

export default App;
