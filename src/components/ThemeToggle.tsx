'use client'

import { useContext } from 'react'
import { ThemeContext } from './ThemeProvider'

export default function ThemeToggle() {
  const { theme, setTheme } = useContext(ThemeContext)

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
