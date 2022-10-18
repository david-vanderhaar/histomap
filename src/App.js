import React, { useState } from 'react';
import './App.css';
import Histomap from './histomap/Histomap';
import * as Styles from './styles';
import LockAndKeyModel from './lib/models/lock_and_key/lock_and_key'
import * as CyclingModel from './lib/models/turchin_cycling/turchin_cycling'
// import Pdf from "react-to-pdf";

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

  // const actors = LockAndKeyModel.generateActors({})
  // console.log(actors);

  // const result = LockAndKeyModel.runFor(3, actors)
  // console.log(result);

  // console.log(LockAndKeyModel.getHistory());

  return (
    <div 
      ref={ref}
      className="App" 
      style={{backgroundColor: Styles.themes[theme].background}}
    >
      {/* <Pdf targetRef={ref} filename="code-example.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
      </Pdf> */}
      <Histomap 
        onSwitchTheme={() => { setTheme(switchTheme(theme))}} 
        theme={theme}
        model={LockAndKeyModel}
        // model={CyclingModel}
      />
    </div>
  );
}

export default App;
