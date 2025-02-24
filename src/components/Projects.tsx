'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import Image from 'next/image'

const projects = [
  {
    title: 'Joyztick',
    description: 'Next-gen gaming community platform featuring game discovery, tournament systems, real-time chat, and comprehensive stats tracking. Built with modern stack and gaming-inspired UI/UX.',
    tech: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'RAWG API', 'React Query'],
    image: '/projects/joyztick.png',
    link: 'https://joyztick.com',
    github: 'https://github.com/ProgrammingInBlood/joyztick-next-frontend'
  },
  {
    title: 'DBZ Beds',
    description: 'A comprehensive e-commerce platform for luxury beds and furniture. Features include product customization with bed size/type variations, integrated payment solutions, and a custom bed builder. Built with focus on user experience and performance.',
    tech: ['Next.js', 'Node.js', 'MongoDB', 'AWS', 'Nginx', 'Tailwind CSS', 'Stripe'],
    image: '/projects/dbzbeds.png',
    link: 'https://www.dbzbeds.co.uk',
    github: null // NDA project
  },
  {
    title: 'Beds Divans',
    description: 'A comprehensive e-commerce platform for luxury beds and furniture. Features include product customization, real-time inventory management, and secure payments with Klarna integration.',
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Klarna', 'Digital Ocean', 'Nginx', 'Tailwind CSS'],
    image: '/projects/bedsdivans.png',
    link: 'https://bedsdivans.co.uk',
    github: null // NDA project
  },
  {
    title: 'Tiny Miny Mo',
    description: "An innovative e-commerce solution for children's clothing and accessories. Features include advanced filtering, wishlist functionality, and secure payments with Razorpay integration.",
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Razorpay', 'AWS', 'Tailwind CSS'],
    image: '/projects/tinyminymo.jpg',
    link: 'https://www.tinyminymo.com',
    github: 'https://github.com/ProgrammingInBlood/tinyminymo-public-preview'
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
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              className="card group"
            >
              <div className="aspect-video relative overflow-hidden rounded-t-xl">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw"
                  priority={index === 0}
                />
                <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-all duration-300" />
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
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex-1 text-center"
                  >
                    Visit Site
                  </a>
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-secondary flex-1 text-center"
                    >
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
} 