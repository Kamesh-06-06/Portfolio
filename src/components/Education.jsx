import { motion, useReducedMotion } from 'framer-motion'
import { GraduationCap, MapPin, Calendar } from 'lucide-react'
import { education } from '../data/portfolioData'
import { Reveal, SectionTitle } from './ui'

export default function Education() {
  const reduce = useReducedMotion()
  return (
    <section id="education" className="section">
      <SectionTitle title="My Education" />
      <div className="relative mx-auto max-w-2xl pl-12 sm:pl-16">
        <motion.div aria-hidden="true" initial={reduce ? false : { scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }} transition={{ duration: 1 }}
          className="absolute bottom-0 left-4 top-0 w-0.5 origin-top bg-gradient-to-b from-violet via-electric to-aqua sm:left-6" />
        {education.map((e) => (
          <Reveal key={e.school} x={40}>
            <span aria-hidden="true" className="absolute left-0 top-6 flex h-9 w-9 items-center justify-center rounded-full bg-bg2 text-aqua shadow-[0_0_20px_#8B5CF6] ring-2 ring-violet sm:left-2"><GraduationCap size={18} /></span>
            <article className="glass glow-hover p-6">
              <h3 className="text-xl font-bold">{e.school}</h3>
              <p className="mt-1 font-semibold text-aqua">{e.degree}</p>
              <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
                <span className="inline-flex items-center gap-2"><Calendar size={15} />{e.years}</span>
                <span className="inline-flex items-center gap-2"><MapPin size={15} />{e.place}</span>
                <span>Academic Score: <strong className="text-fg">{e.score}</strong></span>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
