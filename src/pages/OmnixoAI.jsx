import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ChatSidebar from '../chat/components/ChatSidebar'
import { easeSmooth } from '../utils/motion'
import ChatInput from '../chat/components/ChatInput'
import MessageBubble from '../chat/components/MessageBubble'
import ModelPicker from '../chat/components/ModelPicker'
import { DEFAULT_MODEL_ID, SYSTEM_PROMPT } from '../chat/models'
import {
  loadStore,
  saveStore,
  createConversation,
  titleFromMessage,
} from '../chat/storage'
import { streamChat, checkApiHealth } from '../chat/api'
import GalaxyBackground from '../components/GalaxyBackground'

export default function OmnixoAI() {
  const [store, setStore] = useState(() => loadStore())
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [apiStatus, setApiStatus] = useState({ ok: false, hasKey: false })
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [streamingId, setStreamingId] = useState(null)
  const bottomRef = useRef(null)
  const storeRef = useRef(store)

  useEffect(() => {
    storeRef.current = store
  }, [store])

  const active = useMemo(
    () => store.conversations.find((c) => c.id === store.activeId) || null,
    [store]
  )

  const persist = useCallback((updater) => {
    setStore((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : updater
      saveStore(next)
      storeRef.current = next
      return next
    })
  }, [])

  useEffect(() => {
    checkApiHealth()
      .then(setApiStatus)
      .catch(() => setApiStatus({ ok: false, hasKey: false }))
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [active?.messages, busy])

  const handleNew = () => {
    const convo = createConversation()
    persist((prev) => ({
      ...prev,
      conversations: [convo, ...prev.conversations],
      activeId: convo.id,
    }))
    setInput('')
    setError('')
    setSidebarOpen(false)
  }

  const handleSelect = (id) => {
    persist((prev) => ({ ...prev, activeId: id }))
    setError('')
    setSidebarOpen(false)
  }

  const handleDelete = (id) => {
    persist((prev) => {
      const conversations = prev.conversations.filter((c) => c.id !== id)
      const activeId = prev.activeId === id ? conversations[0]?.id || null : prev.activeId
      return { ...prev, conversations, activeId }
    })
  }

  const upsertConvo = (convo) => {
    persist((prev) => {
      const exists = prev.conversations.some((c) => c.id === convo.id)
      return {
        ...prev,
        activeId: convo.id,
        conversations: exists
          ? prev.conversations.map((c) => (c.id === convo.id ? convo : c))
          : [convo, ...prev.conversations],
      }
    })
  }

  const handleSend = async () => {
    const text = input.trim()
    if (!text || busy) return

    setError('')
    setInput('')
    setBusy(true)

    const prev = storeRef.current
    const current = prev.conversations.find((c) => c.id === prev.activeId)
    const model = DEFAULT_MODEL_ID
    const base = current || createConversation()

    const userMsg = {
      id: `u_${Date.now()}`,
      role: 'user',
      content: text,
      createdAt: Date.now(),
    }
    const assistantMsg = {
      id: `a_${Date.now()}`,
      role: 'assistant',
      content: '',
      createdAt: Date.now(),
    }

    let working = {
      ...base,
      model,
      title: base.messages.length === 0 ? titleFromMessage(text) : base.title,
      messages: [...base.messages, userMsg, assistantMsg],
      updatedAt: Date.now(),
    }

    upsertConvo(working)
    setStreamingId(assistantMsg.id)

    const apiMessages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...working.messages
        .filter((m) => m.id !== assistantMsg.id)
        .map((m) => ({ role: m.role, content: m.content })),
    ]

    const controller = new AbortController()

    try {
      await streamChat({
        model,
        messages: apiMessages,
        signal: controller.signal,
        onDelta: (_piece, full) => {
          working = {
            ...working,
            messages: working.messages.map((m) =>
              m.id === assistantMsg.id ? { ...m, content: full } : m
            ),
            updatedAt: Date.now(),
          }
          upsertConvo(working)
        },
      })
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Something went wrong')
        working = {
          ...working,
          messages: working.messages.filter(
            (m) => m.id !== assistantMsg.id || m.content.trim()
          ),
        }
        upsertConvo(working)
      }
    } finally {
      setBusy(false)
      setStreamingId(null)
    }
  }

  return (
    <div className="relative min-h-screen font-body text-mist">
      <GalaxyBackground />
      <div className="relative z-10 flex h-screen flex-col">
        <header className="chat-topbar">
          <div className="chat-topbar-left">
            <button
              type="button"
              className="chat-menu-btn md:hidden"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open chats"
            >
              ☰
            </button>
            <Link to="/" className="chat-brand">
              Omnixo <span className="text-cyan">AI</span>
            </Link>
            <span className="chat-top-pill hidden sm:inline">GPT-4o Mini · OpenRouter</span>
          </div>
          <div className="chat-topbar-right">
            <span
              className={`chat-status-dot ${
                apiStatus.ok && apiStatus.hasKey ? 'chat-status-ok' : 'chat-status-warn'
              }`}
              title={
                !apiStatus.ok
                  ? 'API offline — run npm run dev'
                  : !apiStatus.hasKey
                    ? 'Add OPENROUTER_API_KEY to .env'
                    : 'Connected'
              }
            />
            <Link to="/" className="chat-back-link">
              ← Portfolio
            </Link>
          </div>
        </header>

        <div className="chat-shell">
          <ChatSidebar
            conversations={store.conversations}
            activeId={store.activeId}
            onSelect={handleSelect}
            onNew={handleNew}
            onDelete={handleDelete}
            open={sidebarOpen}
            onClose={() => setSidebarOpen(false)}
          />

          <main className="chat-main">
            <div className="chat-toolbar">
              <ModelPicker />
            </div>

            <div className="chat-messages">
              {!active || active.messages.length === 0 ? (
                <div className="chat-empty">
                  <h1 className="chat-empty-title">
                    Omnixo <span className="text-cyan">AI</span>
                  </h1>
                  <p className="chat-empty-copy">
                    Chat with GPT-4o Mini, powered by OpenRouter.
                    Ask questions, explore ideas, and get help with your work.
                  </p>
                  <div className="chat-empty-hints">
                    {[
                      'Explain a React architecture like I’m hiring you',
                      'Draft a cold email to a product team',
                      'Review this UX flow for friction',
                    ].map((hint) => (
                      <button
                        key={hint}
                        type="button"
                        className="chat-hint"
                        onClick={() => setInput(hint)}
                      >
                        {hint}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                active.messages.map((m) => (
                  <MessageBubble
                    key={m.id}
                    role={m.role}
                    content={m.content}
                    streaming={streamingId === m.id}
                  />
                ))
              )}
              <div ref={bottomRef} />
            </div>

            {error && <p className="chat-error">{error}</p>}

            <div className="chat-composer">
              <ChatInput
                value={input}
                onChange={setInput}
                onSubmit={handleSend}
                disabled={busy}
              />
              <p className="chat-disclaimer">
                Guest chats are stored locally in your browser. Sign-up / sign-in will sync
                your conversations later.
              </p>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
