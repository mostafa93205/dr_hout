"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, X, Play, Pause, Maximize, Minimize, Download, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Define the Presentation type
export interface Presentation {
  id: string
  title: {
    en: string
    ar: string
  }
  description?: {
    en: string
    ar: string
  }
  type: "slides" | "pdf" | "link"
  slides?: {
    title: {
      en: string
      ar: string
    }
    content: {
      en: string
      ar: string
    }
    image?: string
    color: string
  }[]
  pdfUrl?: string
  externalLink?: string
  date: string
  thumbnailUrl?: string
}

interface PresentationViewerProps {
  isOpen: boolean
  onClose: () => void
  isEnglish: boolean
  presentation: Presentation | null
}

export function PresentationViewer({ isOpen, onClose, isEnglish, presentation }: PresentationViewerProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Reset current slide when presentation changes
  useEffect(() => {
    setCurrentSlide(0)
    setIsPlaying(false)
  }, [presentation])

  // Handle auto-play
  useEffect(() => {
    let interval: NodeJS.Timeout

    if (isPlaying && presentation?.type === "slides" && presentation.slides) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => {
          if (prev < presentation.slides!.length - 1) {
            return prev + 1
          } else {
            setIsPlaying(false)
            return prev
          }
        })
      }, 5000) // Change slide every 5 seconds
    }

    return () => clearInterval(interval)
  }, [isPlaying, presentation])

  // Handle fullscreen
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange)
    }
  }, [])

  const toggleFullscreen = async () => {
    if (!isFullscreen) {
      try {
        const elem = document.getElementById("presentation-container")
        if (elem) {
          if (elem.requestFullscreen) {
            await elem.requestFullscreen()
          }
        }
      } catch (err) {
        console.error("Error attempting to enable fullscreen:", err)
      }
    } else {
      if (document.exitFullscreen) {
        await document.exitFullscreen()
      }
    }
  }

  const nextSlide = () => {
    if (presentation?.type === "slides" && presentation.slides && currentSlide < presentation.slides.length - 1) {
      setCurrentSlide(currentSlide + 1)
    }
  }

  const prevSlide = () => {
    if (presentation?.type === "slides" && currentSlide > 0) {
      setCurrentSlide(currentSlide - 1)
    }
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  // If not open or no presentation, don't render
  if (!isOpen || !presentation) {
    return null
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm transition-opacity",
        {
          "opacity-100": isOpen,
          "opacity-0 pointer-events-none": !isOpen,
        },
      )}
    >
      <div
        id="presentation-container"
        className={cn(
          "relative w-full max-w-6xl mx-auto bg-white dark:bg-gray-900 rounded-lg overflow-hidden transition-all duration-300",
          {
            "h-[90vh]": !isFullscreen,
            "h-screen max-w-none m-0 rounded-none": isFullscreen,
          },
        )}
      >
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4 bg-gradient-to-b from-black/60 to-transparent">
          <h2 className="text-white text-xl font-bold truncate max-w-[80%]">
            {isEnglish ? presentation.title.en : presentation.title.ar}
          </h2>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={toggleFullscreen}>
              {isFullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="h-full flex flex-col">
          {presentation.type === "slides" && presentation.slides && (
            <div className="flex-1 flex flex-col">
              {/* Slide content */}
              <div className="flex-1 flex items-center justify-center p-8 relative">
                <div
                  className={cn(
                    "w-full h-full rounded-lg flex flex-col items-center justify-center p-8 bg-gradient-to-br",
                    presentation.slides[currentSlide].color,
                  )}
                >
                  <h3 className="text-3xl font-bold text-white mb-6 text-center">
                    {isEnglish
                      ? presentation.slides[currentSlide].title.en
                      : presentation.slides[currentSlide].title.ar}
                  </h3>
                  <p className="text-xl text-white/90 text-center max-w-3xl">
                    {isEnglish
                      ? presentation.slides[currentSlide].content.en
                      : presentation.slides[currentSlide].content.ar}
                  </p>
                  {presentation.slides[currentSlide].image && (
                    <div className="mt-6 max-w-md">
                      <img
                        src={presentation.slides[currentSlide].image || "/placeholder.svg"}
                        alt={
                          isEnglish
                            ? presentation.slides[currentSlide].title.en
                            : presentation.slides[currentSlide].title.ar
                        }
                        className="rounded-md max-h-[40vh] object-contain"
                      />
                    </div>
                  )}
                </div>

                {/* Navigation buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 rounded-full h-12 w-12"
                  onClick={prevSlide}
                  disabled={currentSlide === 0}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white bg-black/30 hover:bg-black/50 rounded-full h-12 w-12"
                  onClick={nextSlide}
                  disabled={currentSlide === presentation.slides.length - 1}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>

              {/* Controls */}
              <div className="p-4 flex justify-between items-center bg-gray-100 dark:bg-gray-800">
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" onClick={togglePlay} className="text-gray-700 dark:text-gray-300">
                    {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                  </Button>
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {isEnglish ? "Slide" : "شريحة"} {currentSlide + 1}/{presentation.slides.length}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {presentation.slides.map((_, index) => (
                    <button
                      key={index}
                      className={cn(
                        "w-2 h-2 rounded-full transition-all",
                        index === currentSlide ? "bg-primary w-4" : "bg-gray-300 dark:bg-gray-600",
                      )}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(presentation.date).toLocaleDateString()}
                </div>
              </div>
            </div>
          )}

          {presentation.type === "pdf" && presentation.pdfUrl && (
            <div className="flex-1 flex flex-col">
              <div className="flex-1 relative">
                <iframe
                  src={`${presentation.pdfUrl}#toolbar=0`}
                  className="w-full h-full border-0"
                  title={isEnglish ? presentation.title.en : presentation.title.ar}
                />
              </div>
              <div className="p-4 flex justify-between items-center bg-gray-100 dark:bg-gray-800">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(presentation.date).toLocaleDateString()}
                </div>
                <a
                  href={presentation.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  <Download className="h-4 w-4" />
                  <span>{isEnglish ? "Download PDF" : "تحميل PDF"}</span>
                </a>
              </div>
            </div>
          )}

          {presentation.type === "link" && presentation.externalLink && (
            <div className="flex-1 flex flex-col">
              <div className="flex-1 relative">
                <iframe
                  src={presentation.externalLink}
                  className="w-full h-full border-0"
                  title={isEnglish ? presentation.title.en : presentation.title.ar}
                  allowFullScreen
                />
              </div>
              <div className="p-4 flex justify-between items-center bg-gray-100 dark:bg-gray-800">
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(presentation.date).toLocaleDateString()}
                </div>
                <a
                  href={presentation.externalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-primary hover:underline"
                >
                  <ExternalLink className="h-4 w-4" />
                  <span>{isEnglish ? "Open in new tab" : "فتح في علامة تبويب جديدة"}</span>
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
