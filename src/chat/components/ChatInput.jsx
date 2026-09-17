import { useRef, useEffect } from 'react'

export default function ChatInput({ value, onChange, onSubmit, disabled, placeholder }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    el.style.height = 'auto'
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`
  }, [value])

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (!disabled && value.trim()) onSubmit()
    }
  }

  return (
    <form
      className="chat-input-form"
      onSubmit={(e) => {
        e.preventDefault()
        if (!disabled && value.trim()) onSubmit()
      }}
    >
      <textarea
        ref={ref}
        rows={1}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        placeholder={placeholder || 'Message AghaConnect…'}
        className="chat-input"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="chat-send"
        aria-label="Send message"
      >
        Send
      </button>
    </form>
  )
}
