import { AuditLog } from '../models/audit.model'
import { auditConfig } from '../config/audit.config'
import { asyncStore } from '../middleware/request-context.middleware'
import { diffObjects } from '../utils/diff.util'

export const createAudit = async ({
  entity,
  entityId,
  action,
  before,
  after,
}: any) => {
  const cfg = auditConfig[entity as keyof typeof auditConfig]
  if (!cfg?.track) return

  const diff = diffObjects(before, after, cfg.exclude)
  const store = asyncStore.getStore()

  await AuditLog.create({
    entity,
    entityId,
    action,
    diff,
    actorId: store?.get('userId'),
    requestId: store?.get('requestId'),
  })
}
