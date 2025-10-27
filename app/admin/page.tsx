'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Edit, 
  Trash2, 
  Save, 
  X, 
  Upload, 
  Code, 
  Music, 
  Settings,
  Eye,
  EyeOff
} from 'lucide-react'
import FileUpload from '@/components/FileUpload'

interface Project {
  id?: number
  title: string
  description: string
  image_url?: string
  project_url?: string
  github_url?: string
  technologies?: string
  status: string
}

interface Beat {
  id?: number
  title: string
  description?: string
  audio_url: string
  cover_image_url?: string
  genre?: string
  duration?: number
}

interface Settings {
  name: string
  bio: string
  tagline: string
  location: string
  email: string
  github_url: string
  linkedin_url: string
  twitter_url: string
  profile_image_url: string
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('projects')
  const [projects, setProjects] = useState<Project[]>([])
  const [beats, setBeats] = useState<Beat[]>([])
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [editingBeat, setEditingBeat] = useState<Beat | null>(null)
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showBeatForm, setShowBeatForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const [uploadingFile, setUploadingFile] = useState(false)
  const [settings, setSettings] = useState<Settings>({
    name: 'Your Name',
    bio: 'Passionate web developer using AI pair programming, creative graphic designer, and music producer.',
    tagline: 'Web Developer, Graphic Designer & Beatmaker',
    location: 'Your City, Country',
    email: 'contact@example.com',
    github_url: 'https://github.com',
    linkedin_url: 'https://linkedin.com',
    twitter_url: 'https://twitter.com',
    profile_image_url: '/images/profile.jpg'
  })

  useEffect(() => {
    fetchData()
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/settings')
      if (response.ok) {
        const data = await response.json()
        setSettings({ ...settings, ...data })
      }
    } catch (error) {
      console.error('Error fetching settings:', error)
    }
  }

  const fetchData = async () => {
    try {
      const [projectsRes, beatsRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/beats')
      ])
      
      const projectsData = await projectsRes.json()
      const beatsData = await beatsRes.json()
      
      setProjects(projectsData)
      setBeats(beatsData)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const uploadFile = async (file: File, type: 'audio' | 'image'): Promise<string> => {
    setUploadingFile(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', type)

      // Use the API route which has service role key
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const data = await response.json()
      return data.url
    } catch (error) {
      console.error('Upload error:', error)
      throw error
    } finally {
      setUploadingFile(false)
    }
  }

  const handleProjectSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const projectData = Object.fromEntries(formData.entries()) as any

    try {
      const method = editingProject ? 'PUT' : 'POST'
      const response = await fetch('/api/projects', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProject ? { ...projectData, id: editingProject.id } : projectData)
      })

