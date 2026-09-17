import { motion } from 'framer-motion'
import content from '../data/content'
import { fadeUp, viewportOnce, easeSmooth } from '../utils/motion'

const cardVariant = {
  hidden: { opacity: 0, y: 32 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: (i % 2) * 0.08, ease: easeSmooth },
  }),
}

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          className="max-w-xl mb-16"
        >
          <span className="section-label">Projects</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl mt-4 leading-tight text-star text-balance">
            Things I've built
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {content.projects.map((project, i) => (
            <motion.article
              key={project.title}
              custom={i}
              variants={cardVariant}
              initial="hidden"
              whileInView="show"
              viewport={viewportOnce}
              whileHover={{ y: -6 }}
              transition={{ type: 'tween', duration: 0.25, ease: easeSmooth }}
              className="group relative cosmic-panel rounded-2xl p-8 overflow-hidden"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -top-20 -right-16 w-56 h-56 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{
                  background:
                    'radial-gradient(circle, rgba(94,234,212,0.18) 0%, transparent 70%)',
                }}
              />

              <div className="relative flex items-start justify-between gap-4">
                <h3 className="font-display font-semibold text-2xl text-star">
                  {project.title}
                </h3>
                <a
                  href={project.repo}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} on GitHub`}
                  className="text-muted hover:text-cyan transition-colors duration-200 text-lg"
                >
                  ↗
                </a>
              </div>

              <p className="relative mt-4 text-mist leading-relaxed">
                {project.description}
              </p>

              <div className="relative mt-6 flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-3 py-1 rounded-full border border-white/15 text-muted bg-void/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href={project.repo}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${project.title} source on GitHub`}
                className="relative inline-flex items-center gap-2 mt-6 text-sm font-semibold text-cyan hover:text-star transition-colors"
              >
                View on GitHub <span aria-hidden="true">↗</span>
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
