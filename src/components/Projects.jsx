import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ChevronDown, ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { projects } from '../data/portfolioData'
import { SectionTitle, Tilt, Reveal } from './ui'

const cats = ['All', ...new Set(projects.map((p) => p.category))]

function Shot({ p, className = '' }) {
  const [bad, setBad] = useState(false)
  const Icon = p.icon
  return bad ? (
    <div className={`flex items-center justify-center bg-gradient-to-br from-violet/30 via-electric/20 to-aqua/30 ${className}`} role="img" aria-label={`${p.title} screenshot placeholder`}>
      <Icon size={56} className="text-fg/70" />
    </div>
  ) : <img src={p.image} alt={`${p.title} screenshot`} loading="lazy" onError={() => setBad(true)} className={`object-cover ${className}`} />
}

function LinkBtn({ href, icon: Icon, label }) {
  return href
    ? <a href={href} target="_blank" rel="noreferrer" className="btn-ghost !min-h-0 py-2"><Icon size={16} />{label}</a>
    : <span aria-disabled="true" title="Link not available yet" className="btn-off !min-h-0 py-2"><Icon size={16} />{label}</span>
}

function Card({ p, onZoom }) {
  const [open, setOpen] = useState(false)
  return (
    <Tilt>
      <article className={`group glass glow-hover flex h-full flex-col overflow-hidden ${p.featured ? 'ring-1 ring-violet/60' : ''}`}>
        <button onClick={() => onZoom(p)} aria-label={`Enlarge ${p.title} screenshot`} className="relative block h-48 w-full overflow-hidden">
          <Shot p={p} className="h-full w-full transition-transform duration-500 group-hover:scale-110" />
          {p.featured && <span className="absolute left-3 top-3 rounded-full bg-gradient-to-r from-violet to-electric px-3 py-1 text-xs font-semibold text-white">Featured</span>}
        </button>
        <div className="flex flex-1 flex-col p-6">
          <h3 className="text-xl font-bold">{p.title}</h3>
          <p className="text-sm text-aqua">{p.subtitle}</p>
          <p className="mt-3 text-sm leading-relaxed text-muted">{p.description}</p>
          <ul className="mt-4 flex flex-wrap gap-2">{p.stack.map((s) => <li key={s} className="chip transition hover:-translate-y-0.5">{s}</li>)}</ul>
          <button onClick={() => setOpen(!open)} aria-expanded={open} className="mt-4 inline-flex items-center gap-1 self-start text-sm font-semibold text-violet">
            Key features <ChevronDown size={16} className={`transition ${open ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence initial={false}>
            {open && (
              <motion.ul initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden text-sm text-muted">
                {p.features.map((f) => <li key={f} className="mt-2 flex gap-2"><span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-aqua" />{f}</li>)}
              </motion.ul>
            )}
          </AnimatePresence>
          <div className="mt-auto flex flex-wrap gap-3 pt-6">
            <LinkBtn href={p.github} icon={FaGithub} label="GitHub" />
            <LinkBtn href={p.demo} icon={ExternalLink} label="Live Demo" />
          </div>
        </div>
      </article>
    </Tilt>
  )
}

export default function Projects() {
  const [cat, setCat] = useState('All')
  const [zoom, setZoom] = useState(null)
  const list = projects.filter((p) => cat === 'All' || p.category === cat)

  useEffect(() => {
    if (!zoom) return
    const esc = (e) => e.key === 'Escape' && setZoom(null)
    window.addEventListener('keydown', esc); document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', esc); document.body.style.overflow = '' }
  }, [zoom])

  return (
    <section id="projects" className="section">
      <SectionTitle title="Featured Projects" subtitle="A selection of applications I've built while learning and developing my software engineering skills." />
      <Reveal className="mb-10 flex flex-wrap justify-center gap-2">
        {cats.map((c) => {
          const isSelected = cat === c
          return (
            <button
              key={c}
              onClick={() => setCat(c)}
              aria-pressed={isSelected}
              className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors"
            >
              {isSelected && (
                <motion.span
                  layoutId="activeProjectTab"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-violet to-electric shadow-lg shadow-violet/30"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              <span
                className={`relative z-10 transition-colors ${
                  isSelected ? 'text-white' : 'text-muted hover:text-fg'
                }`}
              >
                {c}
              </span>
              {!isSelected && (
                <span
                  className="absolute inset-0 rounded-full border"
                  style={{ borderColor: 'rgb(var(--fg) / .15)' }}
                />
              )}
            </button>
          )
        })}
      </Reveal>
      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.div layout key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: .9 }} transition={{ duration: .35 }}>
              <Card p={p} onZoom={setZoom} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {zoom && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setZoom(null)}
            role="dialog" aria-modal="true" aria-label={`${zoom.title} screenshot`} className="fixed inset-0 z-[70] flex items-center justify-center bg-black/80 p-4">
            <button aria-label="Close" onClick={() => setZoom(null)} className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white"><X /></button>
            <motion.div initial={{ scale: .9 }} animate={{ scale: 1 }} onClick={(e) => e.stopPropagation()} className="w-full max-w-3xl overflow-hidden rounded-2xl">
              <Shot p={zoom} className="aspect-video w-full" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
