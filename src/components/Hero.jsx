import { motion } from 'framer-motion'
import content from '../data/content'
import { easeSmooth } from '../utils/motion'

const nameLetters = content.name.split('')

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.035, delayChildren: 0.25 },
  },
}

const letter = {
  hidden: { y: '110%', opacity: 0 },
  show: {
    y: '0%',
    opacity: 1,
    transition: { duration: 0.65, ease: easeSmooth },
  },
}

const blips = [
  { top: '22%', left: '68%', delay: '0s' },
  { top: '58%', left: '28%', delay: '0.9s' },
  { top: '72%', left: '74%', delay: '1.6s' },
  { top: '34%', left: '42%', delay: '2.1s' },
]

export default function Hero() {
  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden">
      {/* ambient glow orbs — CSS only */}
      <div className="hero-glow hero-glow-a" aria-hidden />
      <div className="hero-glow hero-glow-b" aria-hidden />

      {/* orbital rings */}
      <div className="orbit-ring orbit-spin-slow" aria-hidden />
      <div className="orbit-ring orbit-spin-reverse orbit-ring-inner" aria-hidden />
      <span className="orbit-blip" aria-hidden />

      <div className="tech-hud" aria-hidden>
        <div className="hud-sweep" />
        <div className="hud-ring hud-spin-slow" />
        <div className="hud-ring hud-ring-dashed hud-spin-reverse" style={{ inset: '12%' }} />
        <div className="hud-cross" />
        <div className="hud-core" />
        {blips.map((b, i) => (
          <span
            key={i}
            className="hud-blip"
            style={{ top: b.top, left: b.left, animationDelay: b.delay }}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto px-6 md:px-10 pt-24 w-full">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, delay: 0.1, ease: easeSmooth }}
          className="mb-7 flex items-center gap-3"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
          </span>
          <span className="section-label !normal-case tracking-[0.14em]">
            SYSTEM ONLINE · {content.role}
          </span>
        </motion.p>

        <motion.h1
          variants={container}
          initial="hidden"
          animate="show"
          className="font-display font-bold leading-[0.92] text-[clamp(3.2rem,11vw,8rem)] text-star flex flex-wrap tracking-tight"
          aria-label={content.name}
        >
          {nameLetters.map((char, i) => (
            <span key={i} className="overflow-hidden inline-block pb-2">
              <motion.span variants={letter} className="inline-block">
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.85, ease: easeSmooth }}
          className="mt-8 max-w-lg text-lg md:text-xl text-mist text-balance leading-relaxed"
        >
          {content.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1, ease: easeSmooth }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <button
            onClick={() =>
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="rounded-full bg-cyan text-void px-7 py-3.5 font-semibold tracking-wide hover:bg-star transition-colors duration-200 shadow-[0_0_28px_rgba(94,234,212,0.3)]"
          >
            View my work
          </button>
          <a
            href={content.cvPath}
            download
            className="rounded-full border border-white/20 px-7 py-3.5 font-medium text-mist hover:border-cyan/60 hover:text-cyan transition-colors duration-200"
          >
            Download CV
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.5 }}
          className="mt-12 flex flex-wrap gap-6 font-mono text-[10px] tracking-widest text-muted uppercase"
        >
          <span>LAT {content.location.split(',')[0]?.slice(0, 8) || '—'}°</span>
          <span className="text-cyan/70">|</span>
          <span>FPS 60</span>
          <span className="text-cyan/70">|</span>
          <span>RENDER OK</span>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase text-muted">scroll</span>
        <motion.div
          animate={{ y: [0, 10, 0], opacity: [0.45, 1, 0.45] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-[1px] h-9 bg-gradient-to-b from-cyan to-transparent"
        />
      </motion.div>
    </section>
  )
}
