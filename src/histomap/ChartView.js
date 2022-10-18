import React from 'react';
import '../App.css';
import { Text, Line, Group } from 'react-konva';
import * as Styles from '../styles';

const getStepPercentageByPolity = (step, polity) => {
  const found_polity = step.percents.filter((per) => per.polity_id === polity.id)[0]
  return !!found_polity 
    ? found_polity.percent 
    : 0
}

class ChartView extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // step_distance: 30,
      step_distance: 100,
      entity_distance: 40,
      offset_x: props.offset_x,
      offset_y: props.offset_y,
      previous_polity_power: 0,
      padding_right: props.offset_x,
      event_text_width: 60,
    }
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
          ? step.percents
            .slice(0, j)
            .reduce((acc, curr) => acc + curr.percent, 0)
          : 0
        const percentage = getStepPercentageByPolity(step, polity)
        const x = ((this.props.width - this.state.offset_x) * (percentage + all_previous_percents))
        const y = i * this.state.step_distance

        lines = lines.map((line) => {
          if (line.polity.id === polity.id) {
            line.points = [...line.points, x, y]
          }
          return line
        })
        return true
      })
      return true
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
                  // stroke={line.polity.color}
                  stroke={Styles.themes[this.props.theme].background}
                  // stroke={'#eadcbd'}
                  // stroke={'#282C34'}
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
                <Group key={i}>
                  <Text
                    x={(this.props.side_info_width - this.state.offset_x)}
                    y={(i * this.state.step_distance) - 25}
                    width={this.props.side_info_width}
                    text={`${i * this.props.years_to_run}`}
                    fill={Styles.themes[this.props.theme].element_body}
                    fontSize={20}
                    fontStyle={'bold'}
                    align={'center'}
                  />
                  <Line
                    key={i}
                    x={0}
                    y={0}
                    points={[
                      this.props.side_info_width - this.state.offset_x, i * this.state.step_distance,
                      (this.props.width - this.state.offset_x + this.props.side_info_width), i * this.state.step_distance
                    ]}
                    stroke={Styles.themes[this.props.theme].chart_lines}
                    tension={0}
                    strokeWidth={2}
                  />
                  <Text
                    x={(this.props.width - this.state.offset_x)}
                    // x={(this.props.side_info_width - this.state.offset_x)}
                    y={(i * this.state.step_distance) - 25}
                    width={this.props.side_info_width}
                    text={`${i * this.props.years_to_run}`}
                    fill={Styles.themes[this.props.theme].element_body}
                    fontSize={20}
                    fontStyle={'bold'}
                    align={'center'}
                  />
                </Group>
              )
            })
          }
          {
            this.props.history.map((step, i) => {
              
              return step.polities.map((polity, j) => {
                const all_previous_percents = j > 0
                  ? step.percents.slice(0, j).reduce((acc, curr) => acc + curr.percent, 0)
                  : 0
                const percentage = getStepPercentageByPolity(step, polity)
                const x_end = ((this.props.width - this.state.offset_x) * (percentage + all_previous_percents))
                const x_begin = ((this.props.width - this.state.offset_x) * (all_previous_percents))
                const x = x_begin + ((x_end - x_begin - (this.state.event_text_width / 2)) / 2);
                const text_padding = 16;
                const polity_events = step.events.filter((e) => e.polity_id === polity.id);
                const event_log = polity_events.length > 0 ? polity_events[0].events : []
                if (percentage > 0.08) {
                  return (
                    <Group key={j}>
                      <Text
                        x={x_begin + text_padding}
                        // x={x}
                        y={((i * this.state.step_distance) - (this.state.step_distance / 2))}
                        // y={((i * this.state.step_distance))}
                        width={x_end - x_begin - text_padding}
                        // width={this.state.event_text_width + 10}
                        text={
                          `${polity.name.toUpperCase()}\n${event_log.length > 0 ? event_log[event_log.length - 1].message : 'none'}`
                        }
                        // fill={'black'}
                        fill={Styles.themes['light'].element_body}
                        fontSize={12}
                        fontStyle={'bold'}
                        align={'center'}
                      />
                    </Group>
                  )
                }
              })
            })
          }
        </Group>
        {/* <Rect
          x={this.props.side_info_width}
          y={0}
          width={this.props.width}
          height={this.props.height}
          stroke={Styles.themes[this.props.theme].element_body}
          strokeWidth={4}
        // fill={Styles.themes[this.props.theme].element_body}
        // onClick={() => this.step()}
        /> */}
      </Group>
    );
  }
}

export default ChartView;
