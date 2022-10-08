import * as Helper from '../../helper';
import eventJson from './events.json'

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

const createChangeStatByEffect = (stat) => (changeBy) => (actor) => actor[stat] += changeBy
const ifStatEquals = (stat) => (value) => (actor) => actor[stat] === value

const effectTypes = {
  changeStatBy: ({stat, value}) => createChangeStatByEffect(stat)(value)
}

const effectCondtionTypes = {
  statEquals: ({stat, value}) => ifStatEquals(stat)(value)
}

const createEffect = ({type, ...data}) => effectTypes[type](data)
const createEffectCondition = ({type, ...data}) => effectCondtionTypes[type](data)
const allConditionsTrue = (conditions) => conditions.every(Boolean)

const processEffects = (effects, actor) => {
  const newActor = {...actor}

  effects.forEach((effect) => {
    const conditions = effect?.conditions || []
    const conditionResults = conditions
      .map((condition) => createEffectCondition(condition)(actor))

    if (allConditionsTrue(conditionResults)) createEffect(effect)(newActor)
  })

  return newActor
}

const createEvent = ({
  name,
  availableToLevels = [], // empty means it's available to all
  gainedTraits = [],
  lostTraits = [],
  effects = [],
  description = 'event happened',
  weight = 1, // chance that this will be picked (based on level, traits and stats)
}) => {
  return ({
    name,
    availableToLevels,
    gainedTraits,
    lostTraits,
    effects,
    description,
    weight,
    happenTo: (actor) => processEffects(effects, actor)
  })
}

export const events = eventJson.map((event) => createEvent(event))

const filterByActorLevel = (actor) => (event) => event.availableToLevels.includes(actor.level)

export const pickEventForActor = (actor) => Helper.getRandomInArray(events.filter(filterByActorLevel(actor)))
