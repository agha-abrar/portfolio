import { useState, useCallback } from 'react'
import PortfolioChat from '../components/PortfolioChat'
import Nav from '../components/Nav'
import Hero from '../components/Hero'
import About from '../components/About'
import Skills from '../components/Skills'
import Projects from '../components/Projects'
import Experience from '../components/Experience'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import GalaxyBackground from '../components/GalaxyBackground'
import SplashScreen, { hasSeenSplash, markSplashSeen } from '../components/SplashScreen'

export default function Portfolio() {
  const [showSplash] = useState(() => !hasSeenSplash())
  const [booting, setBooting] = useState(() => !hasSeenSplash())

  const handleSplashDone = useCallback(() => {
    markSplashSeen()
    setBooting(false)
  }, [])

  return (
    <div className="relative font-body text-mist min-h-screen">
      {showSplash && <SplashScreen onComplete={handleSplashDone} />}
      <GalaxyBackground />
      <div className={`site-content ${booting ? 'site-content-hidden' : 'site-content-visible'}`}>
        <Nav />
        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />

        {!booting && <PortfolioChat />}
      </div>
    </div>
  )
}
