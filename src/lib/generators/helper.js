import * as Helper from '../helper'

export const composeName = (namePartLists = []) => {
  return namePartLists.map((list) => Helper.getRandomInArray(list)).join(' ')
}
  