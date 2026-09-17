import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import content from '../data/content'

const SPLASH_KEY = 'agha-splash-seen'

export function hasSeenSplash() {
  try {
    return sessionStorage.getItem(SPLASH_KEY) === '1'
  } catch {
    return false
  }
}

export function markSplashSeen() {
  try {
    sessionStorage.setItem(SPLASH_KEY, '1')
  } catch {
    /* ignore */
  }
}

const BOOT_LINES = [
  'Initializing interface systems…',
  'Calibrating design systems…',
  'Compiling pixel-perfect experiences…',
  'Loading production-ready React skills…',
  'Syncing with hiring frequency…',
  'Almost ready to ship value.',
]

const STATUS_TAGS = [
  'OPEN TO ROLES',
  'FRONTEND ENGINEER',
  'UI SYSTEMS',
  'FAST · CLEAN · SHIPPED',
]

function seeded(n) {
  const x = Math.sin(n * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

export default function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [lineIndex, setLineIndex] = useState(0)
  const [exiting, setExiting] = useState(false)
  const [visible, setVisible] = useState(true)

  const stars = useMemo(
    () =>
      Array.from({ length: 28 }, (_, i) => ({
        id: i,
        left: `${seeded(i + 1) * 100}%`,
        top: `${seeded(i + 30) * 100}%`,
        size: seeded(i + 50) > 0.8 ? 2 : 1,
        delay: seeded(i + 70) * 3,
        duration: 2 + seeded(i + 90) * 2,
      })),
    []
  )

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    let cancelled = false
    const start = performance.now()
    const duration = 2800

    let frame
    const tick = (now) => {
      if (cancelled) return
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      const value = Math.min(100, Math.floor(eased * 100))
      setProgress(value)
      setLineIndex(Math.min(BOOT_LINES.length - 1, Math.floor(t * BOOT_LINES.length)))

      if (t < 1) {
        frame = requestAnimationFrame(tick)
      } else {
        setExiting(true)
        setTimeout(() => {
          if (cancelled) return
          markSplashSeen()
          setVisible(false)
          document.body.style.overflow = ''
          onComplete?.()
        }, 450)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => {
      cancelled = true
      cancelAnimationFrame(frame)
    }
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="splash"
          className="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          aria-busy="true"
          aria-live="polite"
          role="status"
        >
          <div className="splash-void" />
          <div className="splash-nebula splash-nebula-a" />
          <div className="splash-nebula splash-nebula-b" />
          <div className="splash-scan" />

          <div className="splash-stars">
            {stars.map((s) => (
              <span
                key={s.id}
                className="star"
                style={{
                  left: s.left,
                  top: s.top,
                  width: s.size,
                  height: s.size,
                  animationDelay: `${s.delay}s`,
                  animationDuration: `${s.duration}s`,
                }}
              />
            ))}
          </div>

          <div className="splash-radar" aria-hidden>
            <div className="splash-radar-sweep" />
            <div className="splash-radar-ring" />
            <div className="splash-radar-ring splash-radar-ring-inner" />
            <div className="splash-radar-core" />
          </div>

          <div className={`splash-content splash-content-in ${exiting ? 'splash-content-out' : ''}`}>
            <p className="splash-kicker">
              <span className="splash-pulse" />
              PORTFOLIO BOOT SEQUENCE
            </p>

            <h1 className="splash-name">{content.name}</h1>

            <p className="splash-hook">
              Hire the engineer who turns complex product goals into
              <span className="splash-hook-accent"> interfaces people trust.</span>
            </p>

            <div className="splash-tags">
              {STATUS_TAGS.map((tag) => (
                <span key={tag} className="splash-tag">
                  {tag}
                </span>
              ))}
            </div>

            <div className="splash-loader">
              <div className="splash-loader-meta">
                <span className="splash-boot-line">{BOOT_LINES[lineIndex]}</span>
                <span className="splash-pct">{String(progress).padStart(3, '0')}%</span>
              </div>

              <div
                className="splash-bar-track"
                role="progressbar"
                aria-valuenow={progress}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <div className="splash-bar-fill" style={{ width: `${progress}%` }} />
                <span className="splash-bar-glow" style={{ left: `${progress}%` }} />
              </div>

              <div className="splash-loader-foot">
                <span>SYS // UI.ENGINE</span>
                <span>READY FOR INTERVIEW</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
