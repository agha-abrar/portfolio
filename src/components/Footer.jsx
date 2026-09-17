import content from '../data/content'

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-8">
      <div className="max-w-6xl mx-auto px-6 md:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-muted text-sm">
          © {new Date().getFullYear()} {content.name}. All rights reserved.
        </p>
        <button
          onClick={() => document.getElementById('home')?.scrollIntoView({ behavior: 'smooth' })}
          className="text-sm text-muted hover:text-cyan transition-colors"
        >
          Back to top ↑
        </button>
      </div>
    </footer>
  )
}
