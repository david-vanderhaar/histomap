import { getRandomIntInclusive, getRandomInArray } from "./helper";
import uuid from 'uuid/v1';
import { delay } from "q";

/*
----------------------
      VARIABLES
----------------------
Major model parameters and statistics
S = System edge size
MILITARY_DETERMINISM = Scaling exponent (of the polity power to the probability of a win)
RESOURCE_BASELINE_DEVIATION = Standard deviation of the baseline resource level
TRIBUTE_LEVEL = Tribute level
WILLINGNESS_TO_ATTACK = a variable > 0
L = Span of control (the maximum number of subordinate polities)
τ = The expected time in power of the paramount chief
max_s = Relative size of the largest polity
c = Mean complexity
max_c = Maximum complexity
ρ = Average centrality (i.e. the ratio of the power of the chief village and the one immediately below)

Custom model parameters
N = initial number of polities to create
C = max number of connection to other nodes
Y = number of time steps to run
time_step = current step in time

----------------------
      TODO's
----------------------
There is a chance t every time_step that the paramount chief dies, 
resulting in peacful annexation of a random set of subordinate polities

if a polity has been warred against or seceded from, they can not be a target for war until the next year.
when polities secede, they should acquire a portion of the resources of the chief polity (MAYBE)

DONE - find neighbors to attack should target any polities with range of current chief and any of their subordinates

DONE - BUG - nest goToWar function uses undefined target

*/

const TRIBUTE_LEVEL = 0.5 // Math.random();
const LOSER_EFFECT = 0.2 // Math.random();
const L = 4;
const RESOURCE_BASELINE_DEVIATION = 0.3 //Math.random();
const MILITARY_DETERMINISM = 1 //getRandomIntInclusive(1, 2);
const WILLINGNESS_TO_ATTACK = 2
const RESOURCE_RECOVERY_TIME =  3 //getRandomIntInclusive(5, 15);
const GRID_SIZE = 100
const NEIGHBOR_DISTANCE = GRID_SIZE
// const NEIGHBOR_DISTANCE = GRID_SIZE / 5

export const run = async (polities, steps_to_run, step_interval = 0) => {
  for (let i = 0; i < steps_to_run; i++) {
    console.log(`%cTIME_STEP: ${i}`, "color: yellow; font-style: italic; background-color: blue;padding: 2px");
    polities
    .filter((polity) => polity.chief === null)
    .map((polity) => makeDecision(polity, polities));
    await delay(step_interval);
  }
  
  return polities;  
}

export const generatePolities = (amount) => {
  let polities = [];
  for (let i = 0; i < amount; i++) {
    polities.push(createPolity());
  }
  return polities;
}

const makeDecision = (polity, all_polities) => {
  if (polity.chief === null) {
    console.log('DECISION: ', `The chief polity ${polity.name} deliberates`)
    let victim = findWeakestNeighborPolity(polity, all_polities)
    if (victim && willGoToWar(polity, victim, all_polities)) {
      goToWar(polity, victim, null, all_polities)
    } else {
      havePeace(polity, all_polities);
    }
    getSubordinates(polity, all_polities).map((subordinate) => {
      console.log('DECISION: ', `${polity.name}'s subordinate polity ${subordinate.name} deliberates`)
      if (willSecede(polity, subordinate, all_polities)) {
        attemptRebellion(polity, subordinate, all_polities);
      } else {
        havePeace(subordinate, all_polities);
      }
    });
  }

  return polity;
}

const findWeakestNeighborPolity = (polity, all_polities) => {
  let comms = getNeighborCommunities(polity, all_polities)
  // console.log(comms);
  
  const neighbor_chiefs = 
    comms
    .map((p) => getChiefPolity(p, all_polities))
    .sort((a, b) => getPower(a, all_polities) - getPower(b, all_polities))
  
  // console.log(neighbor_chiefs);
  return neighbor_chiefs.length > 0 ? neighbor_chiefs[0] : false;
}

const isInRange = (a, b) => {
  return (
    NEIGHBOR_DISTANCE >= Math.hypot(
      b.coordinates.x - a.coordinates.x,
      b.coordinates.y - a.coordinates.y
    )
  )
}

