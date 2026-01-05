export const auditConfig = {
  Book: {
    track: true,
    exclude: ['updatedAt'],
    redact: [],
  },
  User: {
    track: true,
    exclude: ['apiKey'],
    redact: ['apiKey'],
  },
} as const
