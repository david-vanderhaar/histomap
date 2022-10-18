import React from 'react';
import '../../App.css';
import * as Styles from '../../styles';
import Models from '../../lib/models/models'

const ModelSelect = ({selected, onSelect, theme}) => {
  return (
    <select
      style={
        {
          display: 'inline-block',
          width: 'initial',
          backgroundColor: Styles.themes[theme].element_body,
          color: Styles.themes[theme].element_text
        }
      }
      onChange={onSelect}
      defaultValue={selected}
    >
      {Object.entries(Models).map(([key, value]) => {
        return (
          <option key={key} value={key}>
            {value.name}
          </option>
        )
      })}
    </select>
  )
}

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
      <ModelSelect theme={props.theme} onSelect={props.onSelectModel} selected={props.selectedModelName}/>
      <button
        onClick={handleStartPause}
        className="btn"
        title="
          Start/Stop History
          (player politiy decisions will be auto resolved)
        "
        style={{
          backgroundColor: Styles.themes[props.theme].element_body,
          color: Styles.themes[props.theme].element_text
        }}
      >
        {
          props.running_sim
            ? 'Pause'
            : 'Auto'
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
        onClick={() => props.onAddTurchinPolity()}
        className="btn"
        style={{
          backgroundColor: Styles.themes[props.theme].element_body,
          color: Styles.themes[props.theme].element_text
        }}
      >
        Add Polity
      </button>
      <button
        onClick={() => props.onAddPlayerPolity()}
        className="btn"
        style={{
          backgroundColor: Styles.themes[props.theme].element_body,
          color: Styles.themes[props.theme].element_text
        }}
      >
        Add Player
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