const getNeighborCommunities = (polity, all_polities) => {
  let polity_or_subordinate_is_in_range = [
    polity, 
    ...getSubordinates(polity, all_polities)
  ].reduce((acc, curr) => acc + isInRange(polity, curr), 
    0
  )
  return all_polities.filter((p) => {
    return (
      polity_or_subordinate_is_in_range
      && p.chief !== polity.id
      && p.id !== polity.id
    );
  });
}

const findWealthiestBorderCommunity = (attacker, defender, all_polities) => {
  // need to account for adjacency
  let neighbor_communities = []

  if (getSubordinates(defender, all_polities).length > 0) {
    neighbor_communities =
      getNeighborCommunities(attacker, all_polities)
      .filter((p) => p.chief === defender.id)
      .sort((a, b) => getPower(b, all_polities) - getPower(a, all_polities))
  } else {
    // neighbor_communities = [defender]
    neighbor_communities =
      getNeighborCommunities(attacker, all_polities)
      .filter((p) => p.id === defender.id)
  }

  return neighbor_communities.length > 0 ? neighbor_communities[0] : false;
}

const reorganizeInternalPolities = (polity) => {
  // TODO
  return polity;
}

const annexTarget = (chief, target, all_polities) => {
  console.log('ANNEX: ', `${target.name} is annexed by ${chief.name}.`);
  
  all_polities.forEach(p => {
    if (p.id === target.id) {
      p.chief = chief.id
    }
  });
}

const secede = (polity, all_polities) => {
  all_polities.forEach(p => {
    if (p.id === polity.id) {
      p.chief = null;
    }
  });
}

const willGoToWar = (polity, neighbor, all_polities) => {
  const P = probabilityOfSuccessfulAttack(polity, neighbor, all_polities);
  const c = costOfSuccessfulAttack(P);
  return Math.random() <= probabilityPolityWillAttack(polity, P, c);
}

const willSecede = (chief, subordinate, all_polities) => {
  // console.log(subordinate);
  const probability_to_repel_attack = 1 - probabilityOfSuccessfulAttack(chief, subordinate, all_polities)
  return Math.random() <= probability_to_repel_attack;
}

const attemptRebellion = (chief, subordinate, all_polities) => {
  console.log('REBELLION: ', `${subordinate.name} attempts rebellion against ${chief.name}.`);
  let probability_of_successful_attack = probabilityOfSuccessfulAttack(chief, subordinate, all_polities)
  let probability_to_repel_attack = 1 - probability_of_successful_attack
  const rebellion_succeeds = attackRepelled(probability_to_repel_attack)
  if (rebellion_succeeds) {
    console.log('REBELLION: ', `${subordinate.name} succeeds.`);
    decreaseResourceBy(
      costOfUnsuccessfulAttack(probability_of_successful_attack),
      [
        chief.id, 
        subordinate.id
      ],
      all_polities
    )
    secede(subordinate, all_polities);
    reorganizeInternalPolities(chief)
  } else {
    console.log('REBELLION: ', `${subordinate.name} fails.`);
    decreaseResourceBy(
      costOfSuccessfulAttack(probability_of_successful_attack),
      [
        chief.id, 
        subordinate.id
      ],
      all_polities
    )
  }
}

const havePeace = (polity, all_polities) => {
  console.log('PEACE: ', `${polity.name} has peace.`);
  increaseResourceBy(
    Math.sign(polity.baseline_resource_level - polity.resource_level) * (polity.baseline_resource_level / RESOURCE_RECOVERY_TIME),
    [polity.id],
    all_polities
  )
}

