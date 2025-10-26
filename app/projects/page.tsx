'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ExternalLink, Github, Calendar, Tag } from 'lucide-react'

interface Project {
  id: number
  title: string
  description: string
  image_url?: string
  project_url?: string
  github_url?: string
  technologies?: string
  status: string
  created_at: string
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchProjects()
  }, [filter])

  const fetchProjects = async () => {
    try {
      const url = filter === 'all' ? '/api/projects' : `/api/projects?status=${filter}`
      const response = await fetch(url)
      const data = await response.json()
      setProjects(data)
    } catch (error) {
      console.error('Error fetching projects:', error)
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

  const filters = [
    { key: 'all', label: 'All Projects' },
    { key: 'completed', label: 'Completed' },
    { key: 'in-progress', label: 'In Progress' },
    { key: 'planned', label: 'Planned' }
  ]

  return (
    <div className="pt-16">
      {/* Header */}
      <section className="section-padding bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold">My Projects</h1>
            <p className="text-xl text-dark-300 max-w-3xl mx-auto">
              A collection of web development projects showcasing my skills in modern technologies and AI-assisted development.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-dark-800">
        <div className="container-max">
          <div className="flex flex-wrap justify-center gap-4">
            {filters.map((filterOption) => (
              <button
                key={filterOption.key}
                onClick={() => setFilter(filterOption.key)}
                className={`px-6 py-2 rounded-full transition-colors duration-200 ${
                  filter === filterOption.key
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-700 text-dark-300 hover:bg-dark-600'
                }`}
              >
                {filterOption.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="section-padding">
        <div className="container-max">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="card animate-pulse">
                  <div className="w-full h-48 bg-dark-700 rounded-lg mb-4"></div>
                  <div className="h-4 bg-dark-700 rounded mb-2"></div>
                  <div className="h-3 bg-dark-700 rounded mb-4"></div>
                  <div className="h-3 bg-dark-700 rounded w-2/3"></div>
                </div>
              ))}
            </div>
          ) : projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="card group hover:scale-105 transition-transform duration-300"
                >
                  {/* Project Image */}
                  <div className="relative w-full h-48 bg-gradient-to-br from-primary-500/20 to-primary-600/20 rounded-lg overflow-hidden mb-4">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <div className="w-16 h-16 bg-primary-600 rounded-lg flex items-center justify-center">
                          <ExternalLink className="w-8 h-8 text-white" />
                        </div>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'completed' 
                          ? 'bg-green-600 text-white' 
                          : project.status === 'in-progress'
                          ? 'bg-yellow-600 text-white'
                          : 'bg-blue-600 text-white'
                      }`}>
                        {project.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>

                  {/* Project Info */}
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                      <p className="text-dark-400 text-sm leading-relaxed">{project.description}</p>
                    </div>

                    {/* Technologies */}
                    {project.technologies && (
                      <div className="flex items-center space-x-2">
                        <Tag className="w-4 h-4 text-dark-500" />
                        <span className="text-sm text-dark-500">{project.technologies}</span>
                      </div>
                    )}

                    {/* Date */}
                    <div className="flex items-center space-x-2">
                      <Calendar className="w-4 h-4 text-dark-500" />
                      <span className="text-sm text-dark-500">{formatDate(project.created_at)}</span>
                    </div>

                    {/* Links */}
                    <div className="flex items-center space-x-4 pt-4">
                      {project.project_url && (
                        <a
                          href={project.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-primary text-sm"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          Live Demo
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary text-sm"
                        >
                          <Github className="w-4 h-4 mr-2" />
                          Code
                        </a>
                      )}
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
              <div className="w-24 h-24 bg-dark-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <ExternalLink className="w-12 h-12 text-dark-500" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">No Projects Found</h3>
              <p className="text-dark-400 max-w-md mx-auto">
                {filter === 'all' 
                  ? "I'm working on some amazing projects. Check back soon!"
                  : `No ${filter.replace('-', ' ')} projects at the moment.`
                }
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
