import { useEffect, useRef, useState } from 'react'
import { streamChat } from '../chat/api'
import { DEFAULT_MODEL_ID } from '../chat/models'
import content from '../data/content'

const suggestions = ['What are his skills?', 'Tell me about his projects', 'How can I download his CV?']

export default function PortfolioChat() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([])
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const controllerRef = useRef(null)
  const inputRef = useRef(null)
  const launcherRef = useRef(null)
  const logRef = useRef(null)

  useEffect(() => () => controllerRef.current?.abort(), [])
  useEffect(() => {
    if (!open) return
    inputRef.current?.focus()
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false)
        launcherRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])
  useEffect(() => {
    const log = logRef.current
    if (log) log.scrollTop = log.scrollHeight
  }, [open, messages, busy, error])

  function close() {
    setOpen(false)
    launcherRef.current?.focus()
  }

  async function send(text = input) {
    const question = text.trim()
    if (!question || controllerRef.current) return
    const history = [...messages, { role: 'user', content: question }]
    const normalized = question.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    const mentionsResume = /\b(cv|resume|curriculum vitae)\b/i.test(normalized)
    const wantsDownload = /\b(download|get|send|share|view|open|link|copy|give|access|find|where)\b/i.test(normalized)
      || /^(cv|resume|curriculum vitae)[?! .]*$/i.test(normalized)
    if (mentionsResume && wantsDownload) {
      setMessages([...history, {
        role: 'assistant',
        content: 'You can download Agha Abrar’s CV using the button below.',
        downloadCV: true,
      }])
      setInput('')
      setError('')
      return
    }
    const controller = new AbortController()
    controllerRef.current = controller
    setMessages([...history, { role: 'assistant', content: '' }])
    setInput('')
    setError('')
    setBusy(true)
    try {
      await streamChat({
        model: DEFAULT_MODEL_ID,
        mode: 'portfolio',
        messages: history.slice(-20),
        signal: controller.signal,
        onDelta: (_piece, full) => setMessages([...history, { role: 'assistant', content: full }]),
      })
    } catch (err) {
      if (err.name !== 'AbortError') {
        setMessages(history.slice(0, -1))
        setInput(question)
        setError(err.message || 'Unable to answer right now. Please try again.')
      }
    } finally {
      controllerRef.current = null
      setBusy(false)
    }
  }

  return (
    <>
      {open && (
        <section id="portfolio-chat" className="portfolio-chat" role="dialog" aria-labelledby="portfolio-chat-title">
          <header className="portfolio-chat-header">
            <div>
              <h2 id="portfolio-chat-title">Ask about Agha</h2>
              <p>Your guide to this portfolio</p>
            </div>
            <button type="button" onClick={close} aria-label="Close portfolio chat">×</button>
          </header>
          <div className="portfolio-chat-log" ref={logRef} role="log" aria-label="Portfolio conversation" aria-live="polite" aria-busy={busy}>
            <p className="portfolio-chat-welcome">Hi! I can help you explore Agha’s skills, projects, and background. What would you like to know?</p>
            {messages.map((message, index) => (
              <div key={index} className={`portfolio-chat-message portfolio-chat-message-${message.role}`}>
                <span>{message.role === 'user' ? 'You' : 'Portfolio assistant'}</span>
                <p>{message.content || 'Thinking…'}</p>
                {message.downloadCV && (
                  <a className="portfolio-chat-download" href={content.cvPath} download="Agha-Abrar-CV.pdf">
                    Download CV ↓
                  </a>
                )}
              </div>
            ))}
          </div>
          {messages.length === 0 && (
            <div className="portfolio-chat-suggestions">
              {suggestions.map((question) => <button type="button" key={question} onClick={() => send(question)} disabled={busy}>{question}</button>)}
            </div>
          )}
          {error && <p className="portfolio-chat-error" role="alert">{error}</p>}
          <form className="portfolio-chat-form" onSubmit={(event) => { event.preventDefault(); send() }}>
            <label htmlFor="portfolio-question" className="sr-only">Ask about Agha’s portfolio</label>
            <input id="portfolio-question" ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)}
              maxLength={2000} placeholder="Ask about skills or projects…" autoComplete="off" />
            <button type="submit" disabled={busy || !input.trim()}>{busy ? 'Waiting…' : 'Send'}</button>
          </form>
          <footer className="portfolio-chat-footer">
            <span>Answers based on this portfolio</span>
            <a href={content.cvPath} download>Download CV ↓</a>
          </footer>
        </section>
      )}
      <button ref={launcherRef} type="button" className="connect-fab" aria-expanded={open} aria-controls="portfolio-chat"
        onClick={() => open ? close() : setOpen(true)}>
        <span aria-hidden="true">✦</span> {open ? 'Close chat' : 'Ask about me'}
      </button>
    </>
  )
}
