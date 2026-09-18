import app from './app.js'

const PORT = process.env.PORT || 8787

app.listen(PORT, () => {
  console.log(`Omnixo AI API ready on http://localhost:${PORT}`)
  if (!process.env.OPENROUTER_API_KEY?.trim()) {
    console.warn('⚠  OPENROUTER_API_KEY is empty — chat will return 503 until you add it to .env')
  }
})
