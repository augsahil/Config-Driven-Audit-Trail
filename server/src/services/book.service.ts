import { Book } from '../models/book.model'
import { createAudit } from './audit.service'

export const createBook = async (data: any, userId: string) => {
  const book = await Book.create({ ...data, createdBy: userId })
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
  const before = await Book.findById(id)
  const after = await Book.findByIdAndUpdate(
    id,
    { ...data, updatedBy: userId },
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
