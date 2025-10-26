'use client'

import { useTheme } from '@/lib/theme-context'
import { Sun, Moon, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const themes = [
  { id: 'light', name: 'Light', icon: Sun },
  { id: 'dark', name: 'Dark', icon: Moon },
  { id: 'kcs', name: 'K.C.S', icon: Zap }
] as const

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  // Don't render until theme is loaded
  if (!theme) {
    return (
      <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 kcs:bg-purple-900 rounded-lg p-1">
        <div className="px-3 py-2 rounded-md text-sm font-medium text-gray-600 dark:text-gray-300 kcs:text-purple-300">
          <div className="w-4 h-4 animate-pulse bg-gray-300 dark:bg-gray-600 kcs:bg-purple-400 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-1 bg-gray-100 dark:bg-gray-800 kcs:bg-purple-900 rounded-lg p-1">
      {themes.map(({ id, name, icon: Icon }) => (
        <motion.button
          key={id}
          onClick={() => setTheme(id as any)}
          className={`
            relative flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
            ${theme === id 
              ? 'text-white shadow-lg' 
              : 'text-gray-600 dark:text-gray-300 kcs:text-purple-300 hover:text-gray-900 dark:hover:text-white kcs:hover:text-purple-100'
            }
          `}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {theme === id && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 kcs:from-purple-600 kcs:to-pink-600 rounded-md"
              layoutId="theme-bg"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <Icon className="relative z-10 w-4 h-4" />
          <span className="relative z-10 hidden sm:inline">{name}</span>
        </motion.button>
      ))}
    </div>
  )
}
