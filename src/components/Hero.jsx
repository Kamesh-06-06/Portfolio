import { useEffect, useMemo, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { ChevronDown, Mail, MapPin, Download } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { SiReact, SiNodedotjs, SiJavascript, SiMysql, SiExpress, SiTailwindcss } from 'react-icons/si'
import { profile, links } from '../data/portfolioData'
import { Magnetic, scrollTo } from './ui'

function useTyping(words, reduce) {
  const [text, setText] = useState(''), [i, setI] = useState(0), [del, setDel] = useState(false)
  useEffect(() => {
    if (reduce) return
    const w = words[i % words.length]
    const delay = !del && text === w ? 1400 : del ? 40 : 90
    const id = setTimeout(() => {
      if (!del && text === w) setDel(true)
      else if (del && text === '') { setDel(false); setI((n) => n + 1) }
      else setText(w.slice(0, text.length + (del ? -1 : 1)))
    }, delay)
    return () => clearTimeout(id)
  }, [text, del, i, words, reduce])
  return reduce ? words[0] : text
}

const floating = [
  [SiReact, 'left-[8%] top-[24%]', '#61DAFB', '0s'], [SiNodedotjs, 'right-[10%] top-[22%]', '#68A063', '.8s'],
  [SiJavascript, 'left-[14%] bottom-[22%]', '#F7DF1E', '1.6s'], [SiMysql, 'right-[14%] bottom-[26%]', '#4479A1', '2.4s'],
  [SiExpress, 'left-[3%] top-[55%]', '#999', '3.2s'], [SiTailwindcss, 'right-[4%] top-[50%]', '#38BDF8', '4s'],
]

export default function Hero() {
  const reduce = useReducedMotion()
  const roles = useMemo(() => profile.roles, [])
  const typed = useTyping(roles, reduce)
  const item = (d) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, delay: d, ease: 'easeOut' },
  })
  const social = [
    { i: FaGithub, h: links.github, l: 'GitHub' }, { i: FaLinkedin, h: links.linkedin, l: 'LinkedIn' }, { i: Mail, h: `mailto:${links.email}`, l: 'Email' },
  ]
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 pt-24 text-center">
      {floating.map(([Icon, pos, color, delay], k) => (
        <div key={k} aria-hidden="true" className={`floaty absolute hidden opacity-70 md:block ${pos}`} style={{ animationDelay: delay, color }}><Icon size={38} /></div>
      ))}
      <div className="relative max-w-3xl">
        <motion.p {...item(0)} className="mb-3 text-lg text-muted">👋 Hello, I'm</motion.p>
        <motion.h1 {...item(.15)} className="text-4xl font-extrabold leading-tight sm:text-6xl lg:text-7xl"><span className="grad-text">KAMESH KAMALAKANNAN</span></motion.h1>
        <motion.p {...item(.3)} className="mt-5 h-9 text-xl font-semibold text-aqua sm:text-3xl" aria-label={roles.join(', ')}>
          {typed}<span className="ml-0.5 inline-block w-0.5 animate-pulse bg-aqua">&nbsp;</span>
        </motion.p>
        <motion.p {...item(.45)} className="mx-auto mt-6 max-w-2xl leading-relaxed text-muted">{profile.intro}</motion.p>
        <motion.p {...item(.55)} className="mt-4 inline-flex items-center gap-2 text-sm text-muted"><MapPin size={16} className="text-violet" />{profile.location}</motion.p>
        <motion.div {...item(.65)} className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Magnetic><button onClick={() => scrollTo('Projects')} className="btn-grad">View My Projects</button></Magnetic>
          <Magnetic><a href={links.resume} download className="btn-ghost"><Download size={16} /> Download Resume</a></Magnetic>
          <Magnetic><button onClick={() => scrollTo('Contact')} className="btn-ghost">Contact Me</button></Magnetic>
        </motion.div>
        <motion.div {...item(.8)} className="mt-8 flex justify-center gap-4">
          {social.map(({ i: Icon, h, l }) => h ? (
            <a key={l} href={h} target={h.startsWith('http') ? '_blank' : undefined} rel="noreferrer" aria-label={l}
              className="glass glow-hover flex h-12 w-12 items-center justify-center hover:-translate-y-1 hover:text-aqua"><Icon size={22} /></a>
          ) : (
            <span key={l} aria-label={`${l} link not set`} title={`${l} link not set`} className="glass flex h-12 w-12 cursor-not-allowed items-center justify-center opacity-40"><Icon size={22} /></span>
          ))}
        </motion.div>
      </div>
      <button onClick={() => scrollTo('About')} aria-label="Scroll to About section" className="bob absolute bottom-6 left-1/2 -translate-x-1/2 text-muted hover:text-aqua"><ChevronDown size={32} /></button>
    </section>
  )
}
