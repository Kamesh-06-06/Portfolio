import { ArrowUp, Mail } from 'lucide-react'
import { FaGithub, FaLinkedin,FaInstagram} from 'react-icons/fa'
import { nav, links } from '../data/portfolioData'
import { scrollTo } from './ui'

export default function Footer() {
  const social = [[FaGithub, links.github, 'GitHub'], [FaLinkedin, links.linkedin, 'LinkedIn'], [Mail, `mailto:${links.email}`, 'Email'],  [FaInstagram, links.Instagram, "Instagram"]].filter(([, h]) => h)
  return (
    <footer className="border-t" style={{ borderColor: 'rgb(var(--fg) / .1)' }}>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-5 py-12 text-center">
        <p className="text-2xl font-extrabold"><span className="grad-text">KAMESH-DEV</span></p>
        <p className="text-muted">Building ideas into digital experiences.</p>
        <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-6 gap-y-2">
          {nav.map((n) => <a key={n} href={`#${n.toLowerCase()}`} onClick={(e) => { e.preventDefault(); scrollTo(n) }} className="text-sm text-muted hover:text-aqua">{n}</a>)}
        </nav>
        <div className="flex gap-3">
          {social.map(([Icon, h, l]) => <a key={l} href={h} target={h.startsWith('http') ? '_blank' : undefined} rel="noreferrer" aria-label={l} className="glass glow-hover flex h-11 w-11 items-center justify-center hover:text-aqua"><Icon size={18} /></a>)}
        </div>
        <button onClick={() => (window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.2 }) : window.scrollTo({ top: 0, behavior: 'smooth' }))} className="btn-ghost !min-h-0 py-2"><ArrowUp size={16} />Back to Top</button>
        <p className="text-sm text-muted">© 2026 Kamesh Kamalakannan. All rights reserved.</p>
      </div>
    </footer>
  )
}
