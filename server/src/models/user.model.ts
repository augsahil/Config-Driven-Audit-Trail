import { Schema, model } from 'mongoose'

const UserSchema = new Schema(
  {
    name: String,
    role: { type: String, enum: ['admin', 'reviewer'], required: true },
    credentials: String,
  },
  { timestamps: true }
)

export const User = model('User', UserSchema)
