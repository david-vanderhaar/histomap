# Lock + Key

## ENTITY
- level
1 - small tribe
2 - large tribe
3 - city-state
4 - kingdom (several cities)
5 - Empire (several kingdoms)

- stats (qualitative)
  - government type (democratic, republic, feudal, nomadic)
  - military power (1 thru 5 * level)
  - economic power (1 thru 5 * level)

- traits

- history (array of events)

## EVENT
- entity levels available (which entity levels this event can be triggered by)
- stat effects/ entity level change
- traits gained
- traits removed
- description
- percent chance of happening 

// run() {
  // Loop
  /*
    for NUMBER OF YEARS TO SIMULATE
      for each entity
        choose available event for this entity
          modify entity stats and/or level
          gain/remove traits
        add event description to history
  */
// }