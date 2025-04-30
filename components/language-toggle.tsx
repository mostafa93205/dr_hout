"use client"

import { Button } from "@/components/ui/button"

interface LanguageToggleProps {
  isEnglish: boolean
  toggleLanguage: () => void
  className?: string
}

export function LanguageToggle({ isEnglish, toggleLanguage, className }: LanguageToggleProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleLanguage}
      className={`text-sm hover:bg-primary/10 ${className}`}
      aria-label={isEnglish ? "Switch to Arabic" : "Switch to English"}
    >
      {isEnglish ? "عربي" : "English"}
    </Button>
  )
}
