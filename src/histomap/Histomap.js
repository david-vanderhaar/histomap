import React, { useEffect, useState } from 'react';
import '../App.css';
import * as Cycling from '../lib/models/turchin_cycling/turchin_cycling';
import NodeView from './NodeView';
import ChartView from './ChartView';
import Toolbar from './components/Toolbar';
import Sidenav from './components/Sidenav';
import { Stage, Layer, Rect, Text } from 'react-konva';
import * as Styles from '../styles';
import { delay } from "q";

const TOP_SECTION_HEIGHT = 200;
const BOTTOM_SECTION_HEIGHT = 60;
const CHART_PADDING = 180;
const SIDE_INFO_WIDTH = 80;
const STAGE_PADDING_TOP = 20;
const NUMBER_OF_ACTORS = 10
const STAGE_WIDTH = window.innerWidth - CHART_PADDING
const STAGE_HEIGHT = window.innerHeight - (TOP_SECTION_HEIGHT + BOTTOM_SECTION_HEIGHT + STAGE_PADDING_TOP)

const Histomap = ({theme, onSwitchTheme, model}) => {
  const [history, setHistory] = useState([])
  const running_sim = false
  const [chart_view, setChartView] = useState(true)
  const stage_ref = React.createRef();
  const years_to_run = 1

  const [actors, setActors] = useState(model.generateActors(NUMBER_OF_ACTORS))
  const [relativePowerPercentages, setRelativePowerPercentages] = useState(model.getPowerPercentages(actors))

  const start = () => null
  const pause = () => null
  const step = async () => {
    const newActors = await model.run(actors, 10, 0, false)
    setActors(newActors) 
  
    const newPercentages = model.getPowerPercentages(newActors)
    setRelativePowerPercentages(newPercentages)

    const newHistory = model.getHistory({actors: newActors, currentHistory: history})
    setHistory(newHistory)
  }

  const reset = () => null
  const restart = () => null
  const onSwitchView = () => setChartView(!chart_view)
  const addPolity = () => null
  const addPlayerPolity = () => null

  return (
    <div>
      <Sidenav theme={theme} />
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
            chart_view={chart_view}
            stage_ref={stage_ref}
          />
      </div>
      <div className='Stage' style={{ paddingTop: STAGE_PADDING_TOP }}>
        <PowerPercentages relativePowerPercentages={relativePowerPercentages} />
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
