import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Portfolio from './pages/Portfolio'
import OmnixoAI from './pages/OmnixoAI'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/connect" element={<OmnixoAI />} />
      </Routes>
    </BrowserRouter>
  )
}
