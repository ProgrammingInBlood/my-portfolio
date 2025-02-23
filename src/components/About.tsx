'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState, ReactNode, useRef } from 'react'
import { SiReact, SiNodedotjs, SiNextdotjs, SiThreedotjs, SiMongodb, SiPostgresql, SiPrisma, SiExpo, SiSocketdotio, SiTailwindcss, SiDigitalocean, SiNginx, SiBun, SiTypescript, SiJavascript } from 'react-icons/si'
import { FaAws, FaUser, FaCode, FaHeart } from 'react-icons/fa'

interface SkillItem {
  name: string;
  icon: keyof typeof iconMap;
}

interface SkillGroup {
  [key: string]: SkillItem[] | { [key: string]: SkillItem[] };
}

const commands = [
  { 
    command: 'whoami',
    output: (
      <div className="flex items-center gap-3">
        <FaUser className="text-accent-1 text-xl" />
        <span>Eklavya Raj | Full Stack Developer</span>
      </div>
    )
  },
  { 
    command: 'cat languages.json',
    output: `{
  "languages": [
    { "name": "TypeScript", "icon": "typescript" },
    { "name": "JavaScript", "icon": "javascript" }
  ]
}`
  },
  { 
    command: 'cat frontend.json',
    output: `{
  "frontend": {
    "web": [
      { "name": "React", "icon": "react" },
      { "name": "Next.js", "icon": "nextjs" },
      { "name": "Three.js", "icon": "threejs" },
      { "name": "Tailwind", "icon": "tailwind" }
    ],
    "mobile": [
      { "name": "React Native", "icon": "react" },
      { "name": "Expo", "icon": "expo" }
    ]
  }
}`
  },
  { 
    command: 'cat backend.json',
    output: `{
  "backend": {
    "runtime": [
      { "name": "Node.js", "icon": "nodejs" },
      { "name": "Bun", "icon": "bun" }
    ],
    "frameworks": [
      { "name": "Express", "icon": "nodejs" },
      { "name": "Socket.io", "icon": "socketio" }
    ],
    "databases": {
      "sql": [
        { "name": "PostgreSQL", "icon": "postgresql" },
        { "name": "Prisma", "icon": "prisma" }
      ],
      "nosql": [
        { "name": "MongoDB", "icon": "mongodb" }
      ]
    }
  }
}`
  },
  { 
    command: 'cat devops.json',
    output: `{
  "devops": {
    "cloud": [
      { "name": "AWS", "icon": "aws" },
      { "name": "Digital Ocean", "icon": "digitalocean" }
    ],
    "server": [
      { "name": "Nginx", "icon": "nginx" }
    ]
  }
}`
  },
  {
    command: 'cat achievements.md',
    output: (
      <div className="space-y-3">
        <h1 className="text-xl font-bold text-accent-1 mb-4 flex items-center gap-2">
          <FaCode className="text-xl" /> Key Achievements
        </h1>
        <div className="space-y-2">
          <div className="flex items-start space-x-2 text-gray-300">
            <span className="text-accent-2">-</span>
            <span>Built and scaled applications serving 100k+ users</span>
          </div>
          <div className="flex items-start space-x-2 text-gray-300">
            <span className="text-accent-2">-</span>
            <span>Reduced loading times by 60% through optimization</span>
          </div>
          <div className="flex items-start space-x-2 text-gray-300">
            <span className="text-accent-2">-</span>
            <span>Implemented microservices architecture</span>
          </div>
          <div className="flex items-start space-x-2 text-gray-300">
            <span className="text-accent-2">-</span>
            <span>Led development of enterprise solutions</span>
          </div>
          <div className="flex items-start space-x-2 text-gray-300">
            <span className="text-accent-2">-</span>
            <span>Mentored junior developers</span>
          </div>
        </div>
      </div>
    )
  },
  {
    command: 'cat passions.txt',
    output: (
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-4">
          <FaHeart className="text-accent-1 text-xl" />
          <span>I&apos;m passionate about crafting exceptional digital experiences that combine 
cutting-edge technology with elegant design. My focus areas include:</span>
        </div>
        <div className="space-y-2">
          <div className="flex items-start space-x-2 text-gray-300">
            <span className="text-accent-2">▪</span>
            <span>Building scalable web applications</span>
          </div>
          <div className="flex items-start space-x-2 text-gray-300">
            <span className="text-accent-2">▪</span>
            <span>Exploring emerging technologies</span>
          </div>
          <div className="flex items-start space-x-2 text-gray-300">
            <span className="text-accent-2">▪</span>
            <span>Contributing to open source</span>
          </div>
          <div className="flex items-start space-x-2 text-gray-300">
            <span className="text-accent-2">▪</span>
            <span>Solving complex challenges</span>
          </div>
          <div className="flex items-start space-x-2 text-gray-300">
            <span className="text-accent-2">▪</span>
            <span>Continuous learning</span>
          </div>
        </div>
      </div>
    )
  }
]

