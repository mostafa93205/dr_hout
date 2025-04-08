"use client"

import React from "react"

import { useState } from "react"
import { X, ChevronLeft, ChevronRight, Maximize, Minimize, Play, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollReveal } from "@/components/effects/scroll-reveal"

interface PresentationScreenProps {
  isOpen: boolean
  onClose: () => void
  isEnglish: boolean
}

export function PresentationScreen({ isOpen, onClose, isEnglish }: PresentationScreenProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // Presentation slides data
  const slides = [
    {
      title: { en: "Health Informatics Portfolio", ar: "محفظة المعلوماتية الصحية" },
      content: {
        en: "Welcome to my digital portfolio showcasing my work in Health Administration & Informatics",
        ar: "مرحبًا بكم في محفظتي الرقمية التي تعرض عملي في إدارة الصحة والمعلوماتية",
      },
      image: "/placeholder.svg?height=300&width=500",
      color: "from-primary/80 to-primary",
    },
    {
      title: { en: "Data Analysis Projects", ar: "مشاريع تحليل البيانات" },
      content: {
        en: "Leveraging Python and data science tools to extract insights from healthcare data",
        ar: "الاستفادة من بايثون وأدوات علوم البيانات لاستخراج رؤى من بيانات الرعاية الصحية",
      },
      image: "/placeholder.svg?height=300&width=500",
      color: "from-blue-500/80 to-blue-600",
    },
    {
      title: { en: "Hospital Management Systems", ar: "أنظمة إدارة المستشفيات" },
      content: {
        en: "Designing and implementing efficient systems for healthcare resource management",
        ar: "تصميم وتنفيذ أنظمة فعالة لإدارة موارد الرعاية الصحية",
      },
      image: "/placeholder.svg?height=300&width=500",
      color: "from-green-500/80 to-green-600",
    },
    {
      title: { en: "Digital Marketing Campaigns", ar: "حملات التسويق الرقمي" },
      content: {
        en: "Creating impactful digital marketing strategies for healthcare organizations",
        ar: "إنشاء استراتيجيات تسويق رقمي مؤثرة لمنظمات الرعاية الصحية",
      },
      image: "/placeholder.svg?height=300&width=500",
      color: "from-purple-500/80 to-purple-600",
    },
    {
      title: { en: "Contact Information", ar: "معلومات الاتصال" },
      content: {
        en: "Email: mommm93205@gmail.com\nPhone: +20 1061014803\nLocation: Cairo, Egypt",
        ar: "البريد الإلكتروني: mommm93205@gmail.com\nالهاتف: +20 1061014803\nالموقع: القاهرة، مصر",
      },
      image: null,
      color: "from-amber-500/80 to-amber-600",
    },
  ]

  // Handle fullscreen toggle
  const toggleFullscreen = () => {
    const presentationElement = document.getElementById("presentation-container")

    if (!isFullscreen) {
      if (presentationElement?.requestFullscreen) {
        presentationElement.requestFullscreen()
        setIsFullscreen(true)
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen()
        setIsFullscreen(false)
      }
    }
  }

  // Handle next slide
  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    } else {
      setCurrentSlide(0) // Loop back to the first slide
    }
  }

  // Handle previous slide
  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    } else {
      setCurrentSlide(slides.length - 1) // Loop to the last slide
    }
  }

  // Handle auto-play
  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  // Effect for auto-play
  React.useEffect(() => {
    let interval: NodeJS.Timeout | null = null

    if (isPlaying) {
      interval = setInterval(() => {
        nextSlide()
      }, 5000) // Change slide every 5 seconds
    }

    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isPlaying, currentSlide])

  // Handle keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return

      switch (e.key) {
        case "ArrowRight":
          nextSlide()
          break
        case "ArrowLeft":
          prevSlide()
          break
        case "Escape":
          onClose()
          break
        case "f":
          toggleFullscreen()
          break
        case " ": // Space bar
          togglePlay()
          break
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, currentSlide, isPlaying])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div
        id="presentation-container"
        className={`relative w-full max-w-5xl mx-auto transition-all duration-300 ${isFullscreen ? "h-screen" : "h-[80vh]"}`}
      >
        {/* Presentation controls */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={togglePlay}
            className="rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Slide navigation */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={prevSlide}
            className="rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
        </div>

        <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={nextSlide}
            className="rounded-full bg-white/20 text-white hover:bg-white/30"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>

        {/* Slide counter */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-white/20 text-white px-3 py-1 rounded-full text-sm">
          {currentSlide + 1} / {slides.length}
        </div>

        {/* Slide content */}
        <Card className="w-full h-full overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white border-0 shadow-2xl">
          <div className="h-full flex flex-col">
            {/* Slide header */}
            <div className={`p-8 bg-gradient-to-r ${slides[currentSlide].color}`}>
              <ScrollReveal animation="fade-down" duration={500}>
                <h2 className="text-3xl md:text-4xl font-bold text-center">
                  {isEnglish ? slides[currentSlide].title.en : slides[currentSlide].title.ar}
                </h2>
              </ScrollReveal>
            </div>

            {/* Slide body */}
            <div className="flex-1 p-8 flex flex-col md:flex-row items-center justify-center gap-8">
              {slides[currentSlide].image && (
                <ScrollReveal animation="fade-right" duration={500} className="w-full md:w-1/2">
                  <div className="rounded-lg overflow-hidden shadow-xl">
                    <img
                      src={slides[currentSlide].image || "/placeholder.svg"}
                      alt={isEnglish ? slides[currentSlide].title.en : slides[currentSlide].title.ar}
                      className="w-full h-auto object-cover"
                    />
                  </div>
                </ScrollReveal>
              )}

              <ScrollReveal
                animation="fade-left"
                duration={500}
                className={`w-full ${slides[currentSlide].image ? "md:w-1/2" : "md:w-3/4"}`}
              >
                <div className="text-xl md:text-2xl whitespace-pre-line">
                  {isEnglish ? slides[currentSlide].content.en : slides[currentSlide].content.ar}
                </div>
              </ScrollReveal>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
