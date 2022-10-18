import React, { useEffect, useState } from 'react';
import '../App.css';
import Models from '../lib/models/models'
import NodeView from './NodeView';
import ChartView from './ChartView';
import Toolbar from './components/Toolbar';
import { Stage, Layer, Rect, Text } from 'react-konva';
import * as Styles from '../styles';
import { delay } from "q";

const TOP_SECTION_HEIGHT = 220;
const BOTTOM_SECTION_HEIGHT = 60;
const CHART_PADDING = 180;
const SIDE_INFO_WIDTH = 80;
const STAGE_PADDING_TOP = 20;
const NUMBER_OF_ACTORS = 10
const STAGE_WIDTH = window.innerWidth - CHART_PADDING
const STAGE_HEIGHT = window.innerHeight - (TOP_SECTION_HEIGHT + BOTTOM_SECTION_HEIGHT + STAGE_PADDING_TOP)
const DEFAULT_MODEL = 'SIMPLE'

const Histomap = ({theme, onSwitchTheme}) => {
  const [modelData, setModelData] = useState(Models[DEFAULT_MODEL])
  const [actors, setActors] = useState(modelData.model.generateActors(NUMBER_OF_ACTORS))

  const [history, setHistory] = useState([])
  const running_sim = false
  const [chart_view, setChartView] = useState(true)
  const stage_ref = React.createRef();
  const years_to_run = 1

  let getModel = () => modelData.model
  useEffect(() => {
    getModel = () => modelData.model
  }, [modelData])

  const start = () => null
  const pause = () => null
  const step = async () => {
    const newActors = await getModel().run(actors, 10, 0, false)
    setActors(newActors)

    const newHistory = getModel().getHistory({ actors: newActors, currentHistory: history })
    setHistory(newHistory)
  }

  const reset = () => null
  const restart = () => null
  const onSwitchView = () => setChartView(!chart_view)
  const addPolity = () => null
  const addPlayerPolity = () => null
  const onSelectModel = (event) => {
    const key = event.target.value
    const newModelData = Models[key]
    setModelData(newModelData)
    setActors(newModelData.model.generateActors(NUMBER_OF_ACTORS))
    setHistory([])
  }

  return (
    <div>
      <div className='top-section' style={{height: TOP_SECTION_HEIGHT}}>
        <Title theme={theme} title="The HISTOMAP" />
        <StepCounter theme={theme} step_label="year" total_steps={history.length}/>
        <SubTitle theme={theme} title="Relative power of contemporary states, nations, and empires" />
        <Toolbar 
          theme={theme}
          running_sim={running_sim}
          onStart={start}
          onPause={pause}
          onStep={step}
          onReset={reset}
          onRestart={restart}
          onSwitchTheme={onSwitchTheme}
          onSwitchView={onSwitchView}
          onAddTurchinPolity={addPolity}
          onAddPlayerPolity={addPlayerPolity}
          onSelectModel={onSelectModel}
          selectedModelName={DEFAULT_MODEL}
          chart_view={chart_view}
          stage_ref={stage_ref}
          />
      </div>
      <div className='Stage' style={{ paddingTop: STAGE_PADDING_TOP }}>
        <Stage ref={stage_ref} width={STAGE_WIDTH} height={STAGE_HEIGHT}>
          <Layer>
            {
              chart_view && (
                <ChartView
                  theme={theme}
                  polities={actors}
                  all_historical_polities={actors}
                  history={history}
                  years_to_run={years_to_run}
                  side_info_width={SIDE_INFO_WIDTH}
                  width={STAGE_WIDTH - SIDE_INFO_WIDTH}
                  height={STAGE_HEIGHT - STAGE_PADDING_TOP}
                  offset_x={CHART_PADDING}
                  offset_y={85}
                />
              )
            }
            {
              !chart_view && (
                <NodeView
                  polities={actors}
                  width={STAGE_WIDTH}
                  height={STAGE_HEIGHT}
                />
              )
            }
            
          </Layer>
        </Stage>
      </div>
      <Footer theme={theme}/>
    </div>
  )
}

const PowerPercentages = ({relativePowerPercentages}) => 
  relativePowerPercentages.map((percent, i) => (<div key={`${i}-power-percentage`}>{percent.polity_name}: {Math.round(percent.percent * 100)}</div>))

const Title = ({theme, title}) => (<h1 style={{color: Styles.themes[theme].element_body, margin: 0}}>{title}</h1>)
const StepCounter = ({theme, step_label, total_steps}) => (
  <p style={{
    color: Styles.themes[theme].element_body, 
    textTransform: 'uppercase'
  }}>
    {`${total_steps} ${pluralize(step_label, total_steps)} of world history`}
  </p>
)
const SubTitle = ({theme, title}) => (<p style={{color: Styles.themes[theme].element_body, textTransform: 'uppercase'}}>{title}</p>)

const Footer = ({theme}) => (
  <div className='bottom-section' style={{ height: BOTTOM_SECTION_HEIGHT }}>
    <span style={{ color: Styles.themes[theme].element_body}} className='bottom-section-text'>Copyright by David A. Vanderhaar</span>
    <span style={{ color: Styles.themes[theme].element_body}} className='bottom-section-text'>Made with React and Konva</span>
    <span style={{ color: Styles.themes[theme].element_body}} className='bottom-section-text'>Model based on Peter Turchin's Cycling in the Complexity of Early Societies</span>
  </div>
)

const pluralize = (word, count) => `${word}${count !== 1 ? 's' : ''}`

export default Histomap;
