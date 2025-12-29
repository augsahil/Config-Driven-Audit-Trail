import jwt from 'jsonwebtoken'
import { User } from '../models/user.model'
import { asyncStore } from './request-context.middleware'
import { env } from '../config/env'

export const auth = async (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'Unauthorized' })

  const payload: any = jwt.verify(token, env.JWT_SECRET)
  const user = await User.findById(payload.id)
  if (!user) return res.status(401).json({ error: 'Invalid token' })

  asyncStore.getStore()?.set('userId', user.id)
  req.user = user
  next()
}
