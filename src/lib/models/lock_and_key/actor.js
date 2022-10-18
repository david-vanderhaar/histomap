import Konva from 'konva';
import uuid from 'uuid/v1';
import * as Helper from '../../helper';
import { generatePolityName } from '../../generators/names';

const TRAIT_MIN = 0;
const TRAIT_MAX = 10;

export const createActor = () => {
  const level = Helper.getRandomIntInclusive(1, 5)
  const description = mapLevelToDescription(level)
  const events = []

  const addEvent = (event) => events.push(event)

  return {
    id: uuid(),
    name: generatePolityName(),
    level,
    description,
    militaryPower: Helper.getRandomIntInclusive(1, 5),
    economicPower: Helper.getRandomIntInclusive(1, 5),
    events,
    addEvent,
    color: getNextColor()
  }
}

const mapLevelToDescription = (level) => levelDescriptions[level]

const levelDescriptions = {
  1: 'small tribe',
  2: 'large tribe',
  3: 'city-state',
  4: 'kingdom (several cities)',
  5: 'Empire (several kingdoms)',
}

const COLORS = {
  background: '#eadcbd',
  entity: [
    '#de6640',
    '#e39d96',
    '#e8c4ac',
    '#ebd66b',
    '#638c5f',
    '#869f9b',
    '#cac9b4',
  ],
}

let CURRENT_COLOR_INDEX = 0
const getNextColor = () => {
  const color = COLORS.entity[CURRENT_COLOR_INDEX % COLORS.entity.length]
  CURRENT_COLOR_INDEX += 1
  return color
}
