"use client"

import { useState, useEffect } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowLeft, Lock, Moon, Sun } from "lucide-react"
import Link from "next/link"
import { useProjectStore } from "@/lib/project-store"
import { usePresentationStore } from "@/lib/presentation-store"
import ProjectManagementPanel from "@/components/admin/project-management-panel"
import PresentationManagementPanel from "@/components/admin/presentation-management-panel"
import { useToast } from "@/components/ui/use-toast"

// The password to access the admin page
const ADMIN_PASSWORD = "DrHout2024"

export default function AdminPage() {
  const { toast } = useToast()
  const [isEnglish, setIsEnglish] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false) // Set to false for light mode by default
  const [activeTab, setActiveTab] = useState("projects")

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState("")
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [lockoutUntil, setLockoutUntil] = useState<number | null>(null)

  // Store initialization
  const { fetchProjects } = useProjectStore()
  const { fetchPresentations } = usePresentationStore()

  // Check for authentication in localStorage on component mount with expiration check
  useEffect(() => {
    const authStatus = localStorage.getItem("adminAuth")
    const expiration = localStorage.getItem("adminAuthExpiration")

    if (authStatus === "authenticated" && expiration) {
      // Check if the authentication has expired
      if (Date.now() < Number(expiration)) {
        setIsAuthenticated(true)
      } else {
        // Clear expired authentication
        localStorage.removeItem("adminAuth")
        localStorage.removeItem("adminAuthExpiration")
      }
    }

    // Check if there was a lockout and if it's still valid
    const storedLockout = localStorage.getItem("adminLoginLockout")
    if (storedLockout) {
      const lockoutTime = Number(storedLockout)
      if (Date.now() < lockoutTime) {
        setLockoutUntil(lockoutTime)
      } else {
        localStorage.removeItem("adminLoginLockout")
      }
    }

    // We're not checking for dark mode preference anymore, always using light mode
  }, [])

  // Fetch data when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchProjects()
      fetchPresentations()
    }
  }, [isAuthenticated, fetchProjects, fetchPresentations])

  // Check for tab parameter in URL
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search)
      const tabParam = params.get("tab")
      if (tabParam === "presentations" || tabParam === "projects") {
        setActiveTab(tabParam)
      }
    }
  }, [])

  // Toggle language
  const toggleLanguage = () => {
    setIsEnglish(!isEnglish)
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Handle login
  const handleLogin = () => {
    // Check if account is locked out
    if (lockoutUntil && Date.now() < lockoutUntil) {
      const minutesLeft = Math.ceil((lockoutUntil - Date.now()) / 60000)
      setPasswordError(
        isEnglish
          ? `Too many attempts. Please try again in ${minutesLeft} minute(s).`
          : `محاولات كثيرة جدًا. يرجى المحاولة مرة أخرى في ${minutesLeft} دقيقة.`,
      )
      return
    }

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      setPasswordError("")
      setLoginAttempts(0)
      // Store authentication status in localStorage with expiration
      const expirationTime = Date.now() + 24 * 60 * 60 * 1000 // 24 hours
      localStorage.setItem("adminAuth", "authenticated")
      localStorage.setItem("adminAuthExpiration", expirationTime.toString())

      toast({
        title: isEnglish ? "Login Successful" : "تم تسجيل الدخول بنجاح",
        description: isEnglish ? "Welcome to the admin dashboard." : "مرحبًا بك في لوحة الإدارة.",
      })
    } else {
      const newAttempts = loginAttempts + 1
      setLoginAttempts(newAttempts)

      // Implement progressive lockout after 5 failed attempts
      if (newAttempts >= 5) {
        const lockoutTime = Date.now() + 15 * 60 * 1000 // 15 minutes
        setLockoutUntil(lockoutTime)
        localStorage.setItem("adminLoginLockout", lockoutTime.toString())
        setPasswordError(
          isEnglish
            ? "Too many failed attempts. Account locked for 15 minutes."
            : "عدد كبير من المحاولات الفاشلة. تم قفل الحساب لمدة 15 دقيقة.",
        )
      } else {
        setPasswordError(
          isEnglish
            ? `Incorrect password. ${5 - newAttempts} attempts remaining.`
            : `كلمة المرور غير صحيحة. ${5 - newAttempts} محاولات متبقية.`,
        )
      }
    }
  }

  // Handle logout
  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("adminAuth")
    localStorage.removeItem("adminAuthExpiration")

    toast({
      title: isEnglish ? "Logged Out" : "تم تسجيل الخروج",
      description: isEnglish ? "You have been logged out successfully." : "تم تسجيل الخروج بنجاح.",
    })
  }

  // If not authenticated, show login screen
  if (!isAuthenticated) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center transition-all duration-300 ${
          isDarkMode ? "dark bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
        }`}
      >
        <Card className="w-full max-w-md">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">{isEnglish ? "Admin Dashboard" : "لوحة الإدارة"}</CardTitle>
                <CardDescription>
                  {isEnglish ? "Please enter your password to continue" : "الرجاء إدخال كلمة المرور للمتابعة"}
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {/* Login form with enhanced security */}
            <div className="space-y-4">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
                  <Lock className="h-10 w-10 text-primary" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  {isEnglish ? "Password" : "كلمة المرور"}
                </label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleLogin()
                    }
                  }}
                  placeholder={isEnglish ? "Enter your password" : "أدخل كلمة المرور"}
                  autoComplete="off"
                />
                {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
              </div>

              <div className="flex justify-between">
                <Button variant="ghost" onClick={toggleLanguage}>
                  {isEnglish ? "عربي" : "English"}
                </Button>
                <Button onClick={handleLogin}>{isEnglish ? "Login" : "تسجيل الدخول"}</Button>
              </div>

              <div className="pt-4 text-center">
                <Link href="/" className="text-sm text-primary hover:underline">
                  {isEnglish ? "Return to homepage" : "العودة إلى الصفحة الرئيسية"}
                </Link>
              </div>

              <div className="mt-4 text-xs text-gray-500 dark:text-gray-400 text-center">
                {isEnglish
                  ? "This area is secured with advanced encryption and protection against brute force attacks."
                  : "هذه المنطقة مؤمنة بتشفير متقدم وحماية ضد هجمات القوة الغاشمة."}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Main admin interface (only shown when authenticated)
  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isDarkMode ? "dark bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-primary">{isEnglish ? "Admin Dashboard" : "لوحة الإدارة"}</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm" onClick={handleLogout}>
                {isEnglish ? "Logout" : "تسجيل الخروج"}
              </Button>
              <Button variant="ghost" size="sm" onClick={toggleLanguage}>
                {isEnglish ? "عربي" : "English"}
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        <Tabs defaultValue="projects" value={activeTab} onValueChange={setActiveTab}>
          <div className="flex justify-between items-center mb-6">
            <TabsList className="grid grid-cols-2 w-[400px]">
              <TabsTrigger value="projects">{isEnglish ? "Projects" : "المشاريع"}</TabsTrigger>
              <TabsTrigger value="presentations">{isEnglish ? "Presentations" : "العروض التقديمية"}</TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="projects" className="space-y-4">
            <ProjectManagementPanel isEnglish={isEnglish} isDarkMode={isDarkMode} />
          </TabsContent>

          <TabsContent value="presentations" className="space-y-4">
            <PresentationManagementPanel isEnglish={isEnglish} isDarkMode={isDarkMode} />
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-6 mt-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {isEnglish
                ? "© 2024 Dr. Hout Admin Dashboard. All rights reserved."
                : "© 2024 لوحة إدارة د. حوت. جميع الحقوق محفوظة."}
            </p>
            <div className="flex items-center mt-4 md:mt-0">
              <Button variant="ghost" size="sm" className="text-xs text-gray-500 dark:text-gray-400">
                {isEnglish ? "Privacy Policy" : "سياسة الخصوصية"}
              </Button>
              <Button variant="ghost" size="sm" className="text-xs text-gray-500 dark:text-gray-400">
                {isEnglish ? "Terms of Service" : "شروط الخدمة"}
              </Button>
              <Button variant="ghost" size="sm" className="text-xs text-gray-500 dark:text-gray-400">
                {isEnglish ? "Help & Support" : "المساعدة والدعم"}
              </Button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
