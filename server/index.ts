import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'
import chatRouter from './routes/chat'
import healthRouter from './routes/health'
import parseUrlRouter from './routes/parse-url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// 加载 server/.env 文件
dotenv.config({ path: path.join(__dirname, '.env') })

const app = express()
const PORT = process.env.PORT || 3000

// 中间件
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'X-Access-Password', 'X-Custom-LLM'],
  exposedHeaders: ['X-Quota-Exempt'],
}))
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ extended: true, limit: '50mb' }))

// 路由
app.use('/api/health', healthRouter)
app.use('/api/chat', chatRouter)
app.use('/api/parse-url', parseUrlRouter)

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' })
})

// 错误处理
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Server error:', err)
  res.status(500).json({ error: err.message || 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`)
  console.log(`   - Health: http://localhost:${PORT}/api/health`)
  console.log(`   - Chat: http://localhost:${PORT}/api/chat`)
  console.log(`   - Parse URL: http://localhost:${PORT}/api/parse-url`)
})
