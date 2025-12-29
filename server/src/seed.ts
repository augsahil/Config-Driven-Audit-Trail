import { connectDB } from './db/mongoose'
import { User } from './models/user.model'

connectDB().then(async () => {
  await User.deleteMany()
  await User.create([
    { name: 'Admin', role: 'admin', credentials: 'admin123' },
    { name: 'Reviewer', role: 'reviewer', credentials: 'reviewer123' },
  ])
  console.log('Seeded users')
  process.exit(0)
})
