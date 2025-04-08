"use client"

import { useRef, useEffect, useState, type ReactNode } from "react"
import { cn } from "@/lib/utils"

type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "zoom-in"
  | "zoom-out"
  | "flip"
  | "slide-up"
  | "slide-down"

interface ScrollRevealProps {
  children: ReactNode
  animation?: AnimationType
  delay?: number
  duration?: number
  distance?: string
  threshold?: number
  className?: string
  once?: boolean
}

export function ScrollReveal({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 800,
  distance = "50px",
  threshold = 0.1,
  className,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (once && ref.current) {
            observer.unobserve(ref.current)
          }
        } else if (!once) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin: "0px",
      },
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, once])

  const getAnimationStyles = () => {
    if (!isVisible) {
      switch (animation) {
        case "fade-up":
          return { opacity: 0, transform: `translateY(${distance})` }
        case "fade-down":
          return { opacity: 0, transform: `translateY(-${distance})` }
        case "fade-left":
          return { opacity: 0, transform: `translateX(${distance})` }
        case "fade-right":
          return { opacity: 0, transform: `translateX(-${distance})` }
        case "zoom-in":
          return { opacity: 0, transform: "scale(0.8)" }
        case "zoom-out":
          return { opacity: 0, transform: "scale(1.2)" }
        case "flip":
          return { opacity: 0, transform: "rotateY(90deg)" }
        case "slide-up":
          return { transform: `translateY(${distance})` }
        case "slide-down":
          return { transform: `translateY(-${distance})` }
        default:
          return { opacity: 0 }
      }
    }
    return { opacity: 1, transform: "translateY(0) translateX(0) scale(1) rotateY(0)" }
  }

  return (
    <div
      ref={ref}
      className={cn("transition-all", className)}
      style={{
        ...getAnimationStyles(),
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
        transitionProperty: "opacity, transform",
        transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      {children}
    </div>
  )
}
