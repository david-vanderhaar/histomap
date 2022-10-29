import { generatePlaceName } from '../../generators/place_names';
import * as Helper from '../../helper';
// import eventJson from './events.json'
import eventJson from './events.js'

// state CONQUERS territory
// state CONFEDERATES with state (removes existing state)
// territroy SECEDES from state (creates new state)
// state incurs CIVIL WAR (removes existing state, creates multiple new states)

// ENTITY
  // level
    // 1 - small tribe
    // 2 - large tribe
    // 3 - city-state
    // 4 - kingdom (several cities)
    // 5 - Empire (several kingdoms)
  // stats (qualitative)
    // -- government type (democratic, republic, feudal, nomadic)
    // -- military power (1 thru 5 * level)
    // -- economic power (1 thru 5 * level)
  // traits
  // history (array of events)

const createSetStatToEffect = (stat) => (setTo) => (actor) => actor[stat] = setTo
const createChangeStatByEffect = (stat) => (changeBy) => (actor) => actor[stat] = Math.max(0.1, actor[stat] + changeBy)
const createChangeStatByRandomRangeEffect = (stat) => ([min, max]) => (actor) => createChangeStatByEffect(stat)(Helper.getRandomIntInclusive(min, max))(actor)
const createRandomizeStatBetweenEffect = (stat) => ([min, max]) => (actor) => actor[stat] = Helper.getRandomIntInclusive(min, max)
const ifStatEquals = (stat) => (value) => (actor) => actor[stat] === value
const ifStatIsBetween = (stat) => ([min, max]) => (actor) => actor[stat] >= min && actor[stat] <= max

const effectTypes = {
  setStatTo: ({stat, value}) => createSetStatToEffect(stat)(value),
  changeStatBy: ({stat, value}) => createChangeStatByEffect(stat)(value),
  changeStatByRandomRange: ({stat, value}) => createChangeStatByRandomRangeEffect(stat)(value),
  randomizeStatBetween: ({stat, value}) => createRandomizeStatBetweenEffect(stat)(value),
}

const condtionTypes = {
  statEquals: ({stat, value}) => ifStatEquals(stat)(value),
  statBetween: ({stat, value}) => ifStatIsBetween(stat)(value),
}

const createEffect = ({type, ...data}) => effectTypes[type](data)
const createCondition = ({type, ...data}) => condtionTypes[type](data)
const allConditionsTrue = (conditions) => conditions.every(Boolean)

const processEffects = (effects, actor) => {
  const newActor = {...actor}

  effects.forEach((effect) => {
    const conditions = effect?.conditions || []
    const conditionResults = conditions
      .map((condition) => createCondition(condition)(actor))

    if (allConditionsTrue(conditionResults)) createEffect(effect)(newActor)
  })

  return newActor
}

const createEvent = ({
  name,
  gainedTraits = [],
  lostTraits = [],
  effects = [],
  description = 'event happened',
  weight = 1, // chance that this will be picked (based on level, traits and stats)
  conditions = [],
}) => {
  return ({
    name,
    gainedTraits,
    lostTraits,
    effects,
    description,
    weight,
    conditions,
    happenTo: (actor) => processEffects(effects, actor)
  })
}

export const createEventDescription = (description, actor) => 
  description.replace('::ACTOR::', actor.name).replace('::RANDOM_PLACE::', generatePlaceName())

export const events = eventJson.map((event) => createEvent(event))

const getConditionResults = (actor, conditions) => {
  return conditions.map((condition) => createCondition(condition)(actor)) 
}

const getAvailableEvents = (actor) => {
  return events.filter((event) => {
    const conditions = event?.conditions || []
    const conditionResults = getConditionResults(actor, conditions)
    return allConditionsTrue(conditionResults)
  })
}

export const pickEventForActor = (actor) => {
  const availableEvents = getAvailableEvents(actor)
  return Helper.getRandomInArray(availableEvents)
}
