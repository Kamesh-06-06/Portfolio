import { useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export function Reveal({ children, delay = 0, x = 0, y = 18, className = '' }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.45, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  )
}

export function SectionTitle({ title, subtitle }) {
  return (
    <Reveal className="mb-12 text-center">
      <div className="inline-block">
        <h2 className="text-3xl font-extrabold sm:text-4xl tracking-tight">
          <span className="grad-text">{title}</span>
        </h2>
        <div className="mx-auto mt-2.5 h-1 w-16 rounded-full bg-gradient-to-r from-violet via-electric to-aqua" />
      </div>
      {subtitle && <p className="mx-auto mt-4 max-w-2xl text-muted text-base leading-relaxed">{subtitle}</p>}
    </Reveal>
  )
}

const fine = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

export function Tilt({ children, className = '', max = 6 }) {
  const ref = useRef(null)
  const rafRef = useRef(null)
  const reduce = useReducedMotion()

  const move = (e) => {
    if (reduce || !fine() || !ref.current) return
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    const currentTarget = ref.current
    const { clientX, clientY } = e
    rafRef.current = requestAnimationFrame(() => {
      if (!currentTarget) return
      const r = currentTarget.getBoundingClientRect()
      const px = (clientX - r.left) / r.width - 0.5
      const py = (clientY - r.top) / r.height - 0.5
      currentTarget.style.transform = `perspective(800px) rotateX(${-py * max}deg) rotateY(${px * max}deg) translateY(-2px)`
    })
  }

  const leave = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current)
    if (ref.current) ref.current.style.transform = ''
  }

  return <div ref={ref} onMouseMove={move} onMouseLeave={leave} className={`transition-transform duration-150 will-change-transform ${className}`}>{children}</div>
}

export function Magnetic({ children }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const move = (e) => {
    if (reduce || !fine() || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    ref.current.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.2}px, ${(e.clientY - r.top - r.height / 2) * 0.3}px)`
  }
  return <div ref={ref} onMouseMove={move} onMouseLeave={() => ref.current && (ref.current.style.transform = '')} className="inline-block transition-transform duration-150">{children}</div>
}

export const scrollTo = (id) => {
  const el = document.getElementById(id.toLowerCase())
  if (!el) return
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -70, duration: 0.8 })
  } else {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
