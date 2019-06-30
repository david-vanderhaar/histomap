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
    event_text_width: 60,
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

    let chart_pos_x = this.state.offset_x;
    let chart_pos_y = this.state.offset_y;
    let chart_height = this.props.history.length * this.state.step_distance;

    if (chart_height >= (this.props.height - this.state.offset_y)) {
      chart_pos_y = (this.state.offset_y - chart_height) + (this.props.height - this.state.step_distance);
    }

    return (
      <Group>
        <Group
          draggable={true}
          dragBoundFunc={
            (pos) => {
              return {
                x: 0,
                y: Math.min(0, pos.y)
              }
            }
          }
        >
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
        </Group>
        <Group 
          x={chart_pos_x} 
          y={chart_pos_y}
          draggable={true}
          dragBoundFunc={
            (pos) => {
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
                  x={-5}
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
          {
            this.props.history.map((step, i) => {
              
              return step.polities.map((polity, j) => {
                const all_previous_percents = j > 0
                  ? step.percents.slice(0, j).reduce((acc, curr) => acc + curr.percent, 0)
                  : 0
                const percentage = step.percents.filter((per) => per.polity_id === polity.id)[0].percent
                const x_end = ((this.props.width - this.state.offset_x) * (percentage + all_previous_percents))
                const x_begin = ((this.props.width - this.state.offset_x) * (all_previous_percents))
                const polity_events = step.events.filter((e) => e.polity_id === polity.id);
                const event_log = polity_events.length > 0 ? polity_events[0].events : []
                if (percentage > 0) {
                  return (
                    <Text
                      key={j}
                      x={x_begin + ((x_end - x_begin - (this.state.event_text_width / 2)) / 2)}
                      // x={j * (this.props.width - this.state.offset_x) / 10}
                      y={((i * this.state.step_distance))}
                      width={this.state.event_text_width}
                      // y={((i * this.state.step_distance) + (j * 20))}
                      text={event_log.length > 0 ? event_log[event_log.length - 1].message : 'none'}
                      fill={'white'}
                      fontSize={10}
                    />
                  )
                }
              })
            })
          }
        </Group>
      </Group>
    );
  }
}

export default ChartView;
