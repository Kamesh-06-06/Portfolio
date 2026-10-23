import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
export default function BackToTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const f = () => setShow(window.scrollY > 600)
    f(); window.addEventListener('scroll', f, { passive: true })
    return () => window.removeEventListener('scroll', f)
  }, [])
  return (
    <AnimatePresence>
      {show && (
        <motion.button initial={{ opacity: 0, scale: .6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: .6 }}
          onClick={() => (window.__lenis ? window.__lenis.scrollTo(0, { duration: 1.2 }) : window.scrollTo({ top: 0, behavior: 'smooth' }))} aria-label="Back to top"
          className="btn-grad fixed bottom-6 right-6 z-50 h-12 w-12 !min-h-0 !p-0"><ArrowUp size={20} /></motion.button>
      )}
    </AnimatePresence>
  )
}
