import React from 'react';
import '../App.css';
import * as Cycling from '../lib/turchin_cycling';
import { Stage, Layer, Circle, Text, Line, Group } from 'react-konva';

class ChartView extends React.Component {
  state = {
    // step_distance: 30,
    step_distance: 100,
    entity_distance: 40,
    offset_x: 160,
    offset_y: 25,
    previous_polity_power: 0,
    padding_right: 20,
  }

  render() {
    let lines = this.props.all_historical_polities.map((p) => {
      return {
        polity: p,
        points: [],
      }
    });

    this.props.history.map((step, i) => {
      step.polities.map((polity, j) => {
        const all_previous_percents = j > 0
          ? step.percents.slice(0, j).reduce((acc, curr) => acc + curr.percent, 0)
          : 0
        const percentage = step.percents.filter((per) => per.polity_id === polity.id)[0].percent
        const x = ((this.props.width - this.state.offset_x) * (percentage + all_previous_percents))
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
        <Group 
          x={this.state.offset_x} 
          // y={this.state.offset_y}
          y={this.state.offset_y - (this.props.history.length * 100 >= (this.props.height - this.state.offset_y) ? this.props.history.length * 100 : 0) + this.props.height - 100}
          draggable={true}
          dragBoundFunc={
            (pos) => {
              // console.log(pos.y);
              
              return {
                x: this.state.offset_x,
                y: Math.min(this.state.offset_y, pos.y)
              }
            }
          }

        >
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
                  // bezier={true}
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
                  strokeWidth={4}
                />
              )
            })
          }
          {
            // this.props.history.map((step, i) => {
              
            //   return step.polities.map((polity, j) => {
            //     console.log(polity.events);
            //     return (
            //       <Text
            //         x={j * (this.props.width - this.state.offset_x) / 10}
            //         // y={((i * this.state.step_distance))}
            //         y={((i * this.state.step_distance) + (j * 20))}
            //         text={polity.events.length > 0 ? polity.events[polity.events.length - 1].message : 'none'}
            //         fill={'white'}
            //         fontSize={10}
            //       />
            //     )
            //   })
            // })
          }
        </Group>
      </Group>
    );
  }
}

export default ChartView;
