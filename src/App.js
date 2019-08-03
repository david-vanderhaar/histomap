import React, { useState } from 'react';
import './App.css';
import Histomap from './Histomap';
import * as Styles from './styles';
import Pdf from "react-to-pdf";

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

  return (
    <div ref={ref} className="App" style={{
      backgroundColor: Styles.themes[theme].background,
      // border: `solid ${Styles.themes[theme].element_body} 4px`,
      // margin: '50px',
    }}>
      {/* <Pdf targetRef={ref} filename="code-example.pdf">
        {({ toPdf }) => <button onClick={toPdf}>Generate Pdf</button>}
      </Pdf> */}
      <Histomap onSwitchTheme={() => { setTheme(switchTheme(theme))}} theme={theme}/>
    </div>
  );
}

export default App;
