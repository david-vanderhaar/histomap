import React from 'react';
import './App.css';
import * as StateGenerator from './lib/generators/state';
import * as Events from './lib/events';
import * as Cycling from './lib/turchin_cycling';
import { Stage, Layer, Rect, Text } from 'react-konva';
import Konva from 'konva';

class ColoredRect extends React.Component {
  state = {
    color: 'green'
  };
  handleClick = () => {
    this.setState({
      color: Konva.Util.getRandomColor()
    });
  };
  render() {
    return (
      <Rect
        x={20}
        y={20}
        width={50}
        height={50}
        fill={this.state.color}
        shadowBlur={5}
        onClick={this.handleClick}
      />
    );
  }
}

class Histomap extends React.Component {

  state = {
    polities: [],
  }

  async componentDidMount () {
    let polities = Cycling.generatePolities(30);
    console.table(polities);
    polities = await Cycling.run(polities, 500, 0);
    this.setState({polities});
    console.table(this.state.polities);
  }

  render() {
    const polities = this.state.polities.map((p, i) => {
      return (<Rect
        key={i}
        x={p.coordinates.x * (window.innerWidth / 100)}
        y={p.coordinates.y * (window.innerHeight / 100)}
        width={(10 * p.resource_level) + 10}
        height={(10 * p.resource_level) + 10}
        fill={Konva.Util.getRandomColor()}
        shadowBlur={5}
      />)
    })
    return (
      <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          {polities}
        </Layer>
      </Stage>
    );
  }
}

export default Histomap;
