"use client"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ThemeToggleProps {
  isDarkMode: boolean
  toggleDarkMode: () => void
  className?: string
}

export function ThemeToggle({ isDarkMode, toggleDarkMode, className }: ThemeToggleProps) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleDarkMode}
      className={`rounded-full ${className}`}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  )
}
