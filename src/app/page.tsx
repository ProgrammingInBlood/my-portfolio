'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Float, MeshDistortMaterial, TorusKnot, Sphere, Box } from '@react-three/drei'
import { useEffect, useState, useRef, Suspense } from 'react'
import Projects from '@/components/Projects'
import About from '@/components/About'
import { SiReact, SiNodedotjs, SiNextdotjs, SiThreedotjs, SiMongodb, SiPostgresql } from 'react-icons/si'
import { FaAws } from 'react-icons/fa'

interface SceneProps {
  mousePosition: { x: number; y: number };
}

interface AnimatedTextProps {
  text: string;
  delay?: number;
}

const Scene = ({ mousePosition }: SceneProps) => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 2, 5]} intensity={1} />
      <Float
        speed={2}
        rotationIntensity={2}
        floatIntensity={2}
      >
        <TorusKnot args={[1, 0.3, 128, 16]}>
          <MeshDistortMaterial
            color="var(--accent-1)"
            roughness={0.1}
            metalness={0.8}
            distort={0.4}
            speed={2}
          />
        </TorusKnot>
      </Float>
      <group position={[mousePosition.x * 3, mousePosition.y * 3, 0]}>
        <Sphere args={[0.3, 32, 32]}>
          <MeshDistortMaterial
            color="var(--accent-2)"
            speed={4}
            distort={0.5}
          />
        </Sphere>
      </group>
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={3}
      />
    </>
  )
}

const AnimatedText = ({ text, delay = 0 }: AnimatedTextProps) => (
  <motion.span
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="inline-block"
  >
    {text}
  </motion.span>
)

const technologies = [
  { name: 'Next.js', icon: <SiNextdotjs className="text-white text-2xl" /> },
  { name: 'React', icon: <SiReact className="text-[#61DAFB] text-2xl" /> },
  { name: 'React Native', icon: <SiReact className="text-[#61DAFB] text-2xl" /> },
  { name: 'Three.js', icon: <SiThreedotjs className="text-white text-2xl" /> },
  { name: 'Node.js', icon: <SiNodedotjs className="text-[#339933] text-2xl" /> },
  { name: 'MongoDB', icon: <SiMongodb className="text-[#47A248] text-2xl" /> },
  { name: 'PostgreSQL', icon: <SiPostgresql className="text-[#336791] text-2xl" /> },
  { name: 'AWS', icon: <FaAws className="text-[#FF9900] text-2xl" /> }
]

export default function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setFormStatus('sending')
    
    try {
      const form = e.currentTarget
      const response = await fetch('https://formspree.io/f/xgvoqayp', {
        method: 'POST',
        body: new FormData(form),
        headers: {
          'Accept': 'application/json'
        }
      })
      
      if (response.ok) {
        setFormStatus('sent')
        form.reset()
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      setFormStatus('error')
    }
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <div ref={containerRef} className="relative h-screen grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden">
        {/* Left Content */}
        <div className="relative z-10 flex flex-col justify-center px-8 lg:px-16">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h1 className="text-5xl lg:text-7xl font-bold space-y-4">
              <AnimatedText text="Building" delay={0.2} />
              <br />
              <AnimatedText text="Digital" delay={0.3} />
              <br />
              <AnimatedText text="Experiences" delay={0.4} />
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-gray-300 max-w-lg"
            >
              5+ years of expertise in crafting scalable applications 
              and innovative solutions for complex problems.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              {technologies.map(({ name, icon }, index) => (
                <motion.div
                  key={name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.1 + 0.8 }}
                  className="glass px-4 py-2 rounded-full flex items-center space-x-2"
                >
                  <span role="img" aria-label={name}>{icon}</span>
                  <span>{name}</span>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex gap-6 pt-8"
            >
              <a href="#projects" className="btn-primary">
                View Projects
              </a>
              <a href="#contact" className="btn-secondary">
                Get in Touch
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Right 3D Scene */}
        <div className="absolute lg:relative inset-0 w-full h-full opacity-20 lg:opacity-100">
          <Canvas
            camera={{ position: [0, 0, 8], fov: 45 }}
            gl={{ antialias: true }}
            dpr={[1, 2]}
          >
            <color attach="background" args={['transparent']} />
            <fog attach="fog" args={['#000', 5, 15]} />
            <Suspense fallback={null}>
              <Scene mousePosition={mousePosition} />
            </Suspense>
          </Canvas>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ 
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            className="flex flex-col items-center"
          >
            <span className="text-sm text-accent-1 font-mono mb-2">Scroll</span>
            <div className="w-5 h-9 border-2 border-accent-1 rounded-full flex justify-center p-1">
              <motion.div
                animate={{ 
                  y: [0, 12, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                }}
                className="w-1.5 h-1.5 bg-accent-1 rounded-full"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* About Section */}
      <About />

      {/* Projects Section */}
      <Projects />

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-8 gradient-text">
            Let's Create Something Amazing
          </h2>
          <p className="text-gray-300 mb-12 text-lg">
            Ready to bring your vision to life? I'm here to help transform your ideas into reality.
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto glass p-8 rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm text-gray-400 block text-left">Name</label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="What should I call you?"
                  className="input"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400 block text-left">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Where can I reach you?"
                  className="input"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400 block text-left">Subject</label>
              <input
                type="text"
                name="subject"
                required
                placeholder="What's this about? (e.g., Website Project, App Development)"
                className="input"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-gray-400 block text-left">Message</label>
              <textarea
                name="message"
                required
                placeholder="Tell me about your project goals, timeline, and any specific features you have in mind..."
                rows={6}
                className="input"
              />
            </div>
            <button
              type="submit"
              disabled={formStatus === 'sending'}
              className="btn-primary w-full py-4 relative"
            >
              {formStatus === 'sending' ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Sending...
                </span>
              ) : formStatus === 'sent' ? (
                'Message Sent!'
              ) : formStatus === 'error' ? (
                'Failed to send - Try Again'
              ) : (
                'Send Message'
              )}
            </button>
          </form>

          <div className="mt-16 flex justify-center gap-8">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:drop-shadow-lg hover:shadow-white"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:drop-shadow-lg hover:shadow-white"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
            </a>
            <a href="https://wa.me/919063259072" target="_blank" rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-all duration-300 transform hover:scale-110 hover:drop-shadow-lg hover:shadow-white"
            >
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  )
}
