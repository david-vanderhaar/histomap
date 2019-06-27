import React from 'react';
import './App.css';
import * as Cycling from './lib/turchin_cycling';
import NodeView from './histomap/NodeView';
import ChartView from './histomap/ChartView';
import { Stage, Layer, Rect, Text, Line, Group } from 'react-konva';
import { getRandomIntInclusive } from './lib/helper';

class Histomap extends React.Component {
  constructor() {
    super();
    const polities = Cycling.generatePolities(30);
    // const percents = Cycling.getPowerPercentages(polities);
    const percents = Cycling.getPolityPercentages(polities);

    this.state = {
      polities: polities,
      all_historical_polities: polities,
      width: window.innerWidth - 40,
      height: window.innerHeight,
      history: [{polities, percents}],
    }
  }

  async componentDidMount () {
    // let polities = [...this.state.polities];
    console.table(this.state.polities);
    // polities = await Cycling.run(polities, 300, 0);
    // this.setState({polities});
    // // console.table(this.state.polities);
    for (let i = 0; i < 200; i ++) {
      await this.step(500);
    }
  }

  async step (step_interval = 0) {
    let polities = await Cycling.run([...this.state.polities], 1, step_interval);
    // testing out when a polity is removed
    // let random_index = getRandomIntInclusive(0, polities.length);
    // polities = polities.filter((p, i) => i !== random_index)

    // const percents = Cycling.getPowerPercentages(polities);
    const percents = Cycling.getPolityPercentages(polities);

    const history = this.state.history.concat({polities, percents});
    
    this.setState({ polities, history });
    // console.table(polities);
  }

  render() {
    return (
      <Stage width={this.state.width} height={this.state.width}>
        <Layer>
          <Rect
            x={20}
            y={20}
            width={100}
            height={50}
            fill={'red'}
            onClick={() => this.step()}
          />
          <Text
            x={50}
            y={40}
            text={'Step'}
            fill='black'
            fontSize={20}
          />
        </Layer>
        <Layer>
          {/* <NodeView 
            polities={this.state.polities} 
            width={this.state.width} 
            height={this.state.height}
          /> */}
          <ChartView 
            polities={this.state.polities} 
            all_historical_polities={this.state.all_historical_polities} 
            history={this.state.history} 
            width={this.state.width} 
            height={this.state.height}
          />
        </Layer>
      </Stage>
    )
  }
}

export default Histomap;
