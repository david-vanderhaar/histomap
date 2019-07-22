import React from 'react';
import './App.css';
import * as Cycling from './lib/turchin_cycling';
import NodeView from './histomap/NodeView';
import ChartView from './histomap/ChartView';
import Toolbar from './histomap/components/Toolbar';
import { Stage, Layer, Rect, Text } from 'react-konva';
import * as Styles from './styles';

class Histomap extends React.Component {
  constructor() {
    super();
    const polities = Cycling.generatePolities(20);
    // const percents = Cycling.getPowerPercentages(polities);
    const percents = Cycling.getPolityPercentages(polities);
    const events = [];
    const chart_padding = 180;
    const side_info_width = 80;
    const top_section_height = 200;
    const bottom_section_height = 60;
    const stage_padding_top = 20;

    this.state = {
      polities: polities,
      all_historical_polities: polities,
      chart_padding,
      side_info_width,
      width: window.innerWidth - chart_padding,
      // height: window.innerHeight - (top_section_height + stage_padding_top),
      height: window.innerHeight - (top_section_height + bottom_section_height + stage_padding_top),
      stage_padding_top,
      top_section_height,
      bottom_section_height,
      history: [{polities, percents, events}],
      years_to_run: 10,
      running_sim: false,
      running_sim_reference: null,
      step_interval: 500,
    }
  }

  async componentDidMount () {
    // let polities = [...this.state.polities];
    console.table(this.state.polities);
    // polities = await Cycling.run(polities, 300, 0);
    // this.setState({polities});
    // // console.table(this.state.polities);
    // for (let i = 0; i < 10; i ++) {
    //   await this.step(this.state.years_to_run, (this.state.step_interval / this.state.years_to_run));
    // }
    // while (this.state.running_sim_reference !== null) {
    //   await this.step(this.state.years_to_run, (this.state.step_interval / this.state.years_to_run));
    // }
  }

  async start () {
    console.log('start');
    await this.setState({running_sim: true})
    await this.step(this.state.years_to_run, (this.state.step_interval / this.state.years_to_run));
  }
  
  pause () {
    console.log('pause');
    this.setState({running_sim: false})
  }

  async step (years_to_run = 1, step_interval = 0) {
    console.log('step');
    
    let polities = await Cycling.run([...this.state.polities], years_to_run, step_interval);
    // testing out when a polity is removed
    // let random_index = getRandomIntInclusive(0, polities.length);
    // polities = polities.filter((p, i) => i !== random_index)

    // const percents = Cycling.getPowerPercentages(polities);
    const percents = Cycling.getPolityPercentages(polities);
    const events = Cycling.getEvents(polities);

    const history = this.state.history.concat({polities, percents, events});
    
    await this.setState({ polities, history });
    // console.table(polities);

    if (this.state.running_sim) {
      await this.step(years_to_run, (step_interval / years_to_run));
    }
  }

  render() {
    return (
      <div>
        <div className='top-section' style={{height: this.state.top_section_height}}>
          <h1 style={{color: Styles.themes[this.props.theme].element_body, margin: 0}}>The HISTOMAP</h1>
          <p style={{ color: Styles.themes[this.props.theme].element_body}}>
            {`${this.state.history.length * this.state.years_to_run} year${this.state.history.length > 1 ? 's' : ''} of world history`.toUpperCase()}
          </p>
          <p style={{ color: Styles.themes[this.props.theme].element_body}}>{`Relative power of contemporary states, nations, and empires`.toUpperCase()}</p>
          <Toolbar 
            theme={this.props.theme}
            running_sim={this.state.running_sim}
            onStart={this.start.bind(this)}
            onPause={this.pause.bind(this)}
            onStep={this.step.bind(this)}
          />
        </div>
        <div className='Stage' style={{ paddingTop: this.state.stage_padding_top }}>
          <Stage width={this.state.width} height={this.state.height}>
            <Layer>
              {/* <NodeView 
                polities={this.state.polities} 
                width={this.state.width} 
                height={this.state.height}
              /> */}
              <ChartView 
                theme={this.props.theme}
                polities={this.state.polities} 
                all_historical_polities={this.state.all_historical_polities} 
                history={this.state.history}
                years_to_run={this.state.years_to_run} 
                side_info_width={this.state.side_info_width}
                width={this.state.width - this.state.side_info_width} 
                height={this.state.height - this.state.stage_padding_top}
                offset_x={this.state.chart_padding}
                // offset_x={0}
                offset_y={85}
              />
            </Layer>
          </Stage>
        </div>
        <div className='bottom-section' style={{ height: this.state.bottom_section_height }}>
          <span style={{ color: Styles.themes[this.props.theme].element_body}} className='bottom-section-text'>Copyright by David A. Vanderhaar</span>
          <span style={{ color: Styles.themes[this.props.theme].element_body}} className='bottom-section-text'>Made with React and Konva</span>
          <span style={{ color: Styles.themes[this.props.theme].element_body}} className='bottom-section-text'>Model based on Peter Turchin's Cycling in the Complexity of Early Societies</span>
        </div>
      </div>
    )
  }
}

export default Histomap;
