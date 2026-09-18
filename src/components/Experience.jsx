import { motion } from 'framer-motion'
import content from '../data/content'
import { fadeUp, viewportOnce, easeSmooth } from '../utils/motion'

export default function Experience() {
  return (
    <section id="experience" className="relative py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="max-w-xl mb-8"
        >
          <span className="section-label">Experience</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl mt-4 leading-tight text-star text-balance">
            Where I've worked
          </h2>
        </motion.div>

        <div className="relative pl-10 md:pl-14">
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 1, ease: easeSmooth }}
            style={{ transformOrigin: 'top' }}
            className="absolute left-[7px] md:left-[11px] top-2 bottom-2 w-[2px] bg-gradient-to-b from-cyan via-rose/50 to-transparent"
          />

          <div className="space-y-8">
            {content.experience.map((job, i) => (
              <motion.div
                key={job.role + job.company}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewportOnce}
                transition={{ duration: 0.55, delay: 0.08, ease: easeSmooth }}
                className="relative"
              >
                <motion.span
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.15, ease: easeSmooth }}
                  className="absolute -left-10 md:-left-14 top-1.5 w-4 h-4 rounded-full bg-void border-2 border-cyan shadow-[0_0_12px_rgba(94,234,212,0.5)]"
                />
                <span className="text-sm text-muted">{job.period}</span>
                <h3 className="font-display font-semibold text-xl md:text-2xl text-star mt-1">
                  {job.role} · <span className="text-mist">{job.company}</span>
                </h3>
                <p className="mt-3 text-mist max-w-2xl leading-relaxed">
                  {job.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
