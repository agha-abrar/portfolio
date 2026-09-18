import { motion } from 'framer-motion'
import content from '../data/content'
import { fadeUp, viewportOnce, easeSmooth } from '../utils/motion'

export default function Contact() {
  return (
    <section id="contact" className="relative py-12 md:py-16 overflow-hidden">
      <div className="contact-glow" aria-hidden />

      <div className="relative max-w-3xl mx-auto px-6 md:px-10 text-center">
        <motion.span
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="section-label inline-block"
        >
          Contact
        </motion.span>

        <motion.h2
          custom={1}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="font-display font-bold text-4xl md:text-6xl mt-4 leading-tight text-star text-balance name-glow"
        >
          Let's build something worth using.
        </motion.h2>

        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-6 text-mist text-lg max-w-lg mx-auto"
        >
          Have a role, a project, or just want to talk shop? My inbox is open.
        </motion.p>

        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href={`mailto:${content.email}`}
            className="rounded-full bg-cyan text-void px-8 py-3.5 font-semibold hover:bg-star transition-colors duration-200 shadow-[0_0_28px_rgba(94,234,212,0.25)]"
          >
            {content.email}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewportOnce}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 flex items-center justify-center gap-6"
        >
          {content.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="text-muted hover:text-cyan text-sm transition-colors duration-200"
            >
              {s.label}
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
