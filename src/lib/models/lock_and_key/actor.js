import uuid from 'uuid/v1';
import * as Helper from '../../helper';
import { generatePolityName } from '../../generators/names';

const TRAIT_MIN = 0;
const TRAIT_MAX = 10;

export const createActor = () => {
  const level = Helper.getRandomIntInclusive(1, 5)
  const description = mapLevelToDescription(level)
  const events = []

  const addEvent = ({event, time}) => events.push({event, time})

  return {
    id: uuid(),
    name: generatePolityName(),
    level,
    description,
    militaryPower: Helper.getRandomIntInclusive(1, 5),
    economicPower: Helper.getRandomIntInclusive(1, 5),
    events,
    addEvent,
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
