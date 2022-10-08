import { createActor } from './actor'
import { pickEventForActor } from './event'

const logger = () => {
  const events = []

  return {
    events,
    add: (event) => events.push(event)
  }
}

const HISTORY_LOG = logger()

const run = (actors, time = 0) => {
  /*
    for NUMBER OF YEARS TO SIMULATE
      for each entity
        choose available event for this entity
          modify entity stats and/or level
          gain/remove traits
        add event description to history
  */
  const newActors = actors.map((actor) => {
    const event = pickEventForActor(actor)
    const newActor = event.happenTo(actor)
    newActor.addEvent({event: event.name, time})
    return newActor
  })

  HISTORY_LOG.add({ time, actors: newActors })
  return newActors
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

const generateActors = ({ amountToCreate = 3 }) => {
  return Array(amountToCreate)
    .fill()
    .map(() => createActor())
}

export default {
  run,
  runFor,
  generateActors,
  getHistory: () => HISTORY_LOG.events
}
