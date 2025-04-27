'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTopButton() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setVisible(true)
      } else {
        setVisible(false)
      }
    }

    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  if (!visible) return null

  return (
    <button
    onClick={scrollToTop}
    className="fixed bottom-6 right-6 p-3 rounded-full bg-green-500 text-white shadow-lg hover:bg-green-600 dark:bg-green-400 dark:hover:bg-green-500 transition z-50"
  >
    <ArrowUp className="w-6 h-6" />
  </button>
  )
}
