import { connectDB } from './db/mongoose'
import User from './models/user.model'
import { Book } from './models/book.model'

connectDB().then(async () => {
  await User.deleteMany()
  await Book.deleteMany()
  await User.create([
    { name: 'Admin', role: 'admin', apiKey: 'admin123' },
    { name: 'Reviewer', role: 'reviewer', apiKey: 'reviewer123' },
  ])
  await Book.create([
    { title: 'Book 1', authors: 'Author 1', createdBy: 'admin', publishedBy: 'Publisher 1' },
    { title: 'Book 2', authors: 'Author 2', createdBy: 'reviewer', publishedBy: 'Publisher 2' },
    { title: 'Book 3', authors: 'Author 3', createdBy: 'admin', publishedBy: 'Publisher 3' },
  ])
  console.log('Seeded users and books')
  process.exit(0)
})
