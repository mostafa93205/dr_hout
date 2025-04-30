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
      className={`rounded-full overflow-hidden ${className}`}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
    >
      <div className="relative w-5 h-5">
        <Sun
          className={`h-5 w-5 absolute top-0 left-0 transition-all duration-300 ${
            isDarkMode ? "opacity-0 rotate-90 scale-0" : "opacity-100 rotate-0 scale-100"
          }`}
        />
        <Moon
          className={`h-5 w-5 absolute top-0 left-0 transition-all duration-300 ${
            isDarkMode ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-0"
          }`}
        />
      </div>
    </Button>
  )
}
