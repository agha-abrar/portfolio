import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Portfolio from './pages/Portfolio'
import AghaConnect from './pages/AghaConnect'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/connect" element={<AghaConnect />} />
      </Routes>
    </BrowserRouter>
  )
}
