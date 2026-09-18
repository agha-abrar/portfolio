import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { DEFAULT_MODEL_ID, DEFAULT_MODELS } from '../src/chat/models.js'

const app = express()
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'

app.use(cors({ origin: true }))
app.use(express.json({ limit: '2mb' }))

function requireKey(req, res) {
  const key = process.env.OPENROUTER_API_KEY?.trim()
  if (!key) {
    res.status(503).json({
      error:
        'OpenRouter API key is not configured. Add OPENROUTER_API_KEY to your .env file.',
      code: 'MISSING_API_KEY',
    })
    return null
  }
  return key
}

app.get('/api/health', (_req, res) => {
  res.json({
    ok: true,
    service: 'Omnixo AI',
    hasKey: Boolean(process.env.OPENROUTER_API_KEY?.trim()),
  })
})

app.get('/api/models', (_req, res) => {
  res.json({ data: DEFAULT_MODELS })
})

app.post('/api/chat', async (req, res) => {
  const key = requireKey(req, res)
  if (!key) return

  const { model, messages, stream = true } = req.body || {}

  if (!model || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({
      error: 'Request must include model and a non-empty messages array.',
    })
  }

  const payload = {
    model: DEFAULT_MODEL_ID,
    messages,
    stream,
  }

  try {
    const response = await fetch(OPENROUTER_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${key}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.OPENROUTER_SITE_URL || 'http://localhost:5173',
        'X-Title': process.env.OPENROUTER_SITE_NAME || 'Omnixo AI',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errBody = await response.text()
      let parsed
      try {
        parsed = JSON.parse(errBody)
      } catch {
        parsed = { error: errBody || 'OpenRouter request failed' }
      }
      return res.status(response.status).json(parsed)
    }

    if (stream) {
      res.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
      res.setHeader('Cache-Control', 'no-cache, no-transform')
      res.setHeader('Connection', 'keep-alive')
      res.flushHeaders?.()

      const reader = response.body.getReader()
      const decoder = new TextDecoder()

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        res.write(decoder.decode(value, { stream: true }))
      }
      res.end()
      return
    }

    const data = await response.json()
    res.json(data)
  } catch (err) {
    res.status(502).json({ error: err.message || 'Chat proxy failed' })
  }
})

export default app
