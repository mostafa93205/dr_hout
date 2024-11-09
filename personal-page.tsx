"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Facebook, Instagram, Linkedin, Youtube, MessageCircle } from 'lucide-react'

const socialIcons = {
  facebook: Facebook,
  discord: MessageCircle, // Using MessageCircle as an alternative for Discord
  instagram: Instagram,
  linkedin: Linkedin,
  youtube: Youtube,
}

const calculateAge = (dateOfBirth: string) => {
  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  let age = today.getFullYear() - birthDate.getFullYear()
  const monthDifference = today.getMonth() - birthDate.getMonth()
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

export default function Component() {
  const [activeSection, setActiveSection] = useState('')
  const [isNavScrolled, setIsNavScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      setIsNavScrolled(scrollPosition > 50)

      const sections = document.querySelectorAll('section')
      sections.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top
        const sectionId = section.getAttribute('id')
        if (sectionTop < window.innerHeight * 0.3 && sectionTop >= 0) {
          setActiveSection(sectionId || '')
        }
      })
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 70,
        behavior: 'smooth',
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-500 to-red-500 text-white">
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isNavScrolled ? 'bg-black/80 backdrop-blur-md py-2' : 'bg-transparent py-4'}`}>
        <ul className="flex justify-center space-x-6">
          {['info', 'certificates', 'education', 'social-media'].map((section) => (
            <li key={section}>
              <button
                onClick={() => scrollToSection(section)}
                className={`text-white hover:text-pink-300 transition-colors ${activeSection === section ? 'border-b-2 border-pink-300' : ''}`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1).replace('-', ' ')}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <header className="h-screen flex flex-col items-center justify-center text-center p-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
          className="mb-8"
        >
          <img src="/placeholder.svg?height=150&width=150" alt="Profile" className="w-40 h-40 rounded-full border-4 border-white shadow-lg" />
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-4xl font-bold mb-2"
        >
          Mostafa Emad Salah Hamdy
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-xl"
        >
          Passionate about Programming and Gaming
        </motion.p>
      </header>

      <AnimatePresence>
        {['info', 'certificates', 'education', 'social-media'].map((sectionId, index) => (
          <motion.section
            key={sectionId}
            id={sectionId}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="max-w-3xl mx-auto my-20 p-8 bg-white/10 backdrop-blur-md rounded-lg shadow-xl"
          >
            <h2 className="text-3xl font-bold mb-6 border-b-2 border-pink-300 pb-2">
              {sectionId.charAt(0).toUpperCase() + sectionId.slice(1).replace('-', ' ')}
            </h2>
            {sectionId === 'info' && (
              <div>
                <p className="mb-2"><strong>Age:</strong> {calculateAge('2005-03-09')}</p>
                <p><strong>Email:</strong> <a href="mailto:mostafaemad2005@gmail.com" className="hover:text-pink-300 transition-colors">mostafaemad2005@gmail.com</a></p>
              </div>
            )}
            {sectionId === 'certificates' && (
              <ul className="list-disc list-inside space-y-2">
                <li>Digital Marketing: Misr University for Science and Technology (MUST), 2024</li>
                <li>ISO 45001/2018: Occupational Safety and Health Management System</li>
                <li>Data Science: Completion Certificate from Moka Satar</li>
                <li>Python 101: Completion Certificate from Moka Satar</li>
                <li>Body Language & Business Etiquette: Almentor platform</li>
                <li>Attendance Certificate at Third International Biotechnology Conference, Mast University</li>
              </ul>
            )}
            {sectionId === 'education' && (
              <p>Faculty of Health Sciences - Health Administration&Informat</p>
            )}
            {sectionId === 'social-media' && (
              <div className="flex justify-center space-x-6">
                {[
                  { name: 'facebook', url: 'https://www.facebook.com/mommm93205' },
                  { name: 'discord', url: 'https://discord.com/users/705851962851196962' },
                  { name: 'instagram', url: 'https://www.instagram.com/lahn_alhout/' },
                  { name: 'linkedin', url: 'https://www.linkedin.com/in/mostafaelhout/' },
                  { name: 'youtube', url: 'https://www.youtube.com/@elhoutGaming' },
                ].map((social) => {
                  const Icon = socialIcons[social.name as keyof typeof socialIcons]
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white hover:text-pink-300 transition-colors"
                    >
                      <Icon size={32} />
                    </a>
                  )
                })}
              </div>
            )}
          </motion.section>
        ))}
      </AnimatePresence>

      <footer className="bg-black/80 text-center py-4">
        <p>&copy; 2024 Mostafa Emad Salah Hamdy. All rights reserved.</p>
      </footer>
    </div>
  )
}