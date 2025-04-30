"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface BlurTextProps {
  text: string
  className?: string
  duration?: number
  delay?: number
  initialBlur?: number
  onComplete?: () => void
}

export function BlurText({ text, className, duration = 1500, delay = 0, initialBlur = 8, onComplete }: BlurTextProps) {
  const [blur, setBlur] = useState(initialBlur)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const visibilityTimeout = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(visibilityTimeout)
  }, [delay])

  useEffect(() => {
    if (!isVisible) return

    const startTime = Date.now()
    const interval = 16 // ~60fps

    const animationInterval = setInterval(() => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const currentBlur = initialBlur * (1 - progress)

      setBlur(currentBlur)

      if (progress === 1) {
        clearInterval(animationInterval)
        if (onComplete) onComplete()
      }
    }, interval)

    return () => clearInterval(animationInterval)
  }, [isVisible, duration, initialBlur, onComplete])

  if (!isVisible) return <span className={className}>{text}</span>

  return (
    <span className={cn("transition-all", className)} style={{ filter: `blur(${blur}px)` }}>
      {text}
    </span>
  )
}
