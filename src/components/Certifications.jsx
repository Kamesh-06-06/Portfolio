import { Award, ExternalLink } from 'lucide-react'
import { certifications } from '../data/portfolioData'
import { Reveal, SectionTitle, Tilt } from './ui'

export default function Certifications() {
  return (
    <section id="certifications" className="section">
      <SectionTitle title="Certifications & Achievements" />
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        {certifications.map((c, i) => (
          <Reveal key={c.title} delay={i * .12} y={30}>
            <Tilt max={10}>
              <article className="glass glow-hover overflow-hidden">
                <div className="flex h-36 items-center justify-center bg-gradient-to-br from-violet/25 via-electric/15 to-aqua/25">
                  {c.image ? <img src={c.image} alt={`${c.title} certificate`} loading="lazy" className="h-full w-full object-cover" /> : <Award size={52} className="text-fg/70" aria-hidden="true" />}
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted">{c.provider} • {c.year}</p>
                  {c.url
                    ? <a href={c.url} target="_blank" rel="noreferrer" className="btn-ghost mt-5 !min-h-0 py-2"><ExternalLink size={16} />View Certificate</a>
                    : <span aria-disabled="true" title="Certificate link not added yet" className="btn-off mt-5 !min-h-0 py-2"><ExternalLink size={16} />View Certificate</span>}
                </div>
              </article>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