      if (response.ok) {
        await fetchData()
        setShowProjectForm(false)
        setEditingProject(null)
      }
    } catch (error) {
      console.error('Error saving project:', error)
    }
  }

  const handleBeatSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const beatData = Object.fromEntries(formData.entries()) as any

    // Log the data being sent for debugging
    console.log('Submitting beat:', beatData)

    try {
      const method = editingBeat ? 'PUT' : 'POST'
      const response = await fetch('/api/beats', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingBeat ? { ...beatData, id: editingBeat.id } : beatData)
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('API error:', errorData)
        alert(`Error: ${errorData.error || 'Failed to save beat'}`)
        return
      }

      if (response.ok) {
        await fetchData()
        setShowBeatForm(false)
        setEditingBeat(null)
      }
    } catch (error) {
      console.error('Error saving beat:', error)
      alert('Failed to save beat. Please check console for details.')
    }
  }

  const handleDeleteProject = async (id: number) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await fetch(`/api/projects?id=${id}`, { method: 'DELETE' })
        await fetchData()
      } catch (error) {
        console.error('Error deleting project:', error)
      }
    }
  }

  const handleDeleteBeat = async (id: number) => {
    if (confirm('Are you sure you want to delete this beat?')) {
      try {
        await fetch(`/api/beats?id=${id}`, { method: 'DELETE' })
        await fetchData()
      } catch (error) {
        console.error('Error deleting beat:', error)
      }
    }
  }

  const handleSettingsSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData(e.target as HTMLFormElement)
    const settingsData = Object.fromEntries(formData.entries())
    
    try {
      const response = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settingsData)
      })
      
      if (!response.ok) {
        const errorData = await response.json()
        alert(`Error: ${errorData.error || 'Failed to save settings'}`)
        return
      }
      
      // Update state
      setSettings({ ...settings, ...settingsData } as Settings)
      alert('Settings saved successfully!')
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Failed to save settings')
    }
  }

  const tabs = [
    { id: 'projects', label: 'Projects', icon: Code },
    { id: 'beats', label: 'Beats', icon: Music },
    { id: 'settings', label: 'Settings', icon: Settings }
  ]

  return (
    <div className="min-h-screen bg-dark-900 pt-16">
      <div className="container-max py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-dark-400">Manage your portfolio content</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-dark-800 p-1 rounded-lg mb-8">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-600 text-white'
                    : 'text-dark-300 hover:text-white hover:bg-dark-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Projects</h2>
              <button
                onClick={() => {
                  setEditingProject(null)
                  setShowProjectForm(true)
                }}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Project</span>
              </button>
            </div>

            {/* Projects List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project.id} className="card">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold">{project.title}</h3>
                      <p className="text-dark-400 text-sm">{project.description}</p>
                      <span className={`inline-block px-2 py-1 rounded text-xs mt-2 ${
                        project.status === 'completed' 
                          ? 'bg-green-600 text-white' 
                          : project.status === 'in-progress'
                          ? 'bg-yellow-600 text-white'
                          : 'bg-blue-600 text-white'
                      }`}>
                        {project.status}
                      </span>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingProject(project)
                          setShowProjectForm(true)
                        }}
                        className="btn-secondary text-sm flex-1"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </button>
                      <button
                        onClick={() => project.id && handleDeleteProject(project.id)}
                        className="btn-secondary text-sm bg-red-600 hover:bg-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Beats Tab */}
        {activeTab === 'beats' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">Beats</h2>
              <button
                onClick={() => {
                  setEditingBeat(null)
                  setShowBeatForm(true)
                }}
                className="btn-primary flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Beat</span>
              </button>
            </div>

            {/* Beats List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {beats.map((beat) => (
                <div key={beat.id} className="card">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold">{beat.title}</h3>
                      {beat.description && (
                        <p className="text-dark-400 text-sm">{beat.description}</p>
                      )}
                      {beat.genre && (
                        <span className="inline-block px-2 py-1 rounded text-xs mt-2 bg-primary-600 text-white">
                          {beat.genre}
                        </span>
                      )}
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={() => {
                          setEditingBeat(beat)
                          setShowBeatForm(true)
                        }}
                        className="btn-secondary text-sm flex-1"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit
                      </button>
                      <button
                        onClick={() => beat.id && handleDeleteBeat(beat.id)}
                        className="btn-secondary text-sm bg-red-600 hover:bg-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-2xl font-semibold mb-6">Settings</h2>
            <div className="card max-w-2xl">
              <h3 className="text-lg font-semibold mb-4">Site Information</h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Site Title</label>
                  <input
                    type="text"
                    defaultValue="My Portfolio"
                    className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Site Description</label>
                  <textarea
                    defaultValue="Web Developer, Graphic Designer & Beatmaker"
                    rows={3}
                    className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Bio</label>
                  <textarea
                    defaultValue="Passionate web developer using AI pair programming, creative graphic designer, and music producer."
                    rows={4}
                    className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  />
                </div>
                <button type="submit" className="btn-primary">
                  <Save className="w-4 h-4 mr-2" />
                  Save Settings
                </button>
              </form>
            </div>
          </motion.div>
        )}

        {/* Project Form Modal */}
        {showProjectForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-dark-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">
                  {editingProject ? 'Edit Project' : 'Add New Project'}
                </h3>
                <button
                  onClick={() => {
                    setShowProjectForm(false)
                    setEditingProject(null)
                  }}
                  className="text-dark-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleProjectSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={editingProject?.title || ''}
                    required
                    className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description *</label>
                  <textarea
                    name="description"
                    defaultValue={editingProject?.description || ''}
                    required
                    rows={4}
                    className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Project URL</label>
                    <input
                      type="url"
                      name="project_url"
                      defaultValue={editingProject?.project_url || ''}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">GitHub URL</label>
                    <input
                      type="url"
                      name="github_url"
                      defaultValue={editingProject?.github_url || ''}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Technologies</label>
                  <input
                    type="text"
                    name="technologies"
                    defaultValue={editingProject?.technologies || ''}
                    placeholder="React, Next.js, TypeScript"
                    className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Status</label>
                  <select
                    name="status"
                    defaultValue={editingProject?.status || 'completed'}
                    className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  >
                    <option value="completed">Completed</option>
                    <option value="in-progress">In Progress</option>
                    <option value="planned">Planned</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Project Image</label>
                  <FileUpload
                    type="image"
                    accept="image/jpeg,image/png,image/webp"
                    onFileSelect={(file) => {
                      // File selected, will be uploaded when form is submitted
                    }}
                    onFileUpload={async (file) => {
                      const url = await uploadFile(file, 'image')
                      // Update the form field with the URL
                      const imageInput = document.querySelector('input[name="image_url"]') as HTMLInputElement
                      if (imageInput) imageInput.value = url
                      return url
                    }}
                  />
                  <input
                    type="hidden"
                    name="image_url"
                    defaultValue={editingProject?.image_url || ''}
                  />
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowProjectForm(false)
                      setEditingProject(null)
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    <Save className="w-4 h-4 mr-2" />
                    {editingProject ? 'Update' : 'Create'} Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Beat Form Modal */}
        {showBeatForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-dark-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold">
                  {editingBeat ? 'Edit Beat' : 'Add New Beat'}
                </h3>
                <button
                  onClick={() => {
                    setShowBeatForm(false)
                    setEditingBeat(null)
                  }}
                  className="text-dark-400 hover:text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleBeatSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Title *</label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={editingBeat?.title || ''}
                    required
                    className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Description</label>
                  <textarea
                    name="description"
                    defaultValue={editingBeat?.description || ''}
                    rows={3}
                    className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Audio File *</label>
                  <FileUpload
                    type="audio"
                    accept="audio/mpeg,audio/wav,audio/mp3,audio/ogg"
                    onFileSelect={(file) => {
                      // File selected, will be uploaded when form is submitted
                    }}
                    onFileUpload={async (file) => {
                      const url = await uploadFile(file, 'audio')
                      // Update the form field with the URL
                      const audioInput = document.querySelector('input[name="audio_url"]') as HTMLInputElement
                      if (audioInput) audioInput.value = url
                      return url
                    }}
                  />
                  <input
                    type="hidden"
                    name="audio_url"
                    defaultValue={editingBeat?.audio_url || ''}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Cover Image</label>
                  <FileUpload
                    type="image"
                    accept="image/jpeg,image/png,image/webp"
                    onFileSelect={(file) => {
                      // File selected, will be uploaded when form is submitted
                    }}
                    onFileUpload={async (file) => {
                      const url = await uploadFile(file, 'image')
                      // Update the form field with the URL
                      const imageInput = document.querySelector('input[name="cover_image_url"]') as HTMLInputElement
                      if (imageInput) imageInput.value = url
                      return url
                    }}
                  />
                  <input
                    type="hidden"
                    name="cover_image_url"
                    defaultValue={editingBeat?.cover_image_url || ''}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Genre</label>
                    <select
                      name="genre"
                      defaultValue={editingBeat?.genre || ''}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                    >
                      <option value="">Select Genre</option>
                      <option value="hip-hop">Hip Hop</option>
                      <option value="trap">Trap</option>
                      <option value="r&b">R&B</option>
                      <option value="electronic">Electronic</option>
                      <option value="ambient">Ambient</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Duration (seconds)</label>
                    <input
                      type="number"
                      name="duration"
                      defaultValue={editingBeat?.duration || ''}
                      className="w-full px-3 py-2 bg-dark-700 border border-dark-600 rounded-lg text-white focus:outline-none focus:border-primary-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowBeatForm(false)
                      setEditingBeat(null)
                    }}
                    className="btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    <Save className="w-4 h-4 mr-2" />
                    {editingBeat ? 'Update' : 'Create'} Beat
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
