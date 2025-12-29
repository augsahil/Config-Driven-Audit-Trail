import express from 'express'
import { requestContext } from './middleware/request-context.middleware'
import bookRoutes from './routes/book.routes'
import auditRoutes from './routes/audit.routes'
import { errorHandler } from './middleware/error.middleware'
import authRoutes from './routes/auth.routes'

export const app = express()

app.use(express.json())
app.use(requestContext)

app.use('/api/books', bookRoutes)
app.use('/api/audits', auditRoutes)
app.use('/api/auth', authRoutes)

app.use(errorHandler)
