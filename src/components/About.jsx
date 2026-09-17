import { motion } from 'framer-motion'
import content from '../data/content'
import { fadeUp, viewportOnce } from '../utils/motion'

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-6 md:px-10 grid md:grid-cols-[0.9fr,1.1fr] gap-14 md:gap-20">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
        >
          <span className="section-label">About</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl mt-4 leading-tight text-star text-balance">
            A little about how I work
          </h2>

          <dl className="mt-10 grid grid-cols-2 gap-y-7 gap-x-6 max-w-sm">
            {content.about.facts.map((f, i) => (
              <motion.div
                key={f.label}
                custom={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={viewportOnce}
              >
                <dt className="text-[11px] uppercase tracking-[0.14em] text-muted mb-1.5">
                  {f.label}
                </dt>
                <dd className="text-mist font-medium">{f.value}</dd>
              </motion.div>
            ))}
          </dl>
        </motion.div>

        <div className="space-y-6">
          {content.about.paragraphs.map((p, i) => (
            <motion.p
              key={i}
              custom={i + 1}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              className="text-mist text-lg leading-relaxed max-w-xl text-balance"
            >
              {p}
            </motion.p>
          ))}
        </div>
      </div>
    </section>
  )
}
