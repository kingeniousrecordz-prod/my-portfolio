'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { Music, Calendar, Tag, Download } from 'lucide-react'
import AudioPlayer from '@/components/AudioPlayer'

interface Beat {
  id: number
  title: string
  description?: string
  audio_url: string
  cover_image_url?: string
  genre?: string
  duration?: number
  created_at: string
}

export default function Beats() {
  const [beats, setBeats] = useState<Beat[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchBeats()
  }, [filter])

  const fetchBeats = async () => {
    try {
      const url = filter === 'all' ? '/api/beats' : `/api/beats?genre=${filter}`
      const response = await fetch(url)
      const data = await response.json()
      setBeats(data)
    } catch (error) {
      console.error('Error fetching beats:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatDuration = (seconds?: number) => {
    if (!seconds) return 'N/A'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }


  const genres = [
    { key: 'all', label: 'All Beats' },
    { key: 'hip-hop', label: 'Hip Hop' },
    { key: 'trap', label: 'Trap' },
    { key: 'r&b', label: 'R&B' },
    { key: 'electronic', label: 'Electronic' },
    { key: 'ambient', label: 'Ambient' }
  ]

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 kcs:from-kcs-900 kcs:via-kcs-800 kcs:to-kcs-900">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold theme-text">My Beats</h1>
            <p className="text-xl text-gray-600 dark:text-dark-300 kcs:text-kcs-300 max-w-3xl mx-auto">
              Original music productions and beats created with passion and creativity. Each track tells a story.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-gray-100 dark:bg-dark-800 kcs:bg-kcs-800">
        <div className="container-max">
          <div className="flex flex-wrap justify-center gap-4">
            {genres.map((genre) => (
              <button
                key={genre.key}
                onClick={() => setFilter(genre.key)}
                className={`px-6 py-2 rounded-full transition-colors duration-200 ${
                  filter === genre.key
                    ? 'bg-primary-600 kcs:bg-kcs-600 text-white'
                    : 'bg-gray-200 dark:bg-dark-700 kcs:bg-kcs-700 text-gray-700 dark:text-dark-300 kcs:text-kcs-300 hover:bg-gray-300 dark:hover:bg-dark-600 kcs:hover:bg-kcs-600'
                }`}
              >
                {genre.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Beats Grid */}
      <section className="section-padding">
        <div className="container-max">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="w-full h-48 bg-gray-200 dark:bg-dark-700 kcs:bg-kcs-700 rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-dark-700 kcs:bg-kcs-700 rounded mb-2"></div>
                  <div className="h-3 bg-gray-200 dark:bg-dark-700 kcs:bg-kcs-700 rounded mb-4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-dark-700 kcs:bg-kcs-700 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : beats.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {beats.map((beat, index) => (
                <motion.div
                  key={beat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card group hover:scale-105 transition-transform duration-300"
                >
                  {/* Cover Image */}
                  <div className="relative w-full h-48 bg-gradient-to-br from-green-500/20 to-green-600/20 kcs:from-kcs-500/20 kcs:to-pink-500/20 rounded-lg overflow-hidden mb-4">
                    {beat.cover_image_url ? (
                      <img
                        src={beat.cover_image_url}
                        alt={beat.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-16 h-16 bg-green-600 kcs:bg-kcs-600 rounded-lg flex items-center justify-center">
                          <Music className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Beat Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2 theme-text">{beat.title}</h3>
                      {beat.description && (
                        <p className="text-gray-600 dark:text-dark-400 kcs:text-kcs-400 text-sm leading-relaxed">{beat.description}</p>
                      )}
                    </div>

                    {/* Genre */}
                    {beat.genre && (
                      <div className="flex items-center space-x-2">
                        <Tag className="w-4 h-4 text-gray-500 dark:text-dark-500 kcs:text-kcs-500" />
                        <span className="text-sm text-gray-500 dark:text-dark-500 kcs:text-kcs-500 capitalize">{beat.genre}</span>
                      </div>
                    )}

                    {/* Duration */}
                    <div className="flex items-center space-x-2">
                      <Music className="w-4 h-4 text-gray-500 dark:text-dark-500 kcs:text-kcs-500" />
                      <span className="text-sm text-gray-500 dark:text-dark-500 kcs:text-kcs-500">{formatDuration(beat.duration)}</span>
                    </div>

                    {/* Date */}
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-gray-500 dark:text-dark-500 kcs:text-kcs-500" />
                      <span className="text-sm text-gray-500 dark:text-dark-500 kcs:text-kcs-500">{formatDate(beat.created_at)}</span>
                    </div>

                    {/* Audio Player */}
                    <div className="pt-2">
                      <AudioPlayer 
                        src={beat.audio_url} 
                        title={beat.title}
                        className="w-full"
                      />
                    </div>

                    {/* Download Button */}
                    <div className="pt-2">
                      <a
                        href={beat.audio_url}
                        download
                        className="btn-secondary text-sm w-full justify-center"
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <div className="w-24 h-24 bg-gray-200 dark:bg-dark-700 kcs:bg-kcs-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Music className="w-12 h-12 text-gray-500 dark:text-dark-500 kcs:text-kcs-500" />
              </div>
              <h3 className="text-2xl font-semibold mb-4 theme-text">No Beats Found</h3>
              <p className="text-gray-600 dark:text-dark-400 kcs:text-kcs-400 max-w-md mx-auto">
                {filter === 'all' 
                  ? "I'm working on some amazing beats. Check back soon!"
                  : `No ${filter} beats at the moment.`
                }
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
