import { softSkills } from '../data/portfolioData'
import { Reveal, SectionTitle } from './ui'

export default function SoftSkills() {
  return (
    <section id="softskills" className="section !pt-8">
      <SectionTitle title="Beyond Coding" />
      <ul className="grid grid-cols-2 gap-4 md:grid-cols-5">
        {softSkills.map(({ n, i: Icon }, k) => (
          <li key={n} className={k === 4 ? 'col-span-2 md:col-span-1' : ''}>
            <Reveal delay={k * .08}>
              <div className="glass glow-hover group flex h-full flex-col items-center gap-3 p-6 text-center hover:-translate-y-1.5">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-violet/30 to-aqua/30 transition group-hover:rotate-6 group-hover:scale-110"><Icon size={26} className="text-aqua" aria-hidden="true" /></span>
                <span className="text-sm font-semibold">{n}</span>
              </div>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  )
}
