import * as Helper from '../../helper';

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

export const events = [
  {
    name: 'MIGRATE',
    availableToLevels: [1, 2],
    effect: () => {},
    traitsToGain: () => {},
    traitsToRemove: () => {},
    description: (entity, places) => { 
      return `The tribal people of ${entity.name} came upon the region known as ${Helper.getRandomInArray(places)}` 
    },
    chanceToTakeEffect: () => 1,
  },
  {
    name: 'COLONIZE',
    availableToLevels: [4, 5],
    effect: (entity) => {
      entity.militaryPower += 1;
      entity.economicPower += 1;
    },
    traitsToGain: () => {},
    traitsToRemove: () => {},
    description: (entity, places) => { 
      return `${entity.name} established colonies throughout ${Helper.getRandomInArray(places)}` 
    },
    chanceToTakeEffect: () => 1,
  },
  {
    name: 'ESTABLISH_CITY',
    availableToLevels: [2, 3, 4, 5],
    effect: (entity) => {
      entity.economicPower += 1;
      if (entity.level === 2) {
        entity.level += 1;
      };
    },
    traitsToGain: () => {},
    traitsToRemove: () => {},
    description: (entity, places) => { 
      return `${entity.name} founded a city.` 
    },
    chanceToTakeEffect: () => 1,
  },
  {
    name: 'REVOLT',
    availableToLevels: [2, 3, 4, 5],
    effect: (entity) => {
      entity.militaryPower -= 2;
      entity.economicPower -= 2;
    },
    traitsToGain: () => {},
    traitsToRemove: () => {},
    description: (entity) => { 
      return `The people of ${entity.name} revolted against their leaders.` 
    },
    chanceToTakeEffect: () => 1,
  },
];
 