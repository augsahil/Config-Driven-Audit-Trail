import { Router } from 'express'
import jwt from 'jsonwebtoken'
import { User } from '../models/user.model'
import { env } from '../config/env'

const router = Router()

// LOGIN
router.post('/login', async (req, res) => {
  const { name, credentials } = req.body

  const user = await User.findOne({ name, credentials })
  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' })
  }

  const token = jwt.sign(
    { id: user._id },
    env.JWT_SECRET,
    { expiresIn: '1d' }
  )

  res.json({
    token,
    user: {
      id: user._id,
      name: user.name,
      role: user.role,
    },
  })
})

export default router
