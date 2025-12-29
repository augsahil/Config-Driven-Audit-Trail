export const auditConfig = {
  Book: {
    track: true,
    exclude: ['updatedAt'],
    redact: [],
  },
  User: {
    track: true,
    exclude: ['credentials'],
    redact: ['credentials'],
  },
} as const
