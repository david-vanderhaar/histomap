import * as GeneratorHelper from './helper'
export const generatePlaceName = () => GeneratorHelper.composeName([prepositions, namePrefixes, nameSuffixes])

const namePrefixes = [
  'Bear',
  'Crossroads',
  'Deepwood',
  'Dread',
  'Eyrie',
  'Iron',
  'Oldstones',
  'Raventree',
  'Riverlands',
  'Ruby',
  'Saltpans',
  'Seagard',
  'Torrhen\'s',
  'Trident',
  'Twins',
  'Arryn',
  'Whispering',
  'White',
]

const nameSuffixes = [
  'Island',
  'Islands',
  'Inn',
  'Motte',
  'Watch',
  'Moat',
  'Fort',
  'Hall',
  'Ford',
  'Square',
  'Wood',
  'Harbor',
]

const prepositions = [
  'The',
  'Vale of',
  '',
  '',
  '',
  '',
]
