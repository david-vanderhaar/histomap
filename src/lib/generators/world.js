export const createStatesWithBorders = (states) => {
  states = [...states];
  states.map((state) => {
    state['adjacents'] = []
    return state;
  })
  return states
}

export const createAdjacents = (state, states) => {
  
  return state;
}