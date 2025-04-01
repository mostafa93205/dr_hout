"use client"

import { useState, useEffect } from "react"
import {
  Moon,
  Sun,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  ChevronDown,
  LayoutDashboard,
  Lock,
  Mail,
  MapPin,
  Phone,
  Calendar,
  Download,
  ArrowRight,
  ChevronUp,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Input } from "@/components/ui/input"
import { useProjectStore } from "@/lib/project-store"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function PersonalPage() {
  const { projects, loading, error, fetchProjects } = useProjectStore()

  const [isEnglish, setIsEnglish] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [age, setAge] = useState(0)
  const [activeSection, setActiveSection] = useState<string>("home")

  useEffect(() => {
    // Fetch projects
    fetchProjects()

    // Calculate age
    const calculateAge = (birthDate: Date) => {
      const today = new Date()
      const birth = new Date(birthDate)
      let age = today.getFullYear() - birth.getFullYear()
      const monthDifference = today.getMonth() - birth.getMonth()
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
        age--
      }
      return age
    }

    const birthDate = new Date("2005-03-09")
    setAge(calculateAge(birthDate))

    // Set up intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")

            // Update active section for navigation
            const id = entry.target.getAttribute("id")
            if (id) {
              setActiveSection(id)
            }
          }
        })
      },
      { threshold: 0.3, rootMargin: "-100px 0px -100px 0px" },
    )

    document.querySelectorAll(".scroll-animate").forEach((element) => {
      observer.observe(element)
    })

    // Check if user prefers dark mode
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true)
    }

    return () => observer.disconnect()
  }, [fetchProjects])

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
    }
  }

  const skills = [
    { name: "Python", icon: "🐍", level: 90 },
    { name: "Data Science", icon: "📊", level: 85 },
    { name: "Digital Marketing", icon: "📱", level: 80 },
    { name: "Health Administration", icon: "🏥", level: 95 },
  ]

  const certificates = [
    {
      en: "Digital Marketing: Misr University for Science and Technology (MUST), 2024",
      ar: "التسويق الرقمي: جامعة مصر للعلوم والتكنولوجيا (MUST)، 2024",
    },
    { en: "Data Science: Completion Certificate from Moka Satar", ar: "علوم البيانات: شهادة إتمام من موكا سطر" },
    { en: "Python 101: Completion Certificate from Moka Satar", ar: "بايثون 101: شهادة إتمام من موكا سطر" },
    {
      en: "Certificate of Appreciation from Entrepreneurship Committee, MUST University, for distinguished efforts and innovative solutions during hackathon activities held on February 9-11, 2025",
      ar: "شهادة تقدير من لجنة ريادة الأعمال، جامعة مصر للعلوم والتكنولوجيا، للجهود المتميزة والحلول المبتكرة خلال أنشطة الهاكاثون المنعقدة في 9-11 فبراير 2025",
    },
    {
      en: "ISO 45001/2018: Occupational Safety and Health Management System",
      ar: "ISO 45001/2018: نظام إدارة السلامة والصحة المهنية",
    },
    {
      en: "Infection Control and Prevention: Public Health Academy in Waqaya, December 18, 2024",
      ar: "مكافحة العدوى والوقاية منها: أكاديمية الصحة العامة في وقاية، 18 ديسمبر 2024",
    },
    { en: "Body Language & Business Etiquette: Almentor platform", ar: "لغة الجسد وآداب العمل: منصة المنتور" },
    {
      en: "Attendance Certificate at Third International Biotechnology Conference, Mast University",
      ar: "شهادة حضور المؤتمر الدولي الثالث للتكنولوجيا الحيوية، جامعة ماست",
    },
  ]

  // Get the first 4 projects for display on the homepage
  const displayProjects = projects.slice(0, 4)

  // Map projects to the format expected by the homepage
  const mappedProjects = displayProjects.map((project) => ({
    title: {
      en: project.title,
      ar: project.title, // You could add Arabic translations here if needed
    },
    description: {
      en: project.description,
      ar: project.description, // You could add Arabic translations here if needed
    },
    icon:
      project.category === "Data Analysis"
        ? "📊"
        : project.category === "Health Informatics"
          ? "🏥"
          : project.category === "Digital Marketing"
            ? "📱"
            : "🌐",
    technologies: project.technologies,
    color:
      project.category === "Data Analysis"
        ? "from-blue-500/80 to-blue-600"
        : project.category === "Health Informatics"
          ? "from-green-500/80 to-green-600"
          : project.category === "Digital Marketing"
            ? "from-purple-500/80 to-purple-600"
            : "from-amber-500/80 to-amber-600",
    imageUrl: project.imageUrl,
  }))

  return (
    <div
      className={`min-h-screen font-sans transition-all duration-300 ${isDarkMode ? "dark bg-gray-900 text-gray-100" : "bg-gradient-to-br from-slate-50 to-slate-100 text-gray-800"}`}
      dir={isEnglish ? "ltr" : "rtl"}
    >
      {/* Navigation */}
      <nav className="fixed w-full z-10 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold hover:scale-105 transition-transform duration-300 text-primary">
            {isEnglish ? "Dr Hout" : "د. حوت"}
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => scrollToSection("home")}
              className={`text-sm font-medium hover:text-primary transition-colors ${activeSection === "home" ? "text-primary" : ""}`}
            >
              {isEnglish ? "Home" : "الرئيسية"}
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className={`text-sm font-medium hover:text-primary transition-colors ${activeSection === "about" ? "text-primary" : ""}`}
            >
              {isEnglish ? "About" : "نبذة عني"}
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className={`text-sm font-medium hover:text-primary transition-colors ${activeSection === "skills" ? "text-primary" : ""}`}
            >
              {isEnglish ? "Skills" : "المهارات"}
            </button>
            <button
              onClick={() => scrollToSection("education")}
              className={`text-sm font-medium hover:text-primary transition-colors ${activeSection === "education" ? "text-primary" : ""}`}
            >
              {isEnglish ? "Education" : "التعليم"}
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className={`text-sm font-medium hover:text-primary transition-colors ${activeSection === "projects" ? "text-primary" : ""}`}
            >
              {isEnglish ? "Projects" : "المشاريع"}
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`text-sm font-medium hover:text-primary transition-colors ${activeSection === "contact" ? "text-primary" : ""}`}
            >
              {isEnglish ? "Contact" : "اتصل بي"}
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <Link href="/project-management">
              <Button variant="outline" size="sm" className="gap-2">
                <LayoutDashboard className="h-4 w-4" />
                {isEnglish ? "Projects" : "المشاريع"}
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={toggleLanguage} className="text-sm hover:bg-primary/10">
              {isEnglish ? "عربي" : "English"}
            </Button>
            <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header id="home" className="pt-32 pb-16 text-center scroll-animate">
        <div className="container mx-auto px-6">
          <div className="relative w-40 h-40 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/60 rounded-full blur-xl opacity-20 animate-pulse"></div>
            <img
              src="/images/profile.png"
              alt="Mostafa Emad"
              className="relative w-40 h-40 mx-auto rounded-full border-4 border-white dark:border-gray-800 shadow-xl object-cover animate-float"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 fade-in bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            {isEnglish ? "Mostafa Emad Salah Hamdy" : "مصطفى عماد صلاح حمدي"}
          </h1>
          <p className="text-xl mb-8 fade-in fade-in-delay-1 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            {isEnglish
              ? "Driven by a passion for programming and management, merging creativity with technology"
              : "مدفوع بشغف البرمجة والإدارة، يمزج بين الإبداع والتكنولوجيا"}
          </p>

          <div className="flex justify-center gap-4 fade-in fade-in-delay-2">
            <Button onClick={() => scrollToSection("contact")} className="gap-2">
              {isEnglish ? "Contact Me" : "اتصل بي"}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <a
              href="/Mostafa_Emad_CV.pdf"
              download="Mostafa_Emad_CV.pdf"
              aria-label={isEnglish ? "Download CV" : "تحميل السيرة الذاتية"}
            >
              <Button variant="outline" className="gap-2">
                {isEnglish ? "Download CV" : "تحميل السيرة الذاتية"}
                <Download className="h-4 w-4" />
              </Button>
            </a>
          </div>

          <div className="mt-12">
            <ChevronDown className="mx-auto animate-bounce fade-in fade-in-delay-3 text-primary" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 space-y-32">
        {/* Personal Information */}
        <section id="about" className="scroll-animate">
          <h2 className="text-3xl font-bold mb-10 text-center text-primary">{isEnglish ? "About Me" : "نبذة عني"}</h2>

          <Card className="max-w-4xl mx-auto p-8 shadow-lg hover:shadow-xl transition-all duration-500 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-primary">
                  {isEnglish ? "Personal Information" : "المعلومات الشخصية"}
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Calendar className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{isEnglish ? "Age" : "العمر"}</p>
                      <p className="font-medium">{age}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {isEnglish ? "Nationality" : "الجنسية"}
                      </p>
                      <p className="font-medium">{isEnglish ? "Egyptian" : "مصري"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Mail className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {isEnglish ? "Email" : "البريد الإلكتروني"}
                      </p>
                      <p className="font-medium">mommm93205@gmail.com</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {isEnglish ? "University: " : "الجامعة: "}
                        200041746@must.edu.eg
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="bg-primary/10 p-2 rounded-full">
                      <Phone className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{isEnglish ? "Phone" : "الهاتف"}</p>
                      <p className="font-medium">+20 1061014803</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4 text-primary">
                  {isEnglish ? "Professional Summary" : "ملخص مهني"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {isEnglish
                    ? "I am a dedicated Health Administration & Informatics student with a passion for leveraging technology to improve healthcare systems. My expertise spans data analysis, digital marketing, and project management."
                    : "أنا طالب متخصص في إدارة الصحة والمعلوماتية مع شغف بتسخير التكنولوجيا لتحسين أنظمة الرعاية الصحية. تمتد خبرتي لتشمل تحليل البيانات والتسويق الرقمي وإدارة المشاريع."}
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  {isEnglish
                    ? "Currently serving as the Head of Social Activities and Trips Committee 2024-2025 at the Faculty of Health Sciences Student Union, where I develop leadership skills while organizing impactful events for students."
                    : "أعمل حاليًا كرئيس لجنة الأنشطة الاجتماعية والرحلات 2024-2025 في اتحاد طلاب كلية العلوم الصحية، حيث أطور مهارات القيادة مع تنظيم فعاليات مؤثرة للطلاب."}
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Skills */}
        <section id="skills" className="scroll-animate">
          <h2 className="text-3xl font-bold mb-10 text-center text-primary">{isEnglish ? "Skills" : "المهارات"}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="space-y-6">
              {skills.slice(0, 2).map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{skill.icon}</span>
                      <h3 className="font-medium">{skill.name}</h3>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%`, transitionDelay: `${index * 0.2}s` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              {skills.slice(2, 4).map((skill, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{skill.icon}</span>
                      <h3 className="font-medium">{skill.name}</h3>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${skill.level}%`, transitionDelay: `${(index + 2) * 0.2}s` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Certificates */}
          <div className="mt-20">
            <h3 className="text-2xl font-bold mb-8 text-center text-primary">
              {isEnglish ? "Qualifications and Certificates" : "المؤهلات والشهادات"}
            </h3>
            <div className="max-w-3xl mx-auto space-y-4">
              {certificates.map((cert, index) => (
                <div
                  key={index}
                  className="p-4 border-l-4 border-primary bg-white/80 dark:bg-gray-800/50 rounded-r-lg shadow hover:shadow-md hover:translate-x-1 transition-all duration-300"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <p className="font-medium">{isEnglish ? cert.en : cert.ar}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section id="education" className="scroll-animate">
          <h2 className="text-3xl font-bold mb-10 text-center text-primary">{isEnglish ? "Education" : "التعليم"}</h2>

          <div className="max-w-4xl mx-auto">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 rounded-full"></div>

              {/* Education item */}
              <div className="relative mb-12">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 w-6 h-6 rounded-full bg-primary border-4 border-white dark:border-gray-900"></div>

                <Card className="max-w-lg mx-auto p-8 text-center bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl hover:shadow-2xl transition-all duration-500">
                  <div className="text-6xl mb-6 text-primary">🎓</div>
                  <h3 className="text-2xl font-bold mb-2">
                    {isEnglish ? "Faculty of Health Sciences" : "كلية العلوم الصحية"}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                    {isEnglish ? "Health Administration & Informatics" : "إدارة الصحة والمعلوماتية"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {isEnglish ? "Misr University for Science and Technology (MUST)" : "جامعة مصر للعلوم والتكنولوجيا"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {isEnglish ? "2023 - Present" : "2023 - الحاضر"}
                  </p>

                  <div className="mt-6 flex justify-center">
                    <Badge variant="secondary" className="text-primary">
                      {isEnglish ? "Current GPA: 3.49/4.0" : "المعدل التراكمي الحالي: 3.49/4.0"}
                    </Badge>
                  </div>
                </Card>
              </div>

              {/* Previous education */}
              <div className="relative">
                <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 w-6 h-6 rounded-full bg-primary/70 border-4 border-white dark:border-gray-900"></div>

                <Card className="max-w-lg mx-auto p-6 text-center bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-500">
                  <h3 className="text-xl font-bold mb-2">{isEnglish ? "High School Diploma" : "الثانوية العامة"}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-2">
                    {isEnglish ? "Science Track" : "القسم العلمي"}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {isEnglish ? "2020 - 2023" : "2020 - 2023"}
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        <section className="scroll-animate">
          <h2 className="text-3xl font-bold mb-10 text-center text-primary">
            {isEnglish ? "CV & Resume" : "السيرة الذاتية"}
          </h2>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 bg-white/80 dark:bg-gray-800/50 shadow-xl">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold mb-4 text-primary">
                    {isEnglish ? "Professional Resume" : "السيرة الذاتية المهنية"}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-lg">
                    {isEnglish
                      ? "My resume details my educational background, technical skills, and professional experience in healthcare informatics."
                      : "تفصل سيرتي الذاتية خلفيتي التعليمية ومهاراتي التقنية وخبرتي المهنية في مجال المعلوماتية الصحية."}
                  </p>
                </div>

                <a
                  href="/Mostafa_Emad_CV.pdf"
                  download="Mostafa_Emad_CV.pdf"
                  aria-label={isEnglish ? "Download CV" : "تحميل السيرة الذاتية"}
                >
                  <Button className="gap-2">
                    {isEnglish ? "Download CV" : "تحميل السيرة الذاتية"}
                    <Download className="h-4 w-4" />
                  </Button>
                </a>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
                    {isEnglish ? "Education" : "التعليم"}
                  </h4>
                  <div className="space-y-2">
                    <p className="text-gray-800 dark:text-gray-200 font-medium">
                      {isEnglish
                        ? "Faculty of Health Sciences, Health Administration & Informatics"
                        : "كلية العلوم الصحية، إدارة الصحة والمعلوماتية"}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {isEnglish
                        ? "Misr University for Science and Technology (MUST)"
                        : "جامعة مصر للعلوم والتكنولوجيا"}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {isEnglish ? "2023 - Present • GPA: 3.49/4.0" : "2023 - الحاضر • المعدل التراكمي: 3.49/4.0"}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-800 dark:text-gray-200 mb-3">
                    {isEnglish ? "Contact Information" : "معلومات الاتصال"}
                  </h4>
                  <div className="space-y-2">
                    <p className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium">{isEnglish ? "Phone: " : "الهاتف: "}</span>+20 1061014803
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium">{isEnglish ? "Email: " : "البريد الإلكتروني: "}</span>
                      mommm93205@gmail.com
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      <span className="font-medium">{isEnglish ? "University Email: " : "البريد الجامعي: "}</span>
                      200041746@must.edu.eg
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="scroll-animate">
          <h2 className="text-3xl font-bold mb-10 text-center text-primary">
            {isEnglish ? "Projects & Work" : "المشاريع والأعمال"}
          </h2>

          {/* Loading and error states */}
          {loading && (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2">{isEnglish ? "Loading projects..." : "جاري تحميل المشاريع..."}</span>
            </div>
          )}

          {error && (
            <Alert variant="destructive" className="mb-6 max-w-4xl mx-auto">
              <AlertTitle>{isEnglish ? "Error" : "خطأ"}</AlertTitle>
              <AlertDescription>
                {isEnglish ? `Failed to load projects: ${error}` : `فشل في تحميل المشاريع: ${error}`}
                <Button variant="outline" size="sm" className="ml-4" onClick={() => fetchProjects()}>
                  {isEnglish ? "Retry" : "إعادة المحاولة"}
                </Button>
              </AlertDescription>
            </Alert>
          )}

          {!loading && !error && (
            <>
              {mappedProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
                  {mappedProjects.map((project, index) => (
                    <Card
                      key={index}
                      className="overflow-hidden group hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2"
                    >
                      {project.imageUrl ? (
                        <div className="h-48 overflow-hidden">
                          <img
                            src={project.imageUrl || "/placeholder.svg"}
                            alt={isEnglish ? project.title.en : project.title.ar}
                            className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                          />
                        </div>
                      ) : (
                        <div className={`h-48 bg-gradient-to-r ${project.color} flex items-center justify-center`}>
                          <div className="text-6xl text-white group-hover:scale-110 transition-transform duration-300">
                            {project.icon}
                          </div>
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {isEnglish ? project.title.en : project.title.ar}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300 mb-4">
                          {isEnglish ? project.description.en : project.description.ar}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge
                              key={techIndex}
                              variant="outline"
                              className="bg-primary/5 text-primary border-primary/20"
                            >
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 max-w-4xl mx-auto">
                  <p className="text-gray-500 dark:text-gray-400">
                    {isEnglish
                      ? "No projects found. Add projects in the Project Management section."
                      : "لم يتم العثور على مشاريع. أضف مشاريع في قسم إدارة المشاريع."}
                  </p>
                </div>
              )}
            </>
          )}

          {/* Project Management Button */}
          <div className="flex justify-center mt-10">
            <Card className="p-8 text-center bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl hover:shadow-2xl transition-all duration-500 max-w-md">
              <div className="text-6xl mb-6 text-primary">🔐</div>
              <h3 className="text-2xl font-bold mb-4">{isEnglish ? "Project Management" : "إدارة المشاريع"}</h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                {isEnglish
                  ? "Access the secure project management dashboard to add, edit, and manage all your projects."
                  : "الوصول إلى لوحة تحكم إدارة المشاريع الآمنة لإضافة وتعديل وإدارة جميع مشاريعك."}
              </p>
              <Link href="/project-management">
                <Button size="lg" className="gap-2 group">
                  <Lock className="h-5 w-5 group-hover:rotate-12 transition-transform" />
                  {isEnglish ? "Secure Project Dashboard" : "لوحة المشاريع الآمنة"}
                </Button>
              </Link>
            </Card>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-animate">
          <h2 className="text-3xl font-bold mb-10 text-center text-primary">
            {isEnglish ? "Get In Touch" : "تواصل معي"}
          </h2>

          <div className="max-w-4xl mx-auto">
            <Card className="p-8 bg-white/80 dark:bg-gray-800/50 shadow-xl">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-6 text-primary">
                    {isEnglish ? "Contact Information" : "معلومات الاتصال"}
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full mt-1">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{isEnglish ? "Email" : "البريد الإلكتروني"}</h4>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">mommm93205@gmail.com</p>
                        <p className="text-gray-600 dark:text-gray-300">200041746@must.edu.eg</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full mt-1">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{isEnglish ? "Phone" : "الهاتف"}</h4>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">+20 1061014803</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="bg-primary/10 p-3 rounded-full mt-1">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium">{isEnglish ? "Location" : "الموقع"}</h4>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                          {isEnglish ? "Cairo, Egypt" : "القاهرة، مصر"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h4 className="font-medium mb-4">{isEnglish ? "Social Media" : "وسائل التواصل الاجتماعي"}</h4>
                    <div className="flex gap-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href="https://www.facebook.com/mommm93205" target="_blank" rel="noopener noreferrer">
                              <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full h-10 w-10 hover:scale-110 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
                              >
                                <Facebook className="h-5 w-5 text-blue-600 dark:text-blue-400" />
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
                                className="rounded-full h-10 w-10 hover:scale-110 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all duration-300"
                              >
                                <Instagram className="h-5 w-5 text-pink-600 dark:text-pink-400" />
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
                            <Link
                              href="https://www.linkedin.com/in/mostafaelhout/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Button
                                variant="outline"
                                size="icon"
                                className="rounded-full h-10 w-10 hover:scale-110 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
                              >
                                <Linkedin className="h-5 w-5 text-blue-700 dark:text-blue-500" />
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
                                className="rounded-full h-10 w-10 hover:scale-110 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
                              >
                                <Youtube className="h-5 w-5 text-red-600 dark:text-red-400" />
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
                                className="rounded-full h-10 w-10 hover:scale-110 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                              >
                                <Twitter className="h-5 w-5" />
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
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-6 text-primary">
                    {isEnglish ? "Send Me a Message" : "أرسل لي رسالة"}
                  </h3>

                  <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6 text-center">
                    <div className="text-6xl mb-4 mx-auto">💬</div>
                    <h4 className="text-lg font-medium mb-3">
                      {isEnglish ? "I prefer WhatsApp messages" : "أفضل الرسائل عبر واتساب"}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      {isEnglish
                        ? "Feel free to reach out to me directly on WhatsApp for faster responses."
                        : "لا تتردد في التواصل معي مباشرة على واتساب للحصول على ردود أسرع."}
                    </p>

                    <a
                      href="https://wa.me/201061014803"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block"
                    >
                      <Button size="lg" className="gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.72.045.419-.1.824z" />
                        </svg>
                        {isEnglish ? "Chat on WhatsApp" : "الدردشة على واتساب"}
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-10 mt-20 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold text-primary mb-4">{isEnglish ? "Dr Hout" : "د. حوت"}</h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-xs">
                {isEnglish
                  ? "Health Administration & Informatics specialist with a passion for technology and healthcare innovation."
                  : "متخصص في إدارة الصحة والمعلوماتية مع شغف بالتكنولوجيا والابتكار في مجال الرعاية الصحية."}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">{isEnglish ? "Quick Links" : "روابط سريعة"}</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("home")}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    {isEnglish ? "Home" : "الرئيسية"}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    {isEnglish ? "About" : "نبذة عني"}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("projects")}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    {isEnglish ? "Projects" : "المشاريع"}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection("contact")}
                    className="text-gray-600 dark:text-gray-400 hover:text-primary dark:hover:text-primary transition-colors"
                  >
                    {isEnglish ? "Contact" : "اتصل بي"}
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">{isEnglish ? "Newsletter" : "النشرة الإخبارية"}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {isEnglish
                  ? "Subscribe to receive updates on my latest projects and activities."
                  : "اشترك لتلقي التحديثات حول أحدث مشاريعي وأنشطتي."}
              </p>
              <div className="flex gap-2">
                <Input placeholder={isEnglish ? "Your email" : "بريدك الإلكتروني"} />
                <Button variant="outline">{isEnglish ? "Subscribe" : "اشترك"}</Button>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
            <div className="text-center mb-4">
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {isEnglish
                  ? "This site is protected by advanced security measures to ensure your data remains safe."
                  : "هذا الموقع محمي بتدابير أمنية متقدمة لضمان بقاء بياناتك آمنة."}
              </p>
            </div>
            <div className="text-center">
              <p className="text-gray-600 dark:text-gray-400">
                {isEnglish
                  ? "© 2024 Mostafa Emad Salah Hamdy. All rights reserved."
                  : "© 2024 مصطفى عماد صلاح حمدي. جميع الحقوق محفوظة."}
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-all duration-300 opacity-80 hover:opacity-100"
      >
        <ChevronUp className="h-5 w-5" />
      </button>

      {/* CSS for animations */}
      <style jsx global>{`
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeIn 0.6s ease-out forwards;
        }

        .fade-in-delay-1 {
          animation-delay: 0.2s;
        }

        .fade-in-delay-2 {
          animation-delay: 0.4s;
        }

        .fade-in-delay-3 {
          animation-delay: 0.6s;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .scroll-animate {
          opacity: 0;
          transform: translateY(40px);
          transition: all 0.6s ease-out;
        }

        .scroll-animate.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  )
}

