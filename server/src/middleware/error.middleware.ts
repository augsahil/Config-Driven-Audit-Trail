import { ZodError } from 'zod'

export const errorHandler = (err: any, req: any, res: any, _next: any) => {
  let code = 'INTERNAL_ERROR'
  let message = 'An unexpected error occurred'
  let details

  if (err instanceof ZodError) {
    code = 'VALIDATION_ERROR'
    message = 'Validation failed'
    details = err.issues
  } else if (err.name === 'CastError') {
    code = 'INVALID_ID'
    message = 'Invalid ID format'
  } else if (err.message) {
    message = err.message
  }

  res.status(err.status || 500).json({
    error: {
      code,
      message,
      details,
      requestId: req.requestId,
    },
  })
}
