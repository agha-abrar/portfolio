import 'dotenv/config'
import express from 'express'
import cors from 'cors'

const app = express()
const PORT = process.env.PORT || 8787
const OPENROUTER_URL = 'https://openrouter.ai/api/v1/chat/completions'
const MODELS_URL = 'https://openrouter.ai/api/v1/models'

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
    service: 'AghaConnect',
    hasKey: Boolean(process.env.OPENROUTER_API_KEY?.trim()),
  })
})

app.get('/api/models', async (_req, res) => {
  const key = requireKey(_req, res)
  if (!key) return

  try {
    const response = await fetch(MODELS_URL, {
      headers: { Authorization: `Bearer ${key}` },
    })
    const data = await response.json()
    if (!response.ok) {
      return res.status(response.status).json(data)
    }
    res.json(data)
  } catch (err) {
    res.status(502).json({ error: err.message || 'Failed to fetch models' })
  }
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
    model,
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
        'X-Title': process.env.OPENROUTER_SITE_NAME || 'AghaConnect',
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

app.listen(PORT, () => {
  console.log(`AghaConnect API ready on http://localhost:${PORT}`)
  if (!process.env.OPENROUTER_API_KEY?.trim()) {
    console.warn('⚠  OPENROUTER_API_KEY is empty — chat will return 503 until you add it to .env')
  }
})
