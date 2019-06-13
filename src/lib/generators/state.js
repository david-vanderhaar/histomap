import uuid from 'uuid/v1';
import * as Helper from '../helper';


const TRAIT_MIN = 0;
const TRAIT_MAX = 10;

export function createEntity() {
  let entity = {
    id: uuid(),
    name: composeName([namePrefixes, nameSuffixes]),
    level: Helper.getRandomIntInclusive(1, 5),
    militaryPower: Helper.getRandomIntInclusive(1, 5),
    economicPower: Helper.getRandomIntInclusive(1, 5),
  }
  return entity;
}

const namePrefixes = [
  'Moon',
  'Sun',
  'Black',
  'White',
  'Light',
  'Shadow',
  'Red',
  'Green',
  'Gray',
  'Mighty',
  'Wither',
  'Gale',
  'Hay',
  'Stone',
  'River',
]

const nameSuffixes = [
  'Fire',
  'Water',
  'Belly',
  'Peaks',
  'Born',
  'Still',
  'Wood',
  'Wine',
  'Run',
  'Guard',
  'Fell',
  'Fall',
]

const composeName = (namePartLists = []) => {
  return namePartLists.map((list) => Helper.getRandomInArray(list)).join(' ')
}
