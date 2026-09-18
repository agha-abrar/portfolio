import { motion } from 'framer-motion'
import content from '../data/content'
import { fadeUp, scaleIn, viewportOnce } from '../utils/motion'

export default function Skills() {
  return (
    <section id="skills" className="relative py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="max-w-xl mb-8"
        >
          <span className="section-label">Skills</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl mt-4 leading-tight text-star text-balance">
            Tools I reach for
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-x-10 gap-y-8">
          {content.skills.map((group, gi) => (
            <motion.div
              key={group.group}
              custom={gi}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
            >
              <h3 className="text-muted text-xs uppercase tracking-[0.16em] mb-4 font-semibold">
                {group.group}
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {group.items.map((item, ii) => (
                  <motion.span
                    key={item}
                    custom={ii}
                    variants={scaleIn}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportOnce}
                    whileHover={{ y: -3, borderColor: 'rgba(94,234,212,0.55)', color: '#5eead4' }}
                    className="px-4 py-2 rounded-full border border-white/15 text-mist text-sm bg-void/40 cursor-default"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
