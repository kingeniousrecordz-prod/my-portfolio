'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, X, Code, Palette, Music, Github, Linkedin, Twitter, Mail } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Beats', href: '/beats' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'bg-white/95 dark:bg-dark-900/95 kcs:bg-kcs-900/95 backdrop-blur-md border-b border-gray-200 dark:border-dark-700 kcs:border-kcs-800' : 'bg-transparent'
    }`}>
      <div className="container-max">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold gradient-text">Portfolio</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-gray-600 dark:text-dark-300 kcs:text-kcs-300 hover:text-gray-900 dark:hover:text-white kcs:hover:text-kcs-100 transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Theme Toggle & Social Links */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-dark-400 kcs:text-kcs-400 hover:text-gray-900 dark:hover:text-white kcs:hover:text-kcs-100 transition-colors">
              <Github className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-dark-400 kcs:text-kcs-400 hover:text-gray-900 dark:hover:text-white kcs:hover:text-kcs-100 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-dark-400 kcs:text-kcs-400 hover:text-gray-900 dark:hover:text-white kcs:hover:text-kcs-100 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-900 dark:text-white kcs:text-kcs-100 p-2"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-white dark:bg-dark-900 kcs:bg-kcs-900 border-t border-gray-200 dark:border-dark-700 kcs:border-kcs-800">
            <div className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="block text-gray-600 dark:text-dark-300 kcs:text-kcs-300 hover:text-gray-900 dark:hover:text-white kcs:hover:text-kcs-100 transition-colors duration-200 font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200 dark:border-dark-700 kcs:border-kcs-800">
                <div className="mb-4">
                  <ThemeToggle />
                </div>
                <div className="flex items-center space-x-4">
                  <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-dark-400 kcs:text-kcs-400 hover:text-gray-900 dark:hover:text-white kcs:hover:text-kcs-100 transition-colors">
                    <Github className="w-5 h-5" />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-dark-400 kcs:text-kcs-400 hover:text-gray-900 dark:hover:text-white kcs:hover:text-kcs-100 transition-colors">
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 dark:text-dark-400 kcs:text-kcs-400 hover:text-gray-900 dark:hover:text-white kcs:hover:text-kcs-100 transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