const iconMap = {
  typescript: <SiTypescript className="text-[#3178C6] text-xl" />,
  javascript: <SiJavascript className="text-[#F7DF1E] text-xl" />,
  react: <SiReact className="text-[#61DAFB] text-xl" />,
  nextjs: <SiNextdotjs className="text-white text-xl" />,
  threejs: <SiThreedotjs className="text-white text-xl" />,
  tailwind: <SiTailwindcss className="text-[#38B2AC] text-xl" />,
  expo: <SiExpo className="text-white text-xl" />,
  nodejs: <SiNodedotjs className="text-[#339933] text-xl" />,
  bun: <SiBun className="text-[#fbf0df] text-xl" />,
  socketio: <SiSocketdotio className="text-white text-xl" />,
  postgresql: <SiPostgresql className="text-[#336791] text-xl" />,
  prisma: <SiPrisma className="text-white text-xl" />,
  mongodb: <SiMongodb className="text-[#47A248] text-xl" />,
  aws: <FaAws className="text-[#FF9900] text-xl" />,
  digitalocean: <SiDigitalocean className="text-[#0080FF] text-xl" />,
  nginx: <SiNginx className="text-[#009639] text-xl" />
}

export default function About() {
  const [commandIndex, setCommandIndex] = useState(0)
  const [typedCommand, setTypedCommand] = useState('')
  const [showOutput, setShowOutput] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTo({
        top: terminalRef.current.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [commandIndex, showOutput])

  useEffect(() => {
    if (!inView || commandIndex >= commands.length) return

    const currentCommand = commands[commandIndex].command
    
    if (typedCommand.length < currentCommand.length) {
      const timeout = setTimeout(() => {
        setTypedCommand(currentCommand.slice(0, typedCommand.length + 1))
      }, 50)
      return () => clearTimeout(timeout)
    } 
    
    if (!showOutput) {
      const timeout = setTimeout(() => {
        setShowOutput(true)
      }, 300)
      return () => clearTimeout(timeout)
    }

    const timeout = setTimeout(() => {
      setCommandIndex(commandIndex + 1)
      setTypedCommand('')
      setShowOutput(false)
    }, 2000)
    return () => clearTimeout(timeout)

  }, [inView, commandIndex, typedCommand, showOutput])

  const renderOutput = (output: string | ReactNode) => {
    if (typeof output !== 'string') {
      return output
    }

    try {
      const jsonData = JSON.parse(output) as SkillGroup
      return (
        <div className="space-y-4">
          {Object.entries(jsonData).map(([key, value]) => (
            <div key={key} className="space-y-2">
              <div className="text-accent-1 font-semibold">{key}:</div>
              {Array.isArray(value) ? (
                <div className="flex flex-wrap gap-2">
                  {value.map((item: SkillItem, i: number) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-2 py-1 rounded-md bg-accent-1/10"
                    >
                      {iconMap[item.icon]}
                      <span className="text-accent-2">{item.name}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="pl-4 space-y-2">
                  {Object.entries(value).map(([subKey, subValue]) => (
                    <div key={subKey}>
                      <span className="text-accent-2">{subKey}:</span>
                      {Array.isArray(subValue) ? (
                        <div className="flex flex-wrap gap-2 mt-1">
                          {subValue.map((item: SkillItem, i: number) => (
                            <div
                              key={i}
                              className="flex items-center gap-2 px-2 py-1 rounded-md bg-accent-1/10"
                            >
                              {iconMap[item.icon]}
                              <span className="text-accent-2">{item.name}</span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="pl-4 space-y-2">
                          {Object.entries(subValue).map(([subSubKey, subSubValue]) => (
                            <div key={subSubKey}>
                              <span className="text-accent-2">{subSubKey}:</span>
                              <div className="flex flex-wrap gap-2 mt-1">
                                {Array.isArray(subSubValue) && subSubValue.map((item: SkillItem, i: number) => (
                                  <div
                                    key={i}
                                    className="flex items-center gap-2 px-2 py-1 rounded-md bg-accent-1/10"
                                  >
                                    {iconMap[item.icon]}
                                    <span className="text-accent-2">{item.name}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )
    } catch {
      return output
    }
  }

  return (
    <section id="about" className="py-20 px-4 md:px-8">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            About Me
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Passionate about creating innovative solutions and exceptional user experiences
          </p>
        </div>

        <div className="glass backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl border border-accent-1/20">
          <div className="flex items-center gap-2 px-4 py-3 bg-black/40 border-b border-accent-1/20">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-2 text-sm text-gray-400 font-mono">eklavya@portfolio ~ </span>
          </div>
          
          <div ref={terminalRef} className="p-6 font-mono text-sm md:text-base bg-black/20 h-[400px] sm:h-[500px] md:h-[600px] overflow-y-auto custom-scrollbar">
            {commands.slice(0, commandIndex).map((cmd, i) => (
              <div key={i} className="mb-8">
                <div className="flex items-center gap-2 text-accent-2">
                  <span className="text-accent-1">❯</span>
                  <span>{cmd.command}</span>
                </div>
                <div className="mt-4 pl-4 border-l-2 border-accent-1/20">
                  {renderOutput(cmd.output)}
                </div>
              </div>
            ))}
            
            {commandIndex < commands.length && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 text-accent-2">
                  <span className="text-accent-1">❯</span>
                  <span>{typedCommand}</span>
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="w-2 h-5 bg-accent-1"
                  />
                </div>
                {showOutput && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pl-4 border-l-2 border-accent-1/20"
                  >
                    {renderOutput(commands[commandIndex].output)}
                  </motion.div>
                )}
              </motion.div>
            )}
          </div>
        </div>

        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar {
            width: 8px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-track {
            background: rgba(0, 0, 0, 0.2);
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb {
            background: var(--accent-1);
            border-radius: 4px;
          }
          
          .custom-scrollbar::-webkit-scrollbar-thumb:hover {
            background: var(--accent-2);
          }
        `}</style>
      </motion.div>
    </section>
  )
} 