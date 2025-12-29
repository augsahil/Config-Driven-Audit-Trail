import { Schema, model } from 'mongoose'

const BookSchema = new Schema(
  {
    title: String,
    authors: String,
    publishedBy: String,
    createdBy: String,
    updatedBy: String,
  },
  { timestamps: true }
)

export const Book = model('Book', BookSchema)
