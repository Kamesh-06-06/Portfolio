import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Sun, Moon, Download } from 'lucide-react'
import { nav, links } from '../data/portfolioData'
import { scrollTo } from './ui'

export default function Navbar({ theme, toggleTheme }) {
  const [active, setActive] = useState('home')
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true })
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)), { rootMargin: '-45% 0px -50% 0px' })
    nav.forEach((n) => { const el = document.getElementById(n.toLowerCase()); el && io.observe(el) })
    return () => { window.removeEventListener('scroll', onScroll); io.disconnect() }
  }, [])

  const go = (n) => { setOpen(false); scrollTo(n) }

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl transition-all ${scrolled ? 'bg-bg/80 py-2 shadow-lg' : 'bg-bg/30 py-4'}`} style={{ borderColor: 'rgb(var(--fg) / .08)' }}>
      <nav aria-label="Main" className="mx-auto flex max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#home" onClick={(e) => { e.preventDefault(); go('Home') }} className="text-xl font-extrabold tracking-tight"><span className="grad-text">KAMESH-DEV</span></a>
        <ul className="hidden items-center gap-7 lg:flex">
          {nav.map((n) => {
            const isActive = active === n.toLowerCase()
            return (
              <li key={n}>
                <a
                  href={`#${n.toLowerCase()}`}
                  onClick={(e) => {
                    e.preventDefault()
                    go(n)
                  }}
                  className={`relative px-3 py-1.5 text-sm font-medium transition-colors ${
                    isActive ? 'text-fg' : 'text-muted hover:text-fg'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavIndicator"
                      className="absolute inset-x-2 -bottom-1 h-0.5 rounded-full bg-gradient-to-r from-violet via-electric to-aqua shadow-[0_0_10px_#8B5CF6]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {n}
                </a>
              </li>
            )
          })}
        </ul>
        <div className="flex items-center gap-2">
          <button onClick={toggleTheme} aria-label="Toggle light and dark theme" className="btn-ghost !min-h-0 h-10 w-10 !p-0">{theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}</button>
          <a href={links.resume} download className="btn-grad hidden !min-h-0 py-2 sm:inline-flex"><Download size={16} /> Resume</a>
          <button onClick={() => setOpen(true)} aria-label="Open menu" className="btn-ghost !min-h-0 h-10 w-10 !p-0 lg:hidden"><Menu size={20} /></button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)} className="fixed inset-0 h-screen bg-black/60 lg:hidden" />
            <motion.aside initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: .3 }}
              className="fixed right-0 top-0 flex h-screen w-72 max-w-[85vw] flex-col gap-2 border-l bg-bg2 p-6 lg:hidden" style={{ borderColor: 'rgb(var(--fg) / .1)' }}>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="mb-4 self-end p-2"><X /></button>
              {nav.map((n) => <button key={n} onClick={() => go(n)} className={`rounded-xl px-4 py-3 text-left font-medium ${active === n.toLowerCase() ? 'bg-violet/20 text-fg' : 'text-muted'}`}>{n}</button>)}
              <a href={links.resume} download className="btn-grad mt-4"><Download size={16} /> Resume</a>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
