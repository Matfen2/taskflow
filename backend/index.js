import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './config/swagger.js'
import authRoutes from './routes/authRoutes.js'
import tacheRoutes from './routes/tacheRoutes.js'
import { authMiddleware } from './middlewares/auth.js'

const app = express()
app.use(cors({ origin: 'http://localhost:5173' }))
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get('/', (req, res) => res.json({
  message: '✅ TaskFlow API en ligne',
  documentation: 'http://localhost:3000/api-docs',
  version: '1.0.0'
}))

app.use('/auth', authRoutes)
app.use('/taches', authMiddleware, tacheRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`)
  console.log(`Swagger : http://localhost:${PORT}/api-docs`)
})