export const errorHandler = (err: any, req: any, res: any, _next: any) => {
  res.status(500).json({
    error: {
      code: 'INTERNAL_ERROR',
      message: err.message,
      requestId: req.requestId,
    },
  })
}
