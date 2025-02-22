'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'A full-stack e-commerce solution with real-time inventory, secure payments, and admin dashboard. Features include user authentication, product management, and analytics.',
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Redux', 'Stripe', 'WebSocket'],
    image: '/project1.jpg',
    link: '#',
    github: '#'
  },
  {
    title: 'Task Management System',
    description: 'Enterprise-grade project management tool with real-time collaboration, task tracking, and team communication features. Includes Kanban boards and timeline views.',
    tech: ['React', 'Express', 'MongoDB', 'Socket.io', 'JWT', 'Redis'],
    image: '/project2.jpg',
    link: '#',
    github: '#'
  },
  {
    title: 'AI-Powered Analytics Dashboard',
    description: 'Data visualization platform that leverages machine learning for predictive analytics. Features interactive charts, custom reporting, and automated insights.',
    tech: ['React', 'Python', 'TensorFlow', 'D3.js', 'FastAPI', 'PostgreSQL'],
    image: '/project3.jpg',
    link: '#',
    github: '#'
  }
]

export default function Projects() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <section id="projects" className="py-20 px-4 md:px-8">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Featured Projects
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Explore some of my recent work showcasing full-stack development expertise and problem-solving capabilities
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="card group"
            >
              <div className="aspect-video relative bg-gradient-to-br from-accent-1/20 to-accent-2/20">
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-all duration-300" />
              </div>
              <div className="p-6 space-y-4">
                <h3 className="text-2xl font-bold text-white group-hover:gradient-text transition-all duration-300">
                  {project.title}
                </h3>
                <p className="text-gray-300 line-clamp-3">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 glass rounded-full text-sm text-accent-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4 pt-4">
                  <a
                    href={project.link}
                    className="btn-primary flex-1 text-center"
                  >
                    Live Demo
                  </a>
                  <a
                    href={project.github}
                    className="btn-secondary flex-1 text-center"
                  >
                    View Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
} 