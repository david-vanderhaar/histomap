import React from 'react';
import '../../App.css';
import * as Styles from '../../styles';

function Toolbar(props) {

  const handleStartPause = () => {
    if (props.running_sim) {
      props.onPause()
    } else {
      props.onStart()
    }
  }

  const downloadURI = (uri, name) => {
    let link = document.createElement('a');
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    // delete link;
  }

  return (
    <div className="Toolbar">
      <button
        onClick={handleStartPause}
        className="btn"
        style={{
          backgroundColor: Styles.themes[props.theme].element_body,
          color: Styles.themes[props.theme].element_text
        }}
      >
        {
          props.running_sim
            ? 'Pause'
            : 'Start'
        }
      </button>
      <button
        onClick={() => props.onStep()}
        className="btn"
        style={{
          backgroundColor: Styles.themes[props.theme].element_body,
          color: Styles.themes[props.theme].element_text
        }}
      >
        Step
      </button>
      <button
        onClick={() => props.onRestart()}
        className="btn"
        style={{
          backgroundColor: Styles.themes[props.theme].element_body,
          color: Styles.themes[props.theme].element_text
        }}
      >
        Restart
      </button>
      <button
        onClick={() => props.onReset()}
        className="btn"
        style={{
          backgroundColor: Styles.themes[props.theme].element_body,
          color: Styles.themes[props.theme].element_text
        }}
      >
        New History
      </button>
      <button
        onClick={() => props.onSwitchTheme()}
        className="btn"
        style={{
          backgroundColor: Styles.themes[props.theme].element_body,
          color: Styles.themes[props.theme].element_text
        }}
      >
        {
          props.theme === 'light' 
            ? 'Go Dark' 
            : 'Go Light'
        }
      </button>
      <button
        onClick={() => props.onSwitchView()}
        className="btn"
        style={{
          backgroundColor: Styles.themes[props.theme].element_body,
          color: Styles.themes[props.theme].element_text
        }}
      >
        {
          props.chart_view
            ? 'Node View' 
            : 'Chart View'
        }
      </button>
      {/* <button
        onClick={() => {
            let dataURL = props.stage_ref.current.toDataURL()
            downloadURI(dataURL, 'the_histomap.png');
          // console.log(props.stage_ref.current);
            
          }
        }
        className="btn"
        style={{
          backgroundColor: Styles.themes[props.theme].element_body,
          color: Styles.themes[props.theme].element_text
        }}
      >
        Print
      </button> */}
    </div>
  );
}

export default Toolbar;