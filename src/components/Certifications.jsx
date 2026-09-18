import { motion } from 'framer-motion'
import content from '../data/content'
import { fadeUp, viewportOnce } from '../utils/motion'

const images = import.meta.glob('../../certifications/*.{png,jpg,jpeg,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
})

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-28 md:py-36">
      <div className="max-w-6xl mx-auto px-6 md:px-10">
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={viewportOnce} className="max-w-xl mb-12">
          <span className="section-label">Certifications</span>
          <h2 className="font-display font-bold text-3xl md:text-5xl mt-4 text-star">Learning behind the work</h2>
          <p className="mt-5 text-mist leading-relaxed">Course certificates in AI tooling, backend development, and mobile applications.</p>
        </motion.div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {content.certifications.map((certificate) => {
            const image = images[`../../certifications/${certificate.file}`]
            return (
              <article key={certificate.file} className="cosmic-panel rounded-2xl overflow-hidden flex flex-col">
                <a href={image} target="_blank" rel="noopener noreferrer" className="block bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan"
                  aria-label={`View ${certificate.title} certificate in a new tab`}>
                  <img src={image} alt={`${certificate.title} certificate awarded to Agha Abrar by ${certificate.issuer}`}
                    loading="lazy" decoding="async" className="w-full aspect-[3/2] object-contain" />
                </a>
                <div className="p-6 flex flex-col flex-1 items-start">
                  <p className="text-xs tracking-widest uppercase text-cyan">{certificate.issuer}</p>
                  <h3 className="font-display text-lg font-semibold text-star mt-3 leading-snug">{certificate.title}</h3>
                  <p className="text-sm text-muted mt-3 mb-6">Issued {certificate.date}</p>
                  <a href={image} target="_blank" rel="noopener noreferrer" className="action-pill mt-auto"
                    aria-label={`View ${certificate.title} certificate in a new tab`}>View certificate ↗</a>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
