import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, Phone, Globe } from 'lucide-react';

export default function Developer() {
  const developer = {
    name: "Laxman Reddy Kotta",
    role: "Full Stack Developer",
    bio: "Passionate full-stack developer with expertise in React, Node.js, and modern web technologies. Committed to creating efficient, scalable, and user-friendly applications.",
    image: "https://i.ibb.co/cRqjT7C/Whats-App-Image-2025-03-10-at-11-46-13-AM.jpg",
    skills: [
      "React.js", "Node.js", "TypeScript", "MongoDB", "Express.js",
      "Next.js", "Tailwind CSS", "GraphQL", "AWS", "Docker"
    ],
    contact: {
      email: "kottalaxmanreddyyoyo@gmail.com",
      phone: "+91 6302429077",
      github: "https://github.com",
      linkedin: "https://www.linkedin.com/in/laxman-reddy-kotta-1510512bb/",
      portfolio: "https://laxman-portfolio.vercel.app"
    },
    projects: [
      {
        name: "Visakha Tech Solutions",
        description: "A comprehensive website for an electro-mechanical solutions company featuring modern design and full responsiveness.",
        tech: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"]
      },
      {
        name: "Portfolio Website",
        description: "Personal portfolio showcasing projects and skills with interactive animations.",
        tech: ["Next.js", "Tailwind CSS", "Three.js"]
      }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-20">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="relative w-40 h-40 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
            <img
              src={developer.image}
              alt={developer.name}
              className="relative w-40 h-40 rounded-full object-cover border-4 border-white/10"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {developer.name}
          </h1>
          <p className="text-xl text-gray-400 mb-6">{developer.role}</p>
          <p className="max-w-2xl mx-auto text-gray-300">{developer.bio}</p>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Technical Skills</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {developer.skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="px-4 py-2 bg-white/5 rounded-full border border-white/10 hover:border-blue-500/50 hover:bg-white/10 transition-all duration-300"
              >
                {skill}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold mb-8 text-center">Recent Projects</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {developer.projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold mb-3">{project.name}</h3>
                <p className="text-gray-400 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-sm px-3 py-1 bg-blue-500/10 rounded-full text-blue-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Contact Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold mb-8">Get in Touch</h2>
          <div className="flex flex-wrap justify-center gap-6">
            <a
              href={`mailto:${developer.contact.email}`}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
              <span>{developer.contact.email}</span>
            </a>
            <a
              href={`tel:${developer.contact.phone}`}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              <span>{developer.contact.phone}</span>
            </a>
            <a
              href={developer.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              <Github className="w-5 h-5" />
              <span>GitHub</span>
            </a>
            <a
              href={developer.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              <Linkedin className="w-5 h-5" />
              <span>LinkedIn</span>
            </a>
            <a
              href={developer.contact.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full hover:bg-white/10 transition-all duration-300"
            >
              <Globe className="w-5 h-5" />
              <span>Portfolio</span>
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
}