import { authHandlers } from './auth'
import { walletHandlers } from './wallet'
import { depositHandlers } from './deposits'
import { withdrawalHandlers } from './withdrawals'
import { gameHandlers } from './games'
import { promotionHandlers } from './promotions'

export const handlers = [
  ...authHandlers,
  ...walletHandlers,
  ...depositHandlers,
  ...withdrawalHandlers,
  ...gameHandlers,
  ...promotionHandlers
]
