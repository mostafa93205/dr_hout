"use client"

import Link from "next/link"
import { Facebook, Instagram, Linkedin, Youtube, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface SocialLinksProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function SocialLinks({ size = "md", className }: SocialLinksProps) {
  const buttonSize = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-12 w-12" : "h-10 w-10"
  const iconSize = size === "sm" ? "h-4 w-4" : size === "lg" ? "h-6 w-6" : "h-5 w-5"

  return (
    <div className={`flex gap-4 ${className}`}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="https://www.facebook.com/mommm93205" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full ${buttonSize} hover:scale-110 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300`}
              >
                <Facebook className={`${iconSize} text-blue-600 dark:text-blue-400`} />
                <span className="sr-only">Facebook</span>
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Facebook</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="https://www.instagram.com/dr_hout/" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full ${buttonSize} hover:scale-110 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all duration-300`}
              >
                <Instagram className={`${iconSize} text-pink-600 dark:text-pink-400`} />
                <span className="sr-only">Instagram</span>
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>Instagram</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="https://www.linkedin.com/in/mostafaelhout/" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full ${buttonSize} hover:scale-110 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300`}
              >
                <Linkedin className={`${iconSize} text-blue-700 dark:text-blue-500`} />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>LinkedIn</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="https://www.youtube.com/@Dr_hout" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full ${buttonSize} hover:scale-110 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300`}
              >
                <Youtube className={`${iconSize} text-red-600 dark:text-red-400`} />
                <span className="sr-only">YouTube</span>
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>YouTube</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Link href="https://x.com/Dr_hout" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="icon"
                className={`rounded-full ${buttonSize} hover:scale-110 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300`}
              >
                <Twitter className={`${iconSize}`} />
                <span className="sr-only">X</span>
              </Button>
            </Link>
          </TooltipTrigger>
          <TooltipContent>
            <p>X (Twitter)</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  )
}
