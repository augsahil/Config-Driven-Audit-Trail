import { Request, Response, NextFunction } from 'express'
import User from '../models/user.model'
import { asyncStore } from './request-context.middleware'

export interface AuthRequest extends Request {
  user?: any
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const apiKey = req.headers['x-api-key'] as string

  if (!apiKey) {
    return res.status(401).json({ error: 'API key missing' })
  }

  const user = await User.findOne({ apiKey })

  if (!user) {
    return res.status(401).json({ error: 'Invalid API key' })
  }

  req.user = user
  const store = asyncStore.getStore()
  if (store) {
    store.set('userId', user.id)
  }
  next()
}
