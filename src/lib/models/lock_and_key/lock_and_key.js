import * as Actor from './actor'
import * as Event from './event'

const logger = () => {
  const events = []

  return {
    events,
    add: (event) => events.push(event)
  }
}

const HISTORY_LOG = logger()

const run = (actors, time = 0) => {
  const worldState = getWorldState(actors)
  /*
    for NUMBER OF YEARS TO SIMULATE
      for each entity
        choose available event for this entity
          modify entity stats and/or level
          gain/remove traits
        add event description to history
  */
  const newActors = actors.map((actor) => {
    const event = Event.pickEventForActor(actor)
    const newActor = event.happenTo(actor)
    const description = Event.createEventDescription(event.description, actor)
    newActor.addEvent({event_type: event.name, description, time})
    return newActor
  })

  // HISTORY_LOG.add({ time, actors: newActors })
  return newActors
}

const getWorldState = (actors) => {
  return {actors}
}

const runFor = (times, actors) => {
  let newActors = [...actors]
  let time = 0
  while (time < times) {
    time += 1
    newActors = run(newActors, time)
  }

  return newActors
}

const generateActors = (amountToCreate = 3) => {
  return Array(amountToCreate)
    .fill()
    .map(() => Actor.createActor())
}

const getPowerPercentages = (actors) => {
  const total_power = getTotalPower(actors)
  return actors.map((actor) => {
    const percent = getRelativeActorPower(actor, total_power)
    return { percent, polity_id: actor.id, polity_name: actor.name }
  })
}

const getRelativeActorPower = (actor, total_power) => getActorPower(actor) / total_power
const getTotalPower = (actors) => actors.reduce((acc, curr) => acc + getActorPower(curr), 0)
const getActorPower = (actor) => (actor.economicPower + actor.militaryPower) * actor.level

const getHistory = ({actors, currentHistory}) => {
  const percents = getPowerPercentages(actors);
  const events = getEvents(actors);
  const history = currentHistory.concat({polities: actors, percents, events});

  return history
}

const getEvents = (actors) => {
  return actors.map((actor) => {
    const events = actor.events.map(
      (event) => ({
        event: {color: 'red'},
        message: event.description
      })
    )
    return {events, polity_id: actor.id}
  })
}

export default {
  run,
  runFor,
  generateActors,
  getHistory,
  getPowerPercentages,
}
