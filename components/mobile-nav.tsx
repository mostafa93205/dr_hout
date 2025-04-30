"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface MobileNavProps {
  isEnglish: boolean
  activeSection: string
  scrollToSection: (sectionId: string) => void
}

export function MobileNav({ isEnglish, activeSection, scrollToSection }: MobileNavProps) {
  const [open, setOpen] = useState(false)

  const handleNavClick = (sectionId: string) => {
    scrollToSection(sectionId)
    setOpen(false)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">{isEnglish ? "Open menu" : "فتح القائمة"}</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-bold text-primary">{isEnglish ? "Dr Hout" : "د. حوت"}</h2>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <nav className="flex flex-col space-y-4">
          <button
            onClick={() => handleNavClick("home")}
            className={`text-left px-2 py-2 rounded-md transition-colors ${
              activeSection === "home"
                ? "bg-primary/10 text-primary font-medium"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {isEnglish ? "Home" : "الرئيسية"}
          </button>
          <button
            onClick={() => handleNavClick("about")}
            className={`text-left px-2 py-2 rounded-md transition-colors ${
              activeSection === "about"
                ? "bg-primary/10 text-primary font-medium"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {isEnglish ? "About" : "نبذة عني"}
          </button>
          <button
            onClick={() => handleNavClick("skills")}
            className={`text-left px-2 py-2 rounded-md transition-colors ${
              activeSection === "skills"
                ? "bg-primary/10 text-primary font-medium"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {isEnglish ? "Skills" : "المهارات"}
          </button>
          <button
            onClick={() => handleNavClick("education")}
            className={`text-left px-2 py-2 rounded-md transition-colors ${
              activeSection === "education"
                ? "bg-primary/10 text-primary font-medium"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {isEnglish ? "Education" : "التعليم"}
          </button>
          <button
            onClick={() => handleNavClick("contact")}
            className={`text-left px-2 py-2 rounded-md transition-colors ${
              activeSection === "contact"
                ? "bg-primary/10 text-primary font-medium"
                : "hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {isEnglish ? "Contact" : "اتصل بي"}
          </button>
        </nav>
      </SheetContent>
    </Sheet>
  )
}
