import React from 'react';
import './App.css';
import * as Cycling from './lib/turchin_cycling';
import NodeView from './histomap/NodeView';
import ChartView from './histomap/ChartView';
import { Stage, Layer, Rect, Text } from 'react-konva';
import * as Styles from './styles';

class Histomap extends React.Component {
  constructor() {
    super();
    const polities = Cycling.generatePolities(20);
    const percents = Cycling.getPowerPercentages(polities);
    // const percents = Cycling.getPolityPercentages(polities);
    const events = [];
    const chart_padding = 180;
    const side_info_width = 80;
    this.state = {
      polities: polities,
      all_historical_polities: polities,
      chart_padding,
      side_info_width,
      width: window.innerWidth - chart_padding,
      height: window.innerHeight,
      history: [{polities, percents, events}],
      years_to_run: 10,
      step_interval: 500,
    }
  }

  async componentDidMount () {
    // let polities = [...this.state.polities];
    console.table(this.state.polities);
    // polities = await Cycling.run(polities, 300, 0);
    // this.setState({polities});
    // // console.table(this.state.polities);
    for (let i = 0; i < 10; i ++) {
      await this.step(this.state.years_to_run, (this.state.step_interval / this.state.years_to_run));
    }
  }

  async step (years_to_run = 1, step_interval = 0) {
    let polities = await Cycling.run([...this.state.polities], years_to_run, step_interval);
    // testing out when a polity is removed
    // let random_index = getRandomIntInclusive(0, polities.length);
    // polities = polities.filter((p, i) => i !== random_index)

    const percents = Cycling.getPowerPercentages(polities);
    // const percents = Cycling.getPolityPercentages(polities);
    const events = Cycling.getEvents(polities);

    const history = this.state.history.concat({polities, percents, events});
    
    this.setState({ polities, history });
    // console.table(polities);
  }

  render() {
    return (
      <div>
        <h1 style={{color: Styles.themes[this.props.theme].element_body, margin: 0}}>The HISTOMAP</h1>
        <p style={{ color: Styles.themes[this.props.theme].element_body}}>
          {`${this.state.history.length * this.state.years_to_run} year${this.state.history.length > 1 ? 's' : ''} of world history`.toUpperCase()}
        </p>
        <p style={{ color: Styles.themes[this.props.theme].element_body}}>{`Relative power of contemporary states, nations, and empires`.toUpperCase()}</p>
        <button 
          onClick={() => this.step()} 
          className="btn"
          style={{
            backgroundColor: Styles.themes[this.props.theme].element_body,
            color: Styles.themes[this.props.theme].element_text
          }}
        >
          Step
        </button>
        <div className='Stage'>
          <Stage width={this.state.width} height={this.state.height}>
            {/* <Layer>
              <Rect
                x={20}
                y={0}
                width={100}
                height={50}
                fill={Styles.themes[this.props.theme].element_body}
                onClick={() => this.step()}
              />
              <Text
                x={50}
                y={35}
                text={'Step'}
                fill={Styles.themes[this.props.theme].element_text}
                fontSize={20}
                fontStyle={'bold'}
                onClick={() => this.step()}
              />
            </Layer> */}
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
                height={this.state.height}
                offset_x={this.state.chart_padding}
                // offset_x={0}
                offset_y={85}
              />
            </Layer>
          </Stage>
        </div>
      </div>
    )
  }
}

export default Histomap;
