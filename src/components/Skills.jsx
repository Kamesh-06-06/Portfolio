import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { skillCategories } from '../data/portfolioData'
import { SectionTitle } from './ui'

const tabs = ['All', ...skillCategories.map((c) => c.name)]

export default function Skills() {
  const [tab, setTab] = useState('All')
  const items = skillCategories.filter((c) => tab === 'All' || c.name === tab).flatMap((c) => c.items)
  return (
    <section id="skills" className="section">
      <SectionTitle title="My Technical Skills" subtitle="Technologies and tools I work with" />
      <div role="tablist" aria-label="Skill categories" className="mb-10 flex flex-wrap justify-center gap-2">
        {tabs.map((t) => {
          const isSelected = tab === t
          return (
            <button
              key={t}
              role="tab"
              aria-selected={isSelected}
              onClick={() => setTab(t)}
              className="relative rounded-full px-4 py-2 text-sm font-medium transition-colors"
            >
              {isSelected && (
                <motion.span
                  layoutId="activeSkillTab"
                  className="absolute inset-0 rounded-full bg-gradient-to-r from-violet to-electric shadow-lg shadow-violet/30"
                  transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                />
              )}
              <span
                className={`relative z-10 transition-colors ${
                  isSelected ? 'text-white' : 'text-muted hover:text-fg'
                }`}
              >
                {t}
              </span>
              {!isSelected && (
                <span
                  className="absolute inset-0 rounded-full border"
                  style={{ borderColor: 'rgb(var(--fg) / .15)' }}
                />
              )}
            </button>
          )
        })}
      </div>
      <motion.ul layout className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {items.map(({ n, i: Icon, d }) => (
            <motion.li layout key={n} initial={{ opacity: 0, scale: .85 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .85 }} transition={{ duration: .3 }}
              className="group relative">
              <div tabIndex={0} className="glass glow-hover flex flex-col items-center gap-3 p-6 hover:-translate-y-1.5 hover:scale-[1.03] focus-visible:-translate-y-1.5">
                <Icon size={40} className="text-aqua transition group-hover:text-violet" aria-hidden="true" />
                <span className="text-center text-sm font-semibold">{n}</span>
              </div>
              <span role="tooltip" className="pointer-events-none absolute -top-2 left-1/2 z-10 w-44 -translate-x-1/2 -translate-y-full rounded-lg bg-bg2 px-3 py-2 text-center text-xs text-muted opacity-0 shadow-xl transition group-hover:opacity-100 group-focus-within:opacity-100">{d}</span>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </section>
  )
}
