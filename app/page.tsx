'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Code, Palette, Music, Github, ExternalLink, Linkedin, Twitter } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Home() {
  const [recentProjects, setRecentProjects] = useState([])
  const [recentBeats, setRecentBeats] = useState([])

  useEffect(() => {
    // Fetch recent projects and beats
    fetch('/api/projects?limit=3')
      .then(res => res.json())
      .then(data => setRecentProjects(data))
      .catch(err => console.error('Error fetching projects:', err))

    fetch('/api/beats?limit=3')
      .then(res => res.json())
      .then(data => setRecentBeats(data))
      .catch(err => console.error('Error fetching beats:', err))
  }, [])

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-dark-900 dark:via-dark-800 dark:to-dark-900 kcs:from-kcs-900 kcs:via-kcs-800 kcs:to-kcs-900">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="space-y-4">
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Hi, I'm{' '}
                  <span className="gradient-text">Your Name</span>
                </h1>
                <p className="text-xl text-gray-600 dark:text-dark-300 kcs:text-kcs-300 leading-relaxed">
                  Web Developer using AI pair programming, Graphic Designer & Beatmaker
                </p>
                <p className="text-lg text-gray-500 dark:text-dark-400 kcs:text-kcs-400">
                  I create digital experiences that blend technology, design, and music to tell compelling stories.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/projects" className="btn-primary inline-flex items-center space-x-2">
                  <span>View My Work</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/contact" className="btn-secondary">
                  Get In Touch
                </Link>
              </div>

              <div className="flex items-center space-x-6 pt-4">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-dark-400 hover:text-white transition-colors">
                  <Github className="w-6 h-6" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-dark-400 hover:text-white transition-colors">
                  <Linkedin className="w-6 h-6" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-dark-400 hover:text-white transition-colors">
                  <Twitter className="w-6 h-6" />
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative w-full h-96 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-2xl overflow-hidden">
                <img
                  src="/images/profile.jpg"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold">What I Do</h2>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              I combine technical expertise with creative vision to build amazing digital experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: 'Web Development',
                description: 'Building modern web applications using AI pair programming, React, Next.js, and cutting-edge technologies.',
                color: 'from-blue-500 to-blue-600'
              },
              {
                icon: Palette,
                title: 'Graphic Design',
                description: 'Creating stunning visual designs that communicate ideas effectively and engage audiences.',
                color: 'from-purple-500 to-purple-600'
              },
              {
                icon: Music,
                title: 'Beatmaking',
                description: 'Producing original beats and music that bring projects to life with rhythm and melody.',
                color: 'from-green-500 to-green-600'
              }
            ].map((skill, index) => (
              <motion.div
                key={skill.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${skill.color} rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <skill.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{skill.title}</h3>
                <p className="text-dark-400">{skill.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Work Section */}
      <section className="section-padding bg-dark-800">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Recent Work</h2>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              Check out some of my latest projects and beats
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Projects */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold">Latest Projects</h3>
                <Link href="/projects" className="text-primary-500 hover:text-primary-400 transition-colors flex items-center space-x-1">
                  <span>View All</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentProjects.length > 0 ? (
                  recentProjects.map((project: any) => (
                    <div key={project.id} className="card hover:bg-dark-700 transition-colors">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Code className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{project.title}</h4>
                          <p className="text-dark-400 text-sm mb-2">{project.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-dark-500">
                            <span>{project.technologies}</span>
                            <span>{project.status}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="card text-center py-8">
                    <Code className="w-12 h-12 text-dark-600 mx-auto mb-4" />
                    <p className="text-dark-400">No projects yet. Check back soon!</p>
                  </div>
                )}
              </div>
            </motion.div>

            {/* Recent Beats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-semibold">Latest Beats</h3>
                <Link href="/beats" className="text-primary-500 hover:text-primary-400 transition-colors flex items-center space-x-1">
                  <span>View All</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
              
              <div className="space-y-4">
                {recentBeats.length > 0 ? (
                  recentBeats.map((beat: any) => (
                    <div key={beat.id} className="card hover:bg-dark-700 transition-colors">
                      <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Music className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-2">{beat.title}</h4>
                          <p className="text-dark-400 text-sm mb-2">{beat.description}</p>
                          <div className="flex items-center space-x-4 text-xs text-dark-500">
                            <span>{beat.genre}</span>
                            <span>{beat.duration ? `${Math.floor(beat.duration / 60)}:${(beat.duration % 60).toString().padStart(2, '0')}` : 'N/A'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="card text-center py-8">
                    <Music className="w-12 h-12 text-dark-600 mx-auto mb-4" />
                    <p className="text-dark-400">No beats yet. Check back soon!</p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Let's Work Together</h2>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              Have a project in mind? I'd love to hear about it. Let's create something amazing together.
            </p>
            <Link href="/contact" className="btn-primary inline-flex items-center space-x-2">
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
