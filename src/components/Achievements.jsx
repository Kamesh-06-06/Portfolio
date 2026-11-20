import { Award, ExternalLink } from 'lucide-react'
import { achievements } from '../data/portfolioData';

import { Reveal, SectionTitle, Tilt } from './ui'

export default function Achievements() {
  return (
    <section id="achievements" className="section">
      <SectionTitle title="Achievements" />
      <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-2">
        {achievements.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.12} y={30}>
            <Tilt max={10}>
              <article className="glass glow-hover overflow-hidden">
                <div className="flex h-36 items-center justify-center bg-gradient-to-br from-violet/25 via-electric/15 to-aqua/25">
                  <c.icon
                    size={50}
                    className="text-aqua transition group-hover:text-violet"
                    aria-hidden="true"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted">{c.description} • </p>
                  {c.url ? (
                    <a
                      href={c.url}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-ghost mt-5 !min-h-0 py-2"
                    >
                      <ExternalLink size={16} />
                      View Achievement
                    </a>
                  ) : (
                    <span
                      aria-disabled="true"
                      title="Achievement link not added yet"
                      className="btn-off mt-5 !min-h-0 py-2"
                    >
                      <ExternalLink size={16} />
                      View Certificate
                    </span>
                  )}
                </div>
              </article>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
