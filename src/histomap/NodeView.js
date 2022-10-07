import React from 'react';
import '../App.css';
import * as Cycling from '../lib/models/turchin_cycling/turchin_cycling';
import { Rect, Text, Line, Group } from 'react-konva';

class NodeView extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      offset_x: (props.width / 100) - 1,
      offset_y: (props.height / 100) - 1,
      base_size: 10,
      size_multiplier: 20,
    }
  }

  render() {
    const polities = this.props.polities.map((p, i) => {
      const chief_pos_x = p.coordinates.x * this.state.offset_x
      const chief_pos_y = p.coordinates.y * this.state.offset_y
      const power = Cycling.getPower(p, this.props.polities)
      const size = (this.state.size_multiplier * power) + this.state.base_size
      const subordinate_lines = Cycling.getImmediateSubordinates(p, this.props.polities).map((subordinate, i) => {
        return (
          <Group>
            <Line
              key={i + 'b'}
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
              stroke={Cycling.getChiefPolity(p, this.props.polities).color}
              // stroke={p.color}
              tension={1}
              strokeWidth={4}
            />
          </Group>
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
      <Group>
        {polities}
      </Group>
    );
  }
}

export default NodeView;
