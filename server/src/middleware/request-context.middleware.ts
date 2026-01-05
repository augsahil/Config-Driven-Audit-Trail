import { AsyncLocalStorage } from 'node:async_hooks'
import { randomUUID } from 'crypto'
import { Request, Response, NextFunction } from 'express'

export const asyncStore = new AsyncLocalStorage<Map<string, any>>()

export const requestContext = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  const store = new Map()
  const requestId = randomUUID()
  store.set('requestId', requestId)
  ;(req as any).requestId = requestId
  asyncStore.run(store, next)
}
