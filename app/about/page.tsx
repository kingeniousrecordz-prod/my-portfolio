'use client'

import { motion } from 'framer-motion'
import { Code, Palette, Music, Coffee, MapPin, Mail, Github, Linkedin, Twitter } from 'lucide-react'

export default function About() {
  const skills = [
    { category: 'Frontend', items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'] },
    { category: 'Backend', items: ['Node.js', 'Express', 'SQLite', 'REST APIs', 'Authentication'] },
    { category: 'Design', items: ['Figma', 'Adobe Creative Suite', 'UI/UX Design', 'Branding', 'Typography'] },
    { category: 'Music', items: ['FL Studio', 'Ableton Live', 'Sound Design', 'Mixing', 'Mastering'] }
  ]

  const experiences = [
    {
      title: 'Web Developer',
      company: 'Freelance',
      period: '2023 - Present',
      description: 'Building modern web applications using AI pair programming and cutting-edge technologies.'
    },
    {
      title: 'Graphic Designer',
      company: 'Creative Agency',
      period: '2022 - 2023',
      description: 'Creating visual designs and branding solutions for various clients and projects.'
    },
    {
      title: 'Music Producer',
      company: 'Independent',
      period: '2021 - Present',
      description: 'Producing original beats and music for artists and multimedia projects.'
    }
  ]

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h1 className="text-4xl md:text-5xl font-bold">
                About <span className="gradient-text">Me</span>
              </h1>
              <p className="text-xl text-dark-300 leading-relaxed">
                I'm a passionate web developer who loves creating digital experiences that blend technology, design, and creativity.
              </p>
              <p className="text-lg text-dark-400">
                With expertise in modern web technologies and AI-assisted development, I build applications that are not only functional but also beautiful and engaging. When I'm not coding, you'll find me designing graphics or producing beats.
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-5 h-5 text-primary-500" />
                  <span className="text-dark-300">Your City, Country</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Coffee className="w-5 h-5 text-primary-500" />
                  <span className="text-dark-300">Available for work</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
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
            <h2 className="text-3xl md:text-4xl font-bold">Skills & Expertise</h2>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              A comprehensive overview of my technical skills and creative abilities
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={skillGroup.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card"
              >
                <h3 className="text-xl font-semibold mb-6">{skillGroup.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-2 bg-dark-700 rounded-full text-sm text-dark-300 hover:bg-primary-600 hover:text-white transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="section-padding bg-dark-800">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-4 mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Experience</h2>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              My journey in web development, design, and music production
            </p>
          </motion.div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card"
              >
                <div className="flex items-start space-x-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center flex-shrink-0">
                    {index === 0 && <Code className="w-6 h-6 text-white" />}
                    {index === 1 && <Palette className="w-6 h-6 text-white" />}
                    {index === 2 && <Music className="w-6 h-6 text-white" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                      <h3 className="text-xl font-semibold">{exp.title}</h3>
                      <span className="text-primary-500 font-medium">{exp.period}</span>
                    </div>
                    <p className="text-primary-400 font-medium mb-3">{exp.company}</p>
                    <p className="text-dark-400">{exp.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="section-padding">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">My Philosophy</h2>
            <div className="max-w-4xl mx-auto space-y-6">
              <p className="text-xl text-dark-300 leading-relaxed">
                "I believe that great digital experiences come from the intersection of technology, design, and human emotion. 
                Every line of code, every pixel, and every beat should serve a purpose and tell a story."
              </p>
              <p className="text-lg text-dark-400">
                My approach combines technical excellence with creative vision, always keeping the end user in mind. 
                I'm passionate about using AI-assisted development to push the boundaries of what's possible while maintaining 
                clean, maintainable code and beautiful, intuitive interfaces.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section-padding bg-dark-800">
        <div className="container-max">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold">Let's Connect</h2>
            <p className="text-dark-400 text-lg max-w-2xl mx-auto">
              I'm always interested in new opportunities and collaborations. Let's create something amazing together!
            </p>
            <div className="flex justify-center space-x-6">
              <a href="mailto:contact@example.com" className="text-dark-400 hover:text-white transition-colors">
                <Mail className="w-6 h-6" />
              </a>
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
        </div>
      </section>
    </div>
  )
}
