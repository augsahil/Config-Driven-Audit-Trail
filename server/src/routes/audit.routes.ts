import { Router } from 'express'
import { authMiddleware as auth } from '../middleware/auth.middleware'
import { adminOnly } from '../middleware/rbac.middleware'
import { AuditLog } from '../models/audit.model'

const router = Router()

router.get('/', auth, adminOnly, async (req, res) => {
  const { limit = 20, cursor, from, to, entity, entityId, actorId, action, fieldsChanged, requestId } = req.query
  const query: any = {}
  if (from || to) {
    query.timestamp = {}
    if (from) query.timestamp.$gte = new Date(from as string)
    if (to) query.timestamp.$lte = new Date(to as string)
  }
  if (entity) query.entity = entity
  if (entityId) query.entityId = entityId
  if (actorId) query.actorId = actorId
  if (action) query.action = action
  if (requestId) query.requestId = requestId
  if (fieldsChanged) {
    const fields = (fieldsChanged as string).split(',')
    query['diff.changedFields'] = { $in: fields }
  }

  const limitNum = Number(limit)
  const cursorQuery = cursor ? { _id: { $gt: cursor } } : {}
  const audits = await AuditLog.find({ ...query, ...cursorQuery })
    .sort({ timestamp: -1 })
    .limit(limitNum + 1)
  const hasNext = audits.length > limitNum
  const items = hasNext ? audits.slice(0, -1) : audits
  const nextCursor = hasNext ? items[items.length - 1]._id : null
  res.json({ items, nextCursor })
})

router.get('/:id', auth, adminOnly, async (req, res) => {
  const audit = await AuditLog.findById(req.params.id)
  res.json(audit)
})

export default router
