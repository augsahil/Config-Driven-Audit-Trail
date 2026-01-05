import pino from 'pino'
import { asyncStore } from '../middleware/request-context.middleware'
import { env } from './env'

const transport = env.LOG_TRANSPORT === 'elastic' 
  ? { target: 'pino-elasticsearch', options: { node: 'http://localhost:9200' } } // placeholder
  : { target: 'pino/file', options: { destination: './logs/app.log' } }

export const logger = pino({
  transport,
  base: undefined,
  mixin() {
    const store = asyncStore.getStore()
    return {
      requestId: store?.get('requestId'),
      userId: store?.get('userId'),
    }
  },
})
