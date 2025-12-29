import pino from 'pino'
import { asyncStore } from '../middleware/request-context.middleware'

export const logger = pino({
  transport: {
    target: 'pino/file',
    options: { destination: './logs/app.log' },
  },
  base: undefined,
  mixin() {
    const store = asyncStore.getStore()
    return {
      requestId: store?.get('requestId'),
      userId: store?.get('userId'),
    }
  },
})
