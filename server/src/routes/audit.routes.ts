import { Router } from 'express'
import { auth } from '../middleware/auth.middleware'
import { adminOnly } from '../middleware/rbac.middleware'
import { AuditLog } from '../models/audit.model'

const router = Router()

router.get('/', auth, adminOnly, async (req, res) => {
  const audits = await AuditLog.find(req.query)
    .sort({ timestamp: -1 })
    .limit(Number(req.query.limit || 20))
  res.json(audits)
})

router.get('/:id', auth, adminOnly, async (req, res) => {
  const audit = await AuditLog.findById(req.params.id)
  res.json(audit)
})

export default router
