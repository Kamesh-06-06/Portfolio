import { User } from 'lucide-react'
import { profile } from '../data/portfolioData'
import { Reveal, SectionTitle, Tilt } from './ui'

function Highlight({ text }) {
  const re = new RegExp(`(${profile.keywords.map((k) => k.replace('.', '\\.')).join('|')})`, 'g')
  return text.split(re).map((p, i) => profile.keywords.includes(p) ? <strong key={i} className="font-semibold text-aqua">{p}</strong> : p)
}

export default function About() {
  return (
    <section id="about" className="section">
      <SectionTitle title="About Me" subtitle="Passionate Developer | Continuous Learner | Problem Solver" />
      <div className="grid items-center gap-12 lg:grid-cols-5">
        <Reveal x={-40} className="flex justify-center lg:col-span-2">
          <div className="relative h-64 w-64 sm:h-72 sm:w-72">
            <div className="spin-ring absolute -inset-1.5 rounded-full" style={{ background: 'conic-gradient(from 0deg, #8B5CF6, #3B82F6, #06B6D4, #8B5CF6)' }} />
            <div className="relative h-full w-full overflow-hidden rounded-full border-4 border-bg bg-bg2">
              <img src="/images/profile.png" alt="Portrait of Kamesh Kamalakannan" loading="lazy" className="h-full w-full object-cover"
                onError={(e) => { e.currentTarget.style.display = 'none' }} />
              {/* <User aria-hidden="true" className="absolute inset-0 m-auto -z-0 text-muted/40" size={96} /> */}
            </div>
          </div>
        </Reveal>
        <div className="lg:col-span-3">
          <Reveal x={40} className="space-y-4 leading-relaxed text-muted">
            {profile.about.map((t) => <p key={t}><Highlight text={t} /></p>)}
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {profile.details.map(([k, v], i) => (
              <Reveal key={k} delay={i * 0.06}>
                <Tilt max={5}><div className="glass glow-hover p-4"><p className="text-xs text-muted">{k}</p><p className="mt-1 font-semibold">{v}</p></div></Tilt>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
