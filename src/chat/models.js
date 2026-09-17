/** Curated OpenRouter models — users can pick any; more load via API later. */
export const DEFAULT_MODELS = [
  {
    id: 'openai/gpt-4o-mini',
    name: 'GPT-4o Mini',
    provider: 'OpenAI',
    blurb: 'Fast & affordable for everyday chat',
  },
  {
    id: 'openai/gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    blurb: 'Strong all-rounder for complex work',
  },
  {
    id: 'anthropic/claude-3.5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    blurb: 'Excellent writing & coding partner',
  },
  {
    id: 'google/gemini-2.0-flash-001',
    name: 'Gemini 2.0 Flash',
    provider: 'Google',
    blurb: 'Speedy multimodal reasoning',
  },
  {
    id: 'meta-llama/llama-3.3-70b-instruct',
    name: 'Llama 3.3 70B',
    provider: 'Meta',
    blurb: 'Open-weight powerhouse',
  },
  {
    id: 'deepseek/deepseek-chat',
    name: 'DeepSeek Chat',
    provider: 'DeepSeek',
    blurb: 'Strong value for coding & chat',
  },
  {
    id: 'mistralai/mistral-large',
    name: 'Mistral Large',
    provider: 'Mistral',
    blurb: 'Capable European frontier model',
  },
]

export const DEFAULT_MODEL_ID = DEFAULT_MODELS[0].id

export const SYSTEM_PROMPT = `You are AghaConnect, a sharp, friendly AI assistant inside Agha Abrar's portfolio.
Be clear, helpful, and professional. Prefer concise answers unless the user asks for depth.
When relevant, you can mention that this experience is powered by OpenRouter and multiple models.`
