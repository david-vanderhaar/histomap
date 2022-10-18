import React, { useState } from 'react';
import './App.css';
import Histomap from './histomap/Histomap';
import * as Styles from './styles';
import Models from './lib/models/models';

const switchTheme = (theme) => {
  if (theme === 'light') {
    return 'dark';
  } else {
    return 'light';
  }
}

const ref = React.createRef();

function App() {
  const [theme, setTheme] = useState('light');
  const [modelData, setModelData] = useState(Models.TURCHIN_CYCLING)
  const onSelectModel = (event) => {
    const key = event.target.value
    setModelData(Models[key])
  }

  return (
    <div 
      ref={ref}
      className="App" 
      style={{backgroundColor: Styles.themes[theme].background}}
    >
      <Histomap 
        onSwitchTheme={() => { setTheme(switchTheme(theme))}} 
        theme={theme}
        modelData={modelData}
        onSelectModel={onSelectModel}
      />
    </div>
  );
}

export default App;