const goToWar = (attacker, defender, probability_to_repel_attack = null, all_polities) => {
  let target_community = findWealthiestBorderCommunity(attacker, defender, all_polities);
  console.log('WAR: ', `${attacker.name} prepares for war against ${defender.name}`);
  
  let probability_of_successful_attack = probabilityOfSuccessfulAttack(attacker, target_community, all_polities)
  if(probability_to_repel_attack === null) {
    probability_to_repel_attack = 1 - probability_of_successful_attack
  }
  const attack_succeeds = !attackRepelled(probability_to_repel_attack)
  if (attack_succeeds) {
    console.log('WAR: ', `${attacker.name} succeeds in battle against ${target_community.name}`);
    decreaseResourceBy(
      costOfSuccessfulAttack(probability_of_successful_attack), 
      [
        attacker.id,
        // defender.id,
        target_community.id,
      ], 
      all_polities
    )
    annexTarget(attacker, target_community, all_polities)
    reorganizeInternalPolities(attacker)
    probability_to_repel_attack -= ((1 - LOSER_EFFECT) * probability_to_repel_attack)
    if (defender.chief !== attacker.id) {
      console.log('WAR: ', `${attacker.name}'s onslaught continues against ${defender.name}`);
      goToWar(attacker, defender, probability_to_repel_attack, all_polities)
    }
  } else {
    console.log('WAR: ', `${attacker.name} fails in battle against ${target_community.name}`);
    decreaseResourceBy(
      costOfUnsuccessfulAttack(probability_of_successful_attack),
      [
        attacker.id, 
        // defender.id,
        target_community.id,
      ],
      all_polities
    )
  }
}

const attackRepelled = (probability_to_repel_attack) => {
  return Math.random() <= probability_to_repel_attack
}

const probabilityOfSuccessfulAttack = (polity, neighbor, all_polities) => {
  const p1 = Math.pow(getPower(polity, all_polities), MILITARY_DETERMINISM)
  const p2 = Math.pow(getPower(neighbor, all_polities), MILITARY_DETERMINISM)
  const res = p1 / (p1 + p2) 
  return res;
}

const probabilityPolityWillAttack = (polity, probability_of_successful_attack, cost_of_successful_attack) => {
  let result = probability_of_successful_attack * Math.exp((-1 * WILLINGNESS_TO_ATTACK) * cost_of_successful_attack) * (polity.resource_level / polity.baseline_resource_level)
  return result;
}

const costOfSuccessfulAttack = (probability_of_successful_attack) => {
  return RESOURCE_BASELINE_DEVIATION * (1 - probability_of_successful_attack);
}

const costOfUnsuccessfulAttack = (probability_of_successful_attack) => {
  return RESOURCE_BASELINE_DEVIATION * probability_of_successful_attack;
}

const decreaseResourceBy = (value, ids, all_polities) => {
  all_polities.forEach(p => {
    if (ids.indexOf(p.id) > -1) {
      p.resource_level = Math.max(0, p.resource_level - value)
    }
  });
}

const increaseResourceBy = (value, ids, all_polities) => {
  all_polities.forEach(p => {
    if (ids.indexOf(p.id) > -1) {
      p.resource_level += value
    }
  });
}

export const getPower = (polity, all_polities) => {
  const subordinates = getSubordinates(polity, all_polities)
  let res = subordinates.reduce(
      (acc, curr) => {
        return acc + (curr.resource_level * TRIBUTE_LEVEL)
      },
      0
    )
  return res + polity.resource_level
}

export const getSubordinates = (polity, all_polities) => {
  return all_polities.filter((p) => (p.id !== polity.id) && (getChiefPolity(p, all_polities).id === polity.id));
}

const getChiefPolity = (polity, all_polities) => {
  let chief_polity = false;
  let result = [];
  
  if (polity.chief !== null) {
    result = all_polities.filter((p) => {
      return (p.id === polity.chief)
    });
  }


  if (result.length > 0) {
    chief_polity = result[0];
  }
    
  if (chief_polity) {
    return getChiefPolity(chief_polity, all_polities);
  } else {
    return polity;
  }

}

export function createPolity() {
  const baseline_resource_level = 1 + (getRandomIntInclusive(-1, 1) * RESOURCE_BASELINE_DEVIATION)

  let polity = {
    id: uuid(),
    name: composeName([namePrefixes, nameSuffixes]),
    baseline_resource_level,
    resource_level: baseline_resource_level,
    chief: null,
    coordinates: {
      x: getRandomIntInclusive(0, GRID_SIZE),
      y: getRandomIntInclusive(0, GRID_SIZE)
    },
  }
  return polity;
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
  return namePartLists.map((list) => getRandomInArray(list)).join(' ')
}