import LockAndKeyModel from './lock_and_key/lock_and_key'
import * as CyclingModel from './turchin_cycling/turchin_cycling'

export default {
  TURCHIN_CYCLING: {
    model: CyclingModel,
    name: 'Turchin\'s Cycling',
  },
  SIMPLE: {
    model: LockAndKeyModel,
    name: 'Simple',
  },
}