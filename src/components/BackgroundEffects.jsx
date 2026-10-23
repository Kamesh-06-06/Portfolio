import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

export default function BackgroundEffects() {
  const canvas = useRef(null)
  const spotlightRef = useRef(null)
  const reduce = useReducedMotion()

  useEffect(() => {
    if (reduce) return
    const cv = canvas.current
    if (!cv) return
    const ctx = cv.getContext('2d', { alpha: true })
    let w, h, raf, pts = []

    const resize = () => {
      w = cv.width = window.innerWidth
      h = cv.height = window.innerHeight
      const n = w < 640 ? 12 : 24
      pts = Array.from({ length: n }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.5 + 0.5,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.fillStyle = 'rgba(139, 92, 246, 0.45)'
      ctx.beginPath()
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i]
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
        ctx.moveTo(p.x + p.r, p.y)
        ctx.arc(p.x, p.y, p.r, 0, 6.283)
      }
      ctx.fill()
      raf = requestAnimationFrame(draw)
    }

    const onVis = () => {
      cancelAnimationFrame(raf)
      if (!document.hidden) draw()
    }

    resize()
    draw()
    window.addEventListener('resize', resize, { passive: true })
    document.addEventListener('visibilitychange', onVis)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVis)
    }
  }, [reduce])

  useEffect(() => {
    if (reduce || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return
    const spot = spotlightRef.current
    if (!spot) return

    let raf
    const move = (e) => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        if (spot) {
          spot.style.transform = `translate3d(${e.clientX - 250}px, ${e.clientY - 250}px, 0)`
        }
      })
    }

    window.addEventListener('mousemove', move, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', move)
    }
  }, [reduce])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden transform-gpu">
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at top, rgb(var(--bg2)), rgb(var(--bg)) 70%)' }} />
      {/* Cached GPU ambient blurred orbs without scroll recalculation */}
      <div className="absolute -left-32 top-10 h-96 w-96 rounded-full bg-violet/20 blur-[90px] transform-gpu" />
      <div className="absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-electric/15 blur-[90px] transform-gpu" />
      <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-aqua/10 blur-[90px] transform-gpu" />
      {!reduce && <canvas ref={canvas} className="absolute inset-0" />}
      {!reduce && (
        <div
          ref={spotlightRef}
          className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full will-change-transform hidden [@media(hover:hover)_and_(pointer:fine)]:block"
          style={{
            background: 'radial-gradient(circle, rgb(139 92 246 / 0.12), transparent 70%)',
            transform: 'translate3d(-500px, -500px, 0)',
          }}
        />
      )}
    </div>
  )
}
