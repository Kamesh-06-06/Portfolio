import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import emailjs from '@emailjs/browser'
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react'
import { FaGithub, FaLinkedin,FaInstagram} from 'react-icons/fa'
import { links, profile } from '../data/portfolioData'
import { Reveal, SectionTitle } from './ui'

const env = import.meta.env
const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const fields = [['name', 'Full Name', 'text'], ['email', 'Email Address', 'email'], ['subject', 'Subject', 'text']]

export default function Contact() {
  const [v, setV] = useState({ name: '', email: '', subject: '', message: '' })
  const [err, setErr] = useState({})
  const [status, setStatus] = useState('idle') // idle | loading | success | mailto | error
  const [msg, setMsg] = useState('')

  const validate = () => {
    const e = {}
    if (!v.name.trim()) e.name = 'Enter your full name.'
    if (!v.email.trim()) e.email = 'Enter your email address.'
    else if (!emailOk.test(v.email)) e.email = 'Enter a valid email, like name@example.com.'
    if (!v.subject.trim()) e.subject = 'Enter a subject.'
    if (!v.message.trim()) e.message = 'Write a message.'
    return e
  }

  const createMailtoUrl = () => {
    const subject = encodeURIComponent(`[Portfolio Inquiry] ${v.subject || 'Hello Kamesh'}`)
    const body = encodeURIComponent(
      `Hi Kamesh,\n\n${v.message}\n\n---\nFrom: ${v.name}\nEmail: ${v.email}`
    )
    return `mailto:${links.email}?subject=${subject}&body=${body}`
  }

  const submit = async (ev) => {
    ev.preventDefault()
    const e = validate()
    setErr(e)
    if (Object.keys(e).length) return

    const { VITE_EMAILJS_SERVICE_ID: s, VITE_EMAILJS_TEMPLATE_ID: t, VITE_EMAILJS_PUBLIC_KEY: k } = env

    // If EmailJS credentials are provided, attempt sending through EmailJS
    if (s && t && k && s.trim() !== '' && t.trim() !== '' && k.trim() !== '') {
      setStatus('loading')
      try {
        await emailjs.send(
          s,
          t,
          {
            from_name: v.name,
            name: v.name,
            from_email: v.email,
            email: v.email,
            reply_to: v.email,
            subject: v.subject,
            message: v.message,
            to_name: profile.name,
          },
          { publicKey: k }
        )
        setStatus('success')
        setMsg("Message sent successfully! I'll get back to you soon.")
        setV({ name: '', email: '', subject: '', message: '' })
        return
      } catch (err) {
        console.error('EmailJS sending failed:', err)
        // Fall back to opening default email app so message is preserved
        const url = createMailtoUrl()
        setStatus('mailto')
        setMsg("Direct service unavailable. Opening your email app to send...")
        setTimeout(() => {
          window.location.href = url
        }, 300)
        return
      }
    }

    // Direct fallback: opens prefilled email in the user's default email client
    const mailtoUrl = createMailtoUrl()
    setStatus('mailto')
    setMsg(`Opening your email client to send directly to ${links.email}...`)
    setTimeout(() => {
      window.location.href = mailtoUrl
    }, 300)
  }

  const set = (k) => (e) => {
    setV({ ...v, [k]: e.target.value })
    if (err[k]) setErr({ ...err, [k]: '' })
  }

  const info = [
    [Mail, links.email, `mailto:${links.email}`],
    [Phone, links.phone, `tel:${links.phone.replace(/\s/g, '')}`],
    [MapPin, profile.location],
  ]

  const social = [
    [FaGithub, links.github, "GitHub"],
    [FaLinkedin, links.linkedin, "LinkedIn"],
    [Mail, `mailto:${links.email}`, "Email"],
    [FaInstagram, links.Instagram, "Instagram"],
  ];

  return (
    <section id="contact" className="section">
      <SectionTitle
        title="Let's Connect"
        subtitle="Have an opportunity, project idea, or question? I'd love to hear from you."
      />
      <div className="grid gap-10 lg:grid-cols-5">
        <Reveal x={-40} className="space-y-4 lg:col-span-2">
          {info.map(([Icon, text, href]) => {
            const body = (
              <>
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-violet/20 text-aqua">
                  <Icon size={20} />
                </span>
                <span className="break-all text-sm font-medium">{text}</span>
              </>
            )
            return href ? (
              <a
                key={text}
                href={href}
                className="glass glow-hover flex items-center gap-4 p-4 transition-all hover:translate-x-1"
              >
                {body}
              </a>
            ) : (
              <div key={text} className="glass flex items-center gap-4 p-4">
                {body}
              </div>
            )
          })}
          <div className="flex gap-3 pt-2">
            {social.map(([Icon, h, l]) =>
              h ? (
                <a
                  key={l}
                  href={h}
                  target={h.startsWith('http') ? '_blank' : undefined}
                  rel="noreferrer"
                  aria-label={l}
                  className="glass glow-hover flex h-12 w-12 items-center justify-center hover:-translate-y-1 hover:text-aqua"
                >
                  <Icon size={20} />
                </a>
              ) : (
                <span
                  key={l}
                  title="LinkedIn link not set"
                  aria-label="LinkedIn link not set"
                  className="glass flex h-12 w-12 cursor-not-allowed items-center justify-center opacity-40"
                >
                  <Icon size={20} />
                </span>
              )
            )}
          </div>
        </Reveal>

        <Reveal x={40} className="lg:col-span-3">
          <form onSubmit={submit} noValidate className="glass space-y-5 p-6 sm:p-8">
            {fields.map(([k, label, type]) => (
              <div key={k}>
                <div className="relative">
                  <input
                    id={k}
                    type={type}
                    value={v[k]}
                    onChange={set(k)}
                    placeholder=" "
                    autoComplete={k === 'name' ? 'name' : k === 'email' ? 'email' : 'off'}
                    aria-invalid={!!err[k]}
                    aria-describedby={err[k] ? `${k}-e` : undefined}
                    className="field peer"
                  />
                  <label
                    htmlFor={k}
                    className="pointer-events-none absolute left-4 top-4 origin-left text-sm text-muted transition-all peer-focus:top-2 peer-focus:scale-75 peer-focus:text-aqua peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:scale-75"
                  >
                    {label}
                  </label>
                </div>
                {err[k] && <p id={`${k}-e`} className="mt-1 text-sm text-red-400">{err[k]}</p>}
              </div>
            ))}
            <div>
              <div className="relative">
                <textarea
                  id="message"
                  rows={5}
                  value={v.message}
                  onChange={set('message')}
                  placeholder=" "
                  aria-invalid={!!err.message}
                  aria-describedby={err.message ? 'message-e' : undefined}
                  className="field peer resize-none"
                />
                <label
                  htmlFor="message"
                  className="pointer-events-none absolute left-4 top-4 origin-left text-sm text-muted transition-all peer-focus:top-2 peer-focus:scale-75 peer-focus:text-aqua peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:scale-75"
                >
                  Message
                </label>
              </div>
              {err.message && <p id="message-e" className="mt-1 text-sm text-red-400">{err.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="btn-grad w-full disabled:opacity-70 transition-transform active:scale-[0.98]"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
            </button>

            <AnimatePresence>
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="status"
                  aria-live="polite"
                  className="flex items-center gap-2 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-3 text-sm text-emerald-400"
                >
                  <CheckCircle2 size={18} className="shrink-0" />
                  <span>{msg}</span>
                </motion.div>
              )}

              {status === 'mailto' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="status"
                  aria-live="polite"
                  className="rounded-xl border border-aqua/30 bg-aqua/10 p-3.5 text-sm text-fg"
                >
                  <div className="flex items-center gap-2 font-medium text-aqua">
                    <CheckCircle2 size={18} className="shrink-0" />
                    <span>{msg}</span>
                  </div>
                  <div className="mt-2 text-xs text-muted">
                    If your email client didn't open automatically,{' '}
                    <a
                      href={createMailtoUrl()}
                      className="inline-flex items-center gap-1 font-semibold text-aqua underline hover:text-fg"
                    >
                      click here to launch email client <ExternalLink size={12} />
                    </a>
                  </div>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  role="status"
                  aria-live="polite"
                  className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-400"
                >
                  <AlertCircle size={18} className="shrink-0" />
                  <span>{msg}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
