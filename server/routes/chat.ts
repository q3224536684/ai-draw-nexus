import { Router } from 'express'
import type { ChatRequest, LLMConfig, Env } from '../types'
import { validateAccessPassword } from '../utils/auth'
import { callOpenAI, callAnthropic } from '../utils/ai-providers'
import { streamOpenAI } from '../utils/stream-openai'
import { streamAnthropic } from '../utils/stream-anthropic'

const router = Router()

/**
 * 根据 LLM 配置创建有效的环境变量对象
 */
function createEffectiveEnv(llmConfig?: LLMConfig): Env {
  const env: Env = {
    AI_PROVIDER: process.env.AI_PROVIDER || 'openai',
    AI_BASE_URL: process.env.AI_BASE_URL || 'https://api.openai.com/v1',
    AI_API_KEY: process.env.AI_API_KEY || '',
    AI_MODEL_ID: process.env.AI_MODEL_ID || 'gpt-4',
    ACCESS_PASSWORD: process.env.ACCESS_PASSWORD,
  }

  if (!llmConfig || !llmConfig.apiKey) {
    return env
  }

  console.log('llmConfig', llmConfig)
  return {
    AI_PROVIDER: llmConfig.provider || env.AI_PROVIDER,
    AI_BASE_URL: llmConfig.baseUrl || env.AI_BASE_URL,
    AI_API_KEY: llmConfig.apiKey,
    AI_MODEL_ID: llmConfig.modelId || env.AI_MODEL_ID,
    ACCESS_PASSWORD: env.ACCESS_PASSWORD,
  }
}

router.post('/', async (req, res) => {
  try {
    const env: Env = {
      AI_PROVIDER: process.env.AI_PROVIDER || 'openai',
      AI_BASE_URL: process.env.AI_BASE_URL || 'https://api.openai.com/v1',
      AI_API_KEY: process.env.AI_API_KEY || '',
      AI_MODEL_ID: process.env.AI_MODEL_ID || 'gpt-4',
      ACCESS_PASSWORD: process.env.ACCESS_PASSWORD,
    }

    const { valid, exempt } = validateAccessPassword(req, env)
    if (!valid) {
      return res.status(401).json({ error: '访问密码错误' })
    }

    const body: ChatRequest = req.body
    const { messages, stream = false, llmConfig } = body

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Invalid request: messages required' })
    }

    // 使用自定义 LLM 配置时也免除配额
    const hasCustomLLM = !!(llmConfig && llmConfig.apiKey)
    const effectiveExempt = exempt || hasCustomLLM
    const effectiveEnv = createEffectiveEnv(llmConfig)
    const provider = effectiveEnv.AI_PROVIDER || 'openai'

    if (stream) {
      switch (provider) {
        case 'anthropic':
          await streamAnthropic(messages, effectiveEnv, effectiveExempt, res)
          break
        case 'openai':
        default:
          await streamOpenAI(messages, effectiveEnv, effectiveExempt, res)
          break
      }
    } else {
      let response: string

      switch (provider) {
        case 'anthropic':
          response = await callAnthropic(messages, effectiveEnv)
          break
        case 'openai':
        default:
          response = await callOpenAI(messages, effectiveEnv)
          break
      }

      res.setHeader('X-Quota-Exempt', effectiveExempt ? 'true' : 'false')
      res.json({ content: response })
    }
  } catch (error) {
    console.error('Chat error:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    res.status(500).json({ error: errorMessage })
  }
})

export default router
