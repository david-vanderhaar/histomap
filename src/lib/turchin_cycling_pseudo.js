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
      OBJECTS
----------------------
Polity
  - id
  - baseline_resorce_level = 1 + (randomInt(-1, 1) * RESOURCE_BASELINE_DEVIATION)
  - resource_level = baseline_resource_level
  - chief = null or id
  - coordinates = {
      x: randomInt(-gridSize, gridSize), 
      y: randomInt(-gridSize, gridSize)
    }

----------------------
      PSEUDO
----------------------
1.
Set TRIBUTE_LEVEL to a constant float between 0 and 1
Set LOSER_EFFECT to a constant float between 0 and 1
Set L to a constant integer
Set RESOURCE_BASELINE_DEVIATION to constant float between 0 and 1
Set MILITARY_DETERMINISM to constant integer between 1 and 2
Set WILLINGNESS_TO_ATTACK constant integer > 0
Set RESOURCE_RECOVERY_TIME to constant integer > 0
Set time_step to 0
Generate N # of single-node polities

2.
For each chief polity
  neighbor_polity = findWeakestNeighbor(polity)
  if willGoToWar(polity, neighbor_polity)
    goToWar(polity, neighbor_polity)
  else
    havePeace()
  
  for each subordinate
    if willSecede()
      secede()
    else
      havePeace()
*/
/*
----------------------
      Functions
----------------------
const willGoToWar = (polity, neighbor) => {
  const P = probabilityOfSuccessfulAttack(polity, neighbor);
  const c = costOfSuccessfulAttack(P);
  return Math.random() >= probabilityPolityWillAttack(polity, P, c);
}

const willSecede = (chief, subordinate) => {
  const probability_to_repel_attack = 1 - probabilityOfSuccessfulAttack(chief, subordinate)
  return Math.random() >= probability_to_repel_attack;
}

const secede = (chief, subordinate) => {
  let probability_of_successful_attack = probabilityOfSuccessfulAttack(chief, subordinate)
  probability_to_repel_attack = 1 - probability_of_successful_attack
  const rebellion_succeeds = attackRepelled(probability_to_repel_attack)
  if (rebellion_succeeds) {
    chief.resource_level -= costOfUnsuccessfulAttack(probability_of_successful_attack)
    defender.resource_level -= costOfUnsuccessfulAttack(probability_of_successful_attack)
    chief = reorganizeInternalPolities(chief)
  } else {
    chief.resource_level -= costOfSuccessfulAttack(probability_of_successful_attack)
    defender.resource_level -= costOfSuccessfulAttack(probability_of_successful_attack)
  }
}

const havePeace = (polity) => {
  polity.resource_level += Math.sign(polity.baseline_resource_level - polity.resource_level) * (polity.baseline_resource_level / RESOURCE_RECOVERY_TIME)
}

const goToWar = (attacker, defender, probability_to_repel_attack = null) = > {
  let target_community = findWealthiestBorderCommunity(defender);
  let probability_of_successful_attack = probabilityOfSuccessfulAttack(attacker, defender)
  if (probability_to_repel_attack === null) {
    probability_to_repel_attack = 1 - probability_of_successful_attack
  }
  const attack_succeeds = !attackRepelled(probability_to_repel_attack)
  if (attack_succeeds) {
    attacker.resource_level -= costOfSuccessfulAttack(probability_of_successful_attack)
    defender.resource_level -= costOfSuccessfulAttack(probability_of_successful_attack)
    attacker = reorganizeInternalPolities(attacker)
    probability_to_repel_next_attack -= ((1 - LOSER_EFFECT) * probability_to_repel_attack)
    if (defender.chief) {
      goToWar(attacker, defender.chief, probability_to_repel_next_attack)
    }
  } else {
    attacker.resource_level -= costOfUnsuccessfulAttack(probability_of_successful_attack)
    defender.resource_level -= costOfUnsuccessfulAttack(probability_of_successful_attack)
  }
}

const attackRepelled = (probability_to_repel_attack) => {
  return Math.random() >= probability_to_repel_attack
}

const probabilityOfSuccessfulAttack = (polity, neighbor) => {
  return Math.pow(getPower(polity), MILITARY_DETERMINISM) / (Math.pow(getPower(polity), MILITARY_DETERMINISM) + Math.pow(getPower(neighbor), MILITARY_DETERMINISM));
}

const probabilityPolityWillAttack = (polity, probability_of_successful_attack, cost_of_successful_attack) => {
  probability_of_successful_attack * Math.pow(-WILLINGNESS_TO_ATTACK * cost_of_successful_attack) * (polity.resource_level / polity.baseline_resorce_level)
}

const costOfSuccessfulAttack = (probability_of_successful_attack) => {
  return RESOURCE_BASELINE_DEVIATION * (1 - probability_of_successful_attack);
}

const costOfUnsuccessfulAttack = (probability_of_successful_attack) => {
  return RESOURCE_BASELINE_DEVIATION * probability_of_successful_attack;
}

const getPower = (polity) => {
  return (
    polity.subordinates.reduce(
      (acc, curr) => acc + curr.resource_level * TRIBUTE_LEVEL,
      polity.resource_level
    )
  )
}

*/
