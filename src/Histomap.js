import React from 'react';
import './App.css';
import * as Cycling from './lib/turchin_cycling';
import NodeView from './histomap/NodeView';
import ChartView from './histomap/ChartView';
import { Stage, Layer, Rect, Text, Line, Group } from 'react-konva';

class Histomap extends React.Component {
  constructor() {
    super();
    const polities = Cycling.generatePolities(10);
    const total_power = Cycling.getTotalPower(polities, polities)
    let percents = polities.map((p) => {
      let percent = (Cycling.getPower(p, polities) / total_power)
      return { percent, polity_id: p.id }
    })

    this.state = {
      polities: polities,
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
    // for (let i = 0; i < 100; i ++) {
    //   await this.step(1000);
    // }
  }

  async step (step_interval = 0) {
    let polities = await Cycling.run([...this.state.polities], 1, step_interval);
    const total_power = Cycling.getTotalPower(polities, polities)
    let percents = polities.map((p) => {
      let percent = (Cycling.getPower(p, polities) / total_power)
      return {percent, polity_id: p.id}
    })

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
