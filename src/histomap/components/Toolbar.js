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

const ToolbarButton = ({theme, onClick, title, text, ...props}) => {
  return (
    <button
      onClick={onClick}
      title={title}
      className="btn"
      style={{
        backgroundColor: Styles.themes[theme].element_body,
        color: Styles.themes[theme].element_text
      }}
      {...props}
    >
      {text}
    </button>
  )
}

const ModelToolbarFunctions = ({theme, model}) => {
  return model?.toolbarFunctionButtons?.length && (
    <div>
      {model.toolbarFunctionButtons.map((buttonProps, index) => {
        return <ToolbarButton key={index} theme={theme} {...buttonProps} />
      })}
    </div>
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
      <ToolbarButton
        theme={props.theme}
        text={props.running_sim ? 'Pause' : 'Auto'}
        onClick={handleStartPause}
        title="
          Start/Stop History
          (player politiy decisions will be auto resolved)
        "
      />
      <ToolbarButton
        theme={props.theme}
        onClick={props.onStep}
        text="Step"
      />
      <ToolbarButton
        theme={props.theme}
        onClick={props.onRestart}
        text="Restart"
      />
      <ToolbarButton
        theme={props.theme}
        onClick={props.onReset}
        text="New History"
      />
      <ToolbarButton
        theme={props.theme}
        disabled
        onClick={props.onAddTurchinPolity}
        text="Add Polity"
      />
      <ToolbarButton
        theme={props.theme}
        disabled
        onClick={props.onAddPlayerPolity}
        text="Add Player"
      />
      <ToolbarButton
        theme={props.theme}
        onClick={props.onSwitchTheme}
        text={props.theme === 'light' ? 'Go Dark' : 'Go Light'}
      />
      <ToolbarButton
        theme={props.theme}
        disabled
        onClick={props.onSwitchView}
        text={props.chart_view ? 'Node View'  : 'Chart View'}
      />
      <ToolbarButton
        theme={props.theme}
        onClick={() => {
          let dataURL = props.stage_ref.current.toDataURL()
          downloadURI(dataURL, 'the_histomap.png');
        }}
        text="Print"
      />
      <ModelToolbarFunctions theme={props.theme} model={props.getSelectedModel()} />
    </div>
  );
}

export default Toolbar;