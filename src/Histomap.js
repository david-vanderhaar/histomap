import React from 'react';
import './App.css';
import * as StateGenerator from './lib/generators/state';
import * as Events from './lib/events';
import * as Cycling from './lib/turchin_cycling';
import { Stage, Layer, Rect, Text, Line, Group } from 'react-konva';
import Konva from 'konva';

class Histomap extends React.Component {

  state = {
    polities: Cycling.generatePolities(10),
    offset_x: (window.innerWidth / 100) - 1,
    offset_y: (window.innerHeight / 100) - 1,
    base_size: 10,
    size_multiplier: 20,
  }

  async componentDidMount () {
    // let polities = [...this.state.polities];
    console.table(this.state.polities);
    // polities = await Cycling.run(polities, 300, 0);
    // this.setState({polities});
    // // console.table(this.state.polities);
    // for (let i = 0; i < 100; i ++) {
    //   let polities = await Cycling.run([...this.state.polities], 1, 1000);
    //   this.setState({ polities });
    // }
  }

  async step () {
    let polities = await Cycling.run([...this.state.polities], 1, 0);
    this.setState({ polities });
    console.table(polities);
  }

  render() {
    const polities = this.state.polities.map((p, i) => {
      const chief_pos_x = p.coordinates.x * this.state.offset_x
      const chief_pos_y = p.coordinates.y * this.state.offset_y
      const power = Cycling.getPower(p, this.state.polities)
      const size = (this.state.size_multiplier * power) + this.state.base_size
      const subordinate_lines = Cycling.getImmediateSubordinates(p, this.state.polities).map((subordinate, i) => {
        return (
          <Line
            key={i}
            x={0}
            y={0}
            points={[
              chief_pos_x, 
              chief_pos_y, 
              // chief_pos_x + 20, 
              // chief_pos_y + 20, 
              subordinate.coordinates.x * this.state.offset_x, 
              subordinate.coordinates.y * this.state.offset_y
            ]}
            stroke={Cycling.getChiefPolity(p, this.state.polities).color}
            // stroke={p.color}
            tension={1}
          />
        )
      })
      return (
        <Group key={i}>
          <Text
            x={chief_pos_x}
            y={chief_pos_y + 40}
            text={p.name}
            fill='red'
            fontSize={20}
          />
          <Text
            x={chief_pos_x}
            y={chief_pos_y - 20}
            text={Math.round(power * 100) / 100}
            fill='red'
            fontSize={20}
          />
          <Rect
            x={chief_pos_x}
            y={chief_pos_y}
            width={size}
            height={size}
            fill={p.color}
            shadowBlur={5}
          />
          {subordinate_lines}
        </Group>
      )
    })
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
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
          {polities}
        </Layer>
      </Stage>
    );
  }
}

export default Histomap;
