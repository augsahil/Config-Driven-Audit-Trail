import { Book } from '../models/book.model'
import { createAudit } from './audit.service'
import { z } from 'zod'

const bookSchema = z.object({
  title: z.string().min(1),
  authors: z.string().min(1),
  publishedBy: z.string().min(1),
})

export const createBook = async (data: any, userId: string) => {
  const validated = bookSchema.parse(data)
  const book = await Book.create({ ...validated, createdBy: userId })
  await createAudit({
    entity: 'Book',
    entityId: book.id,
    action: 'create',
    after: book.toObject(),
  })
  return book
}

export const updateBook = async (
  id: string,
  data: any,
  userId: string
) => {
  const validated = bookSchema.partial().parse(data)
  const before = await Book.findById(id)
  const after = await Book.findByIdAndUpdate(
    id,
    { ...validated, updatedBy: userId },
    { new: true }
  )
  await createAudit({
    entity: 'Book',
    entityId: id,
    action: 'update',
    before,
    after,
  })
  return after
}

export const deleteBook = async (id: string, userId: string) => {
  const before = await Book.findById(id)
  await Book.findByIdAndDelete(id)
  await createAudit({
    entity: 'Book',
    entityId: id,
    action: 'delete',
    before,
  })
}
