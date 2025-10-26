'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Lock, User, Eye, EyeOff } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      // Simple hardcoded admin check for demo purposes
      if (username === 'admin' && password === 'admin123') {
        // Store auth token (in a real app, you'd use proper session management)
        localStorage.setItem('admin_token', 'authenticated')
        router.push('/admin')
      } else {
        setError('Invalid credentials. Use admin/admin123')
      }
    } catch (error) {
      setError('Login error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 kcs:bg-kcs-900 flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="card">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 kcs:from-kcs-500 kcs:to-kcs-600 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold mb-2 theme-text">Admin Login</h1>
            <p className="text-gray-500 dark:text-dark-400 kcs:text-kcs-400">Access your portfolio dashboard</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2 theme-text">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-dark-500 kcs:text-kcs-500" />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-dark-700 kcs:bg-kcs-800 border border-gray-300 dark:border-dark-600 kcs:border-kcs-700 rounded-lg text-gray-900 dark:text-white kcs:text-kcs-100 focus:outline-none focus:border-primary-500 kcs:focus:border-kcs-500"
                  placeholder="Enter your username"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 theme-text">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 dark:text-dark-500 kcs:text-kcs-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-12 py-3 bg-gray-100 dark:bg-dark-700 kcs:bg-kcs-800 border border-gray-300 dark:border-dark-600 kcs:border-kcs-700 rounded-lg text-gray-900 dark:text-white kcs:text-kcs-100 focus:outline-none focus:border-primary-500 kcs:focus:border-kcs-500"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-dark-500 kcs:text-kcs-500 hover:text-gray-900 dark:hover:text-white kcs:hover:text-kcs-100"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-600/20 border border-red-600 text-red-400 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-gray-500 dark:text-dark-500 kcs:text-kcs-500 text-sm">
              Default credentials: <br />
              Username: <span className="text-primary-400 kcs:text-kcs-400">admin</span> <br />
              Password: <span className="text-primary-400 kcs:text-kcs-400">admin123</span>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
