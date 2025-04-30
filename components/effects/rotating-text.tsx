"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface RotatingTextProps {
  texts: string[]
  className?: string
  interval?: number
  typingSpeed?: number
  deletingSpeed?: number
  delayBetween?: number
}

export function RotatingText({
  texts,
  className,
  interval = 3000,
  typingSpeed = 100,
  deletingSpeed = 50,
  delayBetween = 1000,
}: RotatingTextProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (texts.length === 0) return

    let timeout: NodeJS.Timeout

    if (isTyping) {
      if (displayText.length < texts[currentTextIndex].length) {
        timeout = setTimeout(() => {
          setDisplayText(texts[currentTextIndex].substring(0, displayText.length + 1))
        }, typingSpeed)
      } else {
        setIsPaused(true)
        timeout = setTimeout(() => {
          setIsPaused(false)
          setIsTyping(false)
        }, delayBetween)
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1))
        }, deletingSpeed)
      } else {
        setIsTyping(true)
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length)
      }
    }

    return () => clearTimeout(timeout)
  }, [currentTextIndex, displayText, isTyping, isPaused, texts, typingSpeed, deletingSpeed, delayBetween])

  return (
    <span className={cn("inline-block relative", className)}>
      {displayText}
      <span
        className={`inline-block w-0.5 h-5 ml-0.5 bg-primary ${isPaused ? "animate-pulse" : "animate-blink"}`}
      ></span>
    </span>
  )
}
