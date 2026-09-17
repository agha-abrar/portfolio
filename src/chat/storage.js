const STORAGE_KEY = 'agha-connect-v1'

/**
 * Guest conversations live in localStorage for now.
 * Shape is ready for auth later:
 *   { userId: null | string, conversations: Conversation[], activeId }
 */
function emptyStore() {
  return {
    userId: null, // future: set after sign-in
    conversations: [],
    activeId: null,
  }
}

export function loadStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return emptyStore()
    const parsed = JSON.parse(raw)
    return {
      ...emptyStore(),
      ...parsed,
      conversations: Array.isArray(parsed.conversations) ? parsed.conversations : [],
    }
  } catch {
    return emptyStore()
  }
}

export function saveStore(store) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

export function createConversation(model) {
  const id =
    typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID()
      : `c_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`

  return {
    id,
    title: 'New chat',
    model,
    messages: [],
    createdAt: Date.now(),
    updatedAt: Date.now(),
    // future auth fields
    ownerId: null,
  }
}

export function titleFromMessage(text) {
  const clean = text.replace(/\s+/g, ' ').trim()
  if (!clean) return 'New chat'
  return clean.length > 42 ? `${clean.slice(0, 42)}…` : clean
}
