/** The supported chat model. */
export const DEFAULT_MODELS = [
  {
    id: 'openai/gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'OpenAI',
    blurb: 'Fast & affordable for everyday chat',
  },

]

export const DEFAULT_MODEL_ID = DEFAULT_MODELS[0].id

export const SYSTEM_PROMPT = `You are Omnixo AI, a sharp, friendly AI assistant inside Agha Abrar's portfolio.
Be clear, helpful, and professional. Prefer concise answers unless the user asks for depth.`
