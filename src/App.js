import React, { useState } from 'react';
import './App.css';
import Histomap from './histomap/Histomap';
import * as Styles from './styles';

const switchTheme = (theme) => {
  if (theme === 'light') {
    return 'dark';
  } else {
    return 'light';
  }
}

const ref = React.createRef();

function App() {
  const [theme, setTheme] = useState('dark');

  return (
    <div 
      ref={ref}
      className="App" 
      style={{backgroundColor: Styles.themes[theme].background}}
    >
      <Histomap 
        onSwitchTheme={() => { setTheme(switchTheme(theme))}} 
        theme={theme}
      />
    </div>
  );
}

export default App;
