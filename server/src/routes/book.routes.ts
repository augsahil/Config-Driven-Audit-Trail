import { Router } from 'express'
import { authMiddleware as auth } from '../middleware/auth.middleware'
import { createBook, updateBook, deleteBook } from '../services/book.service'
import { Book } from '../models/book.model'

const router = Router()

router.get('/', async (req, res) => {
  const limit = Number(req.query.limit) || 10
  const cursor = req.query.cursor as string
  const query = cursor ? { _id: { $gt: cursor } } : {}
  const books = await Book.find(query).limit(limit + 1)
  const hasNext = books.length > limit
  const items = hasNext ? books.slice(0, -1) : books
  const nextCursor = hasNext ? items[items.length - 1]._id : null
  res.json({ items, nextCursor })
})

router.get('/:id', async (req, res) => {
  const book = await Book.findById(req.params.id)
  res.json(book)
})

router.post('/', auth, async (req: any, res) => {
  const book = await createBook(req.body, req.user.id)
  res.status(201).json(book)
})

router.patch('/:id', auth, async (req: any, res) => {
  const book = await updateBook(req.params.id, req.body, req.user.id)
  res.json(book)
})

router.delete('/:id', auth, async (req: any, res) => {
  await deleteBook(req.params.id, req.user.id)
  res.json({ ok: true })
})

export default router
