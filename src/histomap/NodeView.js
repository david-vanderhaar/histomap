import React from 'react';
import '../App.css';
import * as Cycling from '../lib/models/turchin_cycling/turchin_cycling';
import { Rect, Text, Line, Group } from 'react-konva';

const NodeView = ({width, height, polities}) => {
  const offset_x = (width / 100) - 1
  const offset_y = (height / 100) - 1

  return (
    <Group>
      <PolityNodes
        polities={polities}
        offset_x={offset_x}
        offset_y={offset_y}
      />
    </Group>
  )
}

const PolityNodes = ({
  polities, 
  offset_x,
  offset_y
}) => {
  return (
    polities.map(
      (polity, i) => 
        <PolityNode 
          key={i} 
          polity={polity}
          polities={polities}
          offset_x={offset_x}
          offset_y={offset_y}
        />
    )
  )
}

const PolityNode = ({
  polity,
  polities,
  offset_x,
  offset_y,
}) => {
  const base_size = 10
  const size_multiplier = 20
  const chief_pos_x = polity.coordinates.x * offset_x
  const chief_pos_y = polity.coordinates.y * offset_y
  const power = Cycling.getPower(polity, polities)
  const size = (size_multiplier * power) + base_size
  const subordinates = Cycling.getImmediateSubordinates(polity, polities)
  return (
    <Group>
      <Text
        x={chief_pos_x}
        y={chief_pos_y + 40}
        text={polity.name}
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
        fill={polity.color}
        shadowBlur={5}
      />
      <SubordinateLines 
        subordinates={subordinates}
        polities={polities}
        chief_pos_x={chief_pos_x}
        chief_pos_y={chief_pos_y}
        offset_x={offset_x}
        offset_y={offset_y}
      />
    </Group>
  )
}

const SubordinateLines = ({
  subordinates,
  polities,
  chief_pos_x,
  chief_pos_y,
  offset_x,
  offset_y,
}) => {
  return (
    subordinates.map(
      (subordinate, i) => 
        <SubordinateLine 
          key={i} 
          polities={polities}
          polity={subordinate}
          chief_pos_x={chief_pos_x}
          chief_pos_y={chief_pos_y}
          offset_x={offset_x}
          offset_y={offset_y}
        />
    )
  )
}

const SubordinateLine = ({
  chief_pos_x,
  chief_pos_y,
  offset_x,
  offset_y,
  polity,
  polities,
}) => {
  return (
    <Group>
      <Line
        x={0}
        y={0}
        points={[
          chief_pos_x,
          chief_pos_y,
          polity.coordinates.x * offset_x,
          polity.coordinates.y * offset_y
        ]}
        stroke={Cycling.getChiefPolity(polity, polities).color}
        tension={1}
        strokeWidth={4}
      />
    </Group>
  )
}

export default NodeView;
