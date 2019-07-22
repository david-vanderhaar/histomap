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
        onClick={() => props.onStep()}
        className="btn"
        style={{
          backgroundColor: Styles.themes[props.theme].element_body,
          color: Styles.themes[props.theme].element_text
        }}
      >
        Reset
      </button>
    </div>
  );
}

export default Toolbar;