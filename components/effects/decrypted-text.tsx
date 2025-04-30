"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface DecryptedTextProps {
  text: string
  className?: string
  duration?: number
  delay?: number
  characters?: string
  onComplete?: () => void
}

export function DecryptedText({
  text,
  className,
  duration = 2000,
  delay = 0,
  characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?/",
  onComplete,
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState("")
  const [isDecrypting, setIsDecrypting] = useState(false)

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      setIsDecrypting(true)
    }, delay)

    return () => clearTimeout(delayTimeout)
  }, [delay])

  useEffect(() => {
    if (!isDecrypting) return

    const finalText = text
    const iterations = 4 // How many random characters before settling on the correct one
    const iterationDuration = duration / finalText.length / iterations

    let currentIteration = 0
    let currentIndex = 0
    const displayArray = Array(finalText.length).fill("")

    const interval = setInterval(() => {
      if (currentIndex >= finalText.length) {
        clearInterval(interval)
        if (onComplete) onComplete()
        return
      }

      // Generate a random character from the characters string
      const randomChar = characters.charAt(Math.floor(Math.random() * characters.length))

      // Update the current position with a random character or the final character
      if (currentIteration < iterations - 1) {
        displayArray[currentIndex] = randomChar
        currentIteration++
      } else {
        displayArray[currentIndex] = finalText[currentIndex]
        currentIteration = 0
        currentIndex++
      }

      setDisplayText(displayArray.join(""))
    }, iterationDuration)

    return () => clearInterval(interval)
  }, [isDecrypting, text, duration, characters, onComplete])

  return <span className={cn(className)}>{displayText}</span>
}
