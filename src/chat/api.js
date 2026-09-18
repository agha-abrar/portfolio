export async function checkApiHealth() {
  const res = await fetch('/api/health')
  if (!res.ok) throw new Error('Omnixo AI API is offline')
  return res.json()
}

/**
 * Streams a chat completion from the server.
 * onDelta(textChunk) is called for each token piece.
 */
export async function streamChat({ model, messages, signal, onDelta }) {
  const res = await fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model, messages, stream: true }),
    signal,
  })

  if (!res.ok) {
    let message = 'Chat request failed'
    try {
      const data = await res.json()
      message = data.error?.message || data.error || data.message || message
      if (data.code === 'MISSING_API_KEY') {
        message =
          'Chat is not configured yet. Please contact the site owner.'
      }
    } catch {
      /* ignore */
    }
    throw new Error(typeof message === 'string' ? message.replace(/openrouter/gi, 'AI service') : 'Chat request failed')
  }

  if (!res.body) throw new Error('No response stream from server')

  const reader = res.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''
  let full = ''

  while (true) {
    const { done, value } = await reader.read()
    if (done) break
    buffer += decoder.decode(value, { stream: true })

    const lines = buffer.split('\n')
    buffer = lines.pop() || ''

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed.startsWith('data:')) continue
      const data = trimmed.slice(5).trim()
      if (data === '[DONE]') continue
      try {
        const json = JSON.parse(data)
        const piece = json.choices?.[0]?.delta?.content
        if (piece) {
          full += piece
          onDelta?.(piece, full)
        }
      } catch {
        /* skip malformed chunks */
      }
    }
  }

  return full
}
