import { Schema, model } from 'mongoose'

const AuditSchema = new Schema({
  timestamp: { type: Date, default: Date.now },
  entity: String,
  entityId: String,
  action: String,
  actorId: String,
  diff: Object,
  requestId: String,
})

export const AuditLog = model('AuditLog', AuditSchema)
