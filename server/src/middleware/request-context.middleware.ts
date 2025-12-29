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
  store.set('requestId', randomUUID())
  asyncStore.run(store, next)
}
