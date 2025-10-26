// Sample data insertion script
import db from './lib/database'

// Insert sample projects
const sampleProjects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce platform built with Next.js, featuring AI-powered product recommendations and seamless payment integration.',
    image_url: '/images/project1.jpg',
    project_url: 'https://example-ecommerce.com',
    github_url: 'https://github.com/username/ecommerce-platform',
    technologies: 'Next.js, TypeScript, Stripe, PostgreSQL',
    status: 'completed'
  },
  {
    title: 'Music Streaming App',
    description: 'A modern music streaming application with real-time collaboration features and AI-generated playlists.',
    image_url: '/images/project2.jpg',
    project_url: 'https://example-music.com',
    github_url: 'https://github.com/username/music-app',
    technologies: 'React, Node.js, WebRTC, MongoDB',
    status: 'in-progress'
  },
  {
    title: 'Portfolio Website',
    description: 'A responsive portfolio website showcasing creative work with smooth animations and modern design.',
    image_url: '/images/project3.jpg',
    project_url: 'https://example-portfolio.com',
    github_url: 'https://github.com/username/portfolio',
    technologies: 'Next.js, Tailwind CSS, Framer Motion',
    status: 'completed'
  }
]

// Insert sample beats
const sampleBeats = [
  {
    title: 'Midnight Vibes',
    description: 'A smooth hip-hop beat perfect for late-night sessions and introspective lyrics.',
    audio_url: '/uploads/audio/midnight-vibes.mp3',
    cover_image_url: '/images/beat1.jpg',
    genre: 'hip-hop',
    duration: 180
  },
  {
    title: 'Digital Dreams',
    description: 'An electronic ambient track that blends synthetic sounds with organic elements.',
    audio_url: '/uploads/audio/digital-dreams.mp3',
    cover_image_url: '/images/beat2.jpg',
    genre: 'electronic',
    duration: 240
  },
  {
    title: 'Urban Trap',
    description: 'Hard-hitting trap beat with heavy 808s and atmospheric melodies.',
    audio_url: '/uploads/audio/urban-trap.mp3',
    cover_image_url: '/images/beat3.jpg',
    genre: 'trap',
    duration: 200
  }
]

// Insert sample data
sampleProjects.forEach(project => {
  db.prepare(`
    INSERT OR IGNORE INTO projects (title, description, image_url, project_url, github_url, technologies, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `).run(project.title, project.description, project.image_url, project.project_url, project.github_url, project.technologies, project.status)
})

sampleBeats.forEach(beat => {
  db.prepare(`
    INSERT OR IGNORE INTO beats (title, description, audio_url, cover_image_url, genre, duration)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(beat.title, beat.description, beat.audio_url, beat.cover_image_url, beat.genre, beat.duration)
})

console.log('Sample data inserted successfully!')
