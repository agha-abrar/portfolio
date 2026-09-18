import { useEffect, useMemo, useState } from 'react'

function seeded(n) {
  const x = Math.sin(n * 12.9898) * 43758.5453
  return x - Math.floor(x)
}

export default function GalaxyBackground() {
  const [motionEnabled, setMotionEnabled] = useState(true)
  const [pageVisible, setPageVisible] = useState(() => !document.hidden)

  useEffect(() => {
    const updateVisibility = () => setPageVisible(!document.hidden)
    document.addEventListener('visibilitychange', updateVisibility)
    return () => document.removeEventListener('visibilitychange', updateVisibility)
  }, [])

  const stars = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: `${seeded(i + 1) * 100}%`,
        top: `${seeded(i + 41) * 100}%`,
        size: seeded(i + 77) > 0.85 ? 2.5 : seeded(i + 13) > 0.6 ? 1.5 : 1,
        delay: seeded(i + 99) * 4,
        duration: 2 + seeded(i + 55) * 3,
        opacity: 0.4 + seeded(i + 22) * 0.6,
      })),
    []
  )

  const shooters = useMemo(
    () =>
      Array.from({ length: 3 }, (_, i) => ({
        id: i,
        top: `${15 + seeded(i + 200) * 50}%`,
        left: `${10 + seeded(i + 300) * 60}%`,
        delay: -i * 2.7,
        duration: 7 + seeded(i + 500) * 5,
      })),
    []
  )

  return (
    <>
    <button
      type="button"
      className="action-pill galaxy-motion-toggle"
      aria-pressed={motionEnabled}
      onClick={() => setMotionEnabled((enabled) => !enabled)}
    >
      {motionEnabled ? '◉ Galaxy motion: On' : '○ Galaxy motion: Off'}
    </button>
    <div className="galaxy-bg" data-motion={motionEnabled && pageVisible ? 'on' : 'off'} aria-hidden>
      <div className="galaxy-void" />
      <div className="aurora" />

      <div className="nebula nebula-a nebula-drift-a" />
      <div className="nebula nebula-b nebula-drift-b" />

      <div className="galaxy-spiral">
        <div className="galaxy-spiral-core" />
        <div className="galaxy-spiral-disc">
          {Array.from({ length: 24 }, (_, i) => {
            const angle = i * 2.39996
            const radius = 8 + Math.sqrt(i / 24) * 40
            return (
              <span
                key={i}
                className="galaxy-orbit-star"
                style={{
                  left: `${50 + Math.cos(angle) * radius}%`,
                  top: `${50 + Math.sin(angle) * radius}%`,
                  '--star-size': `${i % 6 === 0 ? 3 : 2}px`,
                  animationDelay: `${-i * 0.3}s`,
                }}
              />
            )
          })}
        </div>
      </div>

      <div className="stars">
        {stars.map((s) => (
          <span
            key={s.id}
            className="star"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              opacity: s.opacity,
              animationDelay: `${s.delay}s`,
              animationDuration: `${s.duration}s`,
            }}
          />
        ))}
      </div>

      {shooters.map((s) => (
        <span
          key={s.id}
          className="shooting-star"
          style={{
            top: s.top,
            left: s.left,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}

      <div className="galaxy-vignette" />
    </div>
    </>
  )
}
