import React from 'react';
import '../App.css';
import * as Cycling from '../lib/turchin_cycling';
import { Stage, Layer, Circle, Text, Line, Group } from 'react-konva';

class ChartView extends React.Component {
  state = {
    step_distance: 100,
    entity_distance: 40,
    offset_x: 160,
    offset_y: 25,
    previous_polity_power: 0,
    padding_right: 20,
  }

  reverse_sub_arrays(arr, n, k) {
    let array = arr.concat()
    let i = 0
    while (i < n) {
      let left = i
      let right = Math.min(i + k - 1, n - 1)
      while (left < right) {
        let a_left = array[left]
        let a_right = array[right]
        array[left] = a_right
        array[right] = a_left
        left += 1;
        right -= 1;
        i += k 
      }
    }
    return array
  }

  render() {
    let lines = this.props.polities.map((p) => {
      return {
        polity: p,
        points: [],
      }
    });

    this.props.history.map((step, i) => {
      step.polities.map((polity, j) => {
        const relative_power = Cycling.getPower(polity, step.polities) / step.total_power
        const all_previous_releative_powers = j > 0
          ? Cycling.getTotalPower(step.polities.slice(0, j), step.polities) / step.total_power
          : 0
        const power_offset = ((this.props.width - this.state.offset_x) * all_previous_releative_powers) - this.state.padding_right
        const x = ((this.props.width - this.state.offset_x) * relative_power) + power_offset
        const y = i * this.state.step_distance

        lines = lines.map((line) => {
          if (line.polity.id === polity.id) {
            line.points = [...line.points, x, y]
          }
          return line
        })
      })
    })

    return (
      <Group>
        {
          this.props.polities.map((p, i) => {
            return (
              <Group>
                <Text
                  x={20}
                  y={100 + (i * 50)}
                  text={p.name}
                  fill={p.color}
                  fontSize={20}
                  />
                <Text
                  x={20}
                  y={120 + (i * 50)}
                  text={Math.round(Cycling.getPower(p, this.props.polities) * 100) / 100}
                  fill={p.color}
                  fontSize={20}
                />
              </Group>
            )
          })
        }
        <Group x={this.state.offset_x} y={this.state.offset_y}>
          {
            lines.map((line, k) => {
              let extra_points = [];
                this.props.history.forEach((step, l) => {
                  if (l === this.props.history.length - 1) {
                    extra_points = extra_points.concat([0, l * this.state.step_distance])
                    extra_points = extra_points.concat([0, 0])
                  }
                })
              return (
                <Line
                  key={k}
                  x={0}
                  y={0}
                  points={line.points.concat(extra_points)}
                  stroke={line.polity.color}
                  tension={0}
                  strokeWidth={4}
                  closed={true}
                  fill={line.polity.color}
                />
              )
            }).reverse()
          }
          {
            this.props.history.map((step, i) => {
              return (
                <Line
                  key={i}
                  x={0}
                  y={0}
                  points={[
                    0, i * this.state.step_distance,
                    this.props.width + this.state.offset_x, i * this.state.step_distance
                  ]}
                  stroke={'black'}
                  tension={0}
                  strokeWidth={2}
                />
              )
            })
          }
        </Group>
      </Group>
    );
  }
}

export default ChartView;
