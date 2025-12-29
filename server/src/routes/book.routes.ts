import { Router } from 'express'
import { auth } from '../middleware/auth.middleware'
import { createBook, updateBook } from '../services/book.service'
import { Book } from '../models/book.model'

const router = Router()

router.get('/', async (_req, res) => {
  const books = await Book.find()
  res.json(books)
})

router.post('/', auth, async (req: any, res) => {
  const book = await createBook(req.body, req.user.id)
  res.status(201).json(book)
})

router.patch('/:id', auth, async (req: any, res) => {
  const book = await updateBook(req.params.id, req.body, req.user.id)
  res.json(book)
})

router.delete('/:id', auth, async (req, res) => {
  await Book.findByIdAndDelete(req.params.id)
  res.json({ ok: true })
})

export default router
