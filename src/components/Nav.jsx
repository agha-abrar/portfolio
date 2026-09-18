import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import content from '../data/content'

const sections = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  const goTo = (id) => {
    setOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ease-out ${
        scrolled || open
          ? 'bg-void/85 border-b border-white/5 nav-scrolled'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto flex items-center justify-between px-6 md:px-10 h-20">
        <button
          onClick={() => goTo('home')}
          className="font-display text-xl font-bold tracking-tight text-star"
        >
          {content.name.split(' ')[0]}
          <span className="text-cyan">.</span>
        </button>

        <ul className="hidden md:flex items-center gap-1">
          {sections.map((s) => (
            <li key={s.id} className="relative">
              <button
                onClick={() => goTo(s.id)}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  active === s.id ? 'text-star' : 'text-muted hover:text-mist'
                }`}
              >
                {s.label}
                {active === s.id && (
                  <motion.span
                    layoutId="nav-underline"
                    className="absolute left-4 right-4 -bottom-0.5 h-[2px] bg-cyan rounded-full shadow-[0_0_8px_rgba(94,234,212,0.7)]"
                    transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/connect" className="action-pill">
            Omnixo AI
          </Link>
        </div>

        <button
          className="md:hidden text-mist flex flex-col gap-1.5 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
        >
          <motion.span
            animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
            className="w-6 h-[2px] bg-mist block origin-center"
          />
          <motion.span
            animate={{ opacity: open ? 0 : 1 }}
            className="w-6 h-[2px] bg-mist block"
          />
          <motion.span
            animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
            className="w-6 h-[2px] bg-mist block origin-center"
          />
        </button>
      </nav>

      <motion.div
        id="mobile-menu"
        inert={open ? undefined : ''}
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-void/95 border-b border-white/5 backdrop-blur-xl"
      >
        <ul className="flex flex-col px-6 pb-4">
          {sections.map((s) => (
            <li key={s.id}>
              <button
                onClick={() => goTo(s.id)}
                className={`w-full text-left py-3 text-base ${
                  active === s.id ? 'text-cyan' : 'text-muted'
                }`}
              >
                {s.label}
              </button>
            </li>
          ))}
          <li>
            <Link
              to="/connect"
              onClick={() => setOpen(false)}
              className="action-pill mt-2"
            >
              Omnixo AI
            </Link>
          </li>

        </ul>
      </motion.div>
    </header>
  )
}
