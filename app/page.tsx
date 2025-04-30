"use client"

import { useState, useEffect } from "react"
import {
  ChevronDown,
  Mail,
  MapPin,
  Phone,
  Calendar,
  Download,
  ArrowRight,
  ChevronUp,
  Loader2,
  Globe,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useProjectStore } from "@/lib/project-store"
import { RotatingText } from "@/components/effects/rotating-text"
import { BlurText } from "@/components/effects/blur-text"
import { DecryptedText } from "@/components/effects/decrypted-text"
import { ScrollReveal } from "@/components/effects/scroll-reveal"
import { ThemeToggle } from "@/components/theme-toggle"
import { LanguageToggle } from "@/components/language-toggle"
import { SocialLinks } from "@/components/social-links"
import { MobileNav } from "@/components/mobile-nav"
// Add the import for the PresentationScreen component
import { PresentationScreen } from "@/components/presentation-screen"
import { PresentationViewer } from "@/components/presentation-viewer"

export default function PersonalPage() {
  const { projects, loading, error, fetchProjects } = useProjectStore()

  const [isEnglish, setIsEnglish] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [age, setAge] = useState(0)
  const [activeSection, setActiveSection] = useState<string>("home")
  const [isMounted, setIsMounted] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isPresentationOpen, setIsPresentationOpen] = useState(false)
  const [presentations, setPresentations] = useState([
    {
      id: "1",
      title: { en: "Introduction to Data Science", ar: "مقدمة في علم البيانات" },
      description: { en: "A brief overview of data science concepts.", ar: "نظرة عامة موجزة عن مفاهيم علم البيانات." },
      type: "slides",
      thumbnailUrl: "/images/data-science-thumbnail.png",
      url: "/presentations/data-science.pdf",
    },
    {
      id: "2",
      title: { en: "Digital Marketing Strategies", ar: "استراتيجيات التسويق الرقمي" },
      description: {
        en: "Effective strategies for digital marketing campaigns.",
        ar: "استراتيجيات فعالة لحملات التسويق الرقمي.",
      },
      type: "pdf",
      thumbnailUrl: "/images/digital-marketing-thumbnail.png",
      url: "/presentations/digital-marketing.pdf",
    },
    {
      id: "3",
      title: { en: "Health Informatics Overview", ar: "نظرة عامة على المعلوماتية الصحية" },
      description: {
        en: "An introduction to health informatics and its applications.",
        ar: "مقدمة في المعلوماتية الصحية وتطبيقاتها.",
      },
      type: "slides",
      thumbnailUrl: "/images/health-informatics-thumbnail.png",
      url: "/presentations/health-informatics.pdf",
    },
  ])
  const [selectedPresentation, setSelectedPresentation] = useState(null)
  const [cursorPosition, setCursorPosition] = useState({ x: -100, y: -100 })

  useEffect(() => {
    setIsMounted(true)

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

    const birthDate = new Date("2005-03-05")
    setAge(calculateAge(birthDate))

    // Set up intersection observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
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

    document.querySelectorAll("section[id]").forEach((element) => {
      observer.observe(element)
    })

    // Check if user prefers dark mode
    // if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    //   setIsDarkMode(true)
    // }

    // Add scroll listener for navbar
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    const handleParallax = () => {
      const scrolled = window.scrollY
      const parallaxElements = document.querySelectorAll(".parallax")
      parallaxElements.forEach((el) => {
        const speed = el.getAttribute("data-speed") || 0.2
        const yPos = -(scrolled * speed)
        el.style.transform = `translateY(${yPos}px)`
      })
    }

    window.addEventListener("scroll", handleScroll)
    window.addEventListener("scroll", handleParallax)

    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("scroll", handleParallax)
      window.removeEventListener("mousemove", handleMouseMove)
    }
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
    { name: "Web Development", icon: "💻", level: 75 },
    { name: "AI Integration", icon: "🤖", level: 70 },
    { name: "Adobe Photoshop", icon: "🎨", level: 85 },
    { name: "Video Editing", icon: "🎬", level: 80 },
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

  // Rotating text phrases
  const rotatingPhrases = {
    en: [
      "Health Informatics Specialist",
      "Python Developer",
      "Data Scientist",
      "Digital Marketing Expert",
      "Healthcare Administrator",
    ],
    ar: ["متخصص في المعلوماتية الصحية", "مطور بايثون", "عالم بيانات", "خبير تسويق رقمي", "مدير رعاية صحية"],
  }

  if (!isMounted) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  const openPresentation = (presentation) => {
    setSelectedPresentation(presentation)
    setIsPresentationOpen(true)
  }

  return (
    <div
      className={`min-h-screen font-sans transition-all duration-300 ${isDarkMode ? "dark bg-gray-900 text-gray-100" : "bg-gradient-to-br from-slate-50 to-slate-100 text-gray-800"}`}
      dir={isEnglish ? "ltr" : "rtl"}
    >
      {/* Navigation */}
      <nav
        className={`fixed w-full z-10 transition-all duration-300 ${isScrolled ? "py-2 bg-white/90 dark:bg-gray-900/90 shadow-md" : "py-4 bg-white/70 dark:bg-gray-900/70 shadow-sm"} backdrop-blur-md`}
      >
        <div className="container mx-auto px-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold hover:scale-105 transition-transform duration-300 text-primary">
            <DecryptedText text={isEnglish ? "Dr Hout" : "د. حوت"} duration={1500} className="font-bold" />
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
              onClick={() => scrollToSection("contact")}
              className={`text-sm font-medium hover:text-primary transition-colors ${activeSection === "contact" ? "text-primary" : ""}`}
            >
              {isEnglish ? "Contact" : "اتصل بي"}
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <LanguageToggle isEnglish={isEnglish} toggleLanguage={toggleLanguage} />
            <ThemeToggle isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />

            {/* Mobile Navigation */}
            <MobileNav isEnglish={isEnglish} activeSection={activeSection} scrollToSection={scrollToSection} />
          </div>
        </div>
      </nav>
      <header id="home" className="pt-32 pb-16 text-center relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute top-40 right-1/4 w-72 h-72 bg-purple-300/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-blue-300/10 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="container mx-auto px-6 relative">
          <ScrollReveal animation="fade-down" duration={1000}>
            <div className="relative w-40 h-40 mx-auto mb-8">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/60 rounded-full blur-xl opacity-20 animate-pulse"></div>
              <img
                src="/images/profile.png"
                alt="Mostafa Emad"
                className="relative w-40 h-40 mx-auto rounded-full border-4 border-white dark:border-gray-800 shadow-xl object-cover animate-float"
              />
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" duration={1000} delay={200}>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">
              <BlurText
                text={isEnglish ? "Mostafa Emad Salah Hamdy" : "مصطفى عماد صلاح حمدي"}
                duration={2000}
                initialBlur={10}
              />
            </h1>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" duration={1000} delay={400}>
            <p className="text-xl mb-2 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              {isEnglish ? "I am a " : "أنا "}
              <RotatingText
                texts={isEnglish ? rotatingPhrases.en : rotatingPhrases.ar}
                className="text-primary font-semibold"
                interval={3000}
                typingSpeed={80}
                deletingSpeed={40}
              />
            </p>
            <p className="text-lg mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              {isEnglish
                ? "Driven by a passion for programming and management, merging creativity with technology"
                : "مدفوع بشغف البرمجة والإدارة، يمزج بين الإبداع والتكنولوجيا"}
            </p>
          </ScrollReveal>

          <ScrollReveal animation="fade-up" duration={1000} delay={600}>
            <div className="flex justify-center gap-4">
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
          </ScrollReveal>

          <ScrollReveal animation="fade-up" duration={1000} delay={800}>
            <div className="mt-12">
              <ChevronDown className="mx-auto animate-bounce text-primary" />
            </div>
          </ScrollReveal>
        </div>
      </header>
      <main className="container mx-auto px-6 py-12 space-y-32">
        {/* Personal Information */}
        <section id="about">
          <ScrollReveal animation="fade-up" duration={1000}>
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
                      ? "I am a dedicated Health Administration & Informatics student with a strong passion for leveraging programming and digital solutions to improve healthcare systems. My expertise spans data analysis, digital marketing, Python development, and health system management."
                      : "أنا طالب متخصص في إدارة الصحة والمعلوماتية مع شغف قوي بتسخير البرمجة والحلول الرقمية لتحسين أنظمة الرعاية الصحية. تمتد خبرتي لتشمل تحليل البيانات والتسويق الرقمي وتطوير بايثون وإدارة النظم الصحية."}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {isEnglish
                      ? "Currently serving as the Head of Social Activities and Trips Committee 2024-2025 at the Faculty of Health Sciences Student Union, where I develop leadership skills while organizing impactful events for students."
                      : "أعمل حاليًا كرئيس لجنة الأنشطة الاجتماعية والرحلات 2024-2025 في اتحاد طلاب كلية العلوم الصحية، حيث أطور مهارات القيادة مع تنظيم فعاليات مؤثرة للطلاب."}
                  </p>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </section>

        {/* Skills */}
        <section id="skills">
          <ScrollReveal animation="fade-up" duration={1000}>
            <h2 className="text-3xl font-bold mb-10 text-center text-primary">{isEnglish ? "Skills" : "المهارات"}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-6">
                {skills.slice(0, 2).map((skill, index) => (
                  <ScrollReveal key={index} animation="fade-right" duration={800} delay={index * 200}>
                    <div className="space-y-2 group">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl transform transition-transform duration-300 group-hover:scale-125">
                            {skill.icon}
                          </span>
                          <h3 className="font-medium">{skill.name}</h3>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden group-hover:bg-gray-300 dark:group-hover:bg-gray-600 transition-colors">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-1000 ease-out group-hover:bg-primary/80"
                          style={{ width: `${skill.level}%`, transitionDelay: `${index * 0.2}s` }}
                        ></div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <div className="space-y-6">
                {skills.slice(2, 4).map((skill, index) => (
                  <ScrollReveal key={index} animation="fade-left" duration={800} delay={(index + 2) * 200}>
                    <div className="space-y-2 group">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl transform transition-transform duration-300 group-hover:scale-125">
                            {skill.icon}
                          </span>
                          <h3 className="font-medium">{skill.name}</h3>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{skill.level}%</span>
                      </div>
                      <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden group-hover:bg-gray-300 dark:group-hover:bg-gray-600 transition-colors">
                        <div
                          className="h-full bg-primary rounded-full transition-all duration-1000 ease-out group-hover:bg-primary/80"
                          style={{ width: `${skill.level}%`, transitionDelay: `${(index + 2) * 0.2}s` }}
                        ></div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* Certificates */}
            <div className="mt-20">
              <ScrollReveal animation="fade-up" duration={1000}>
                <h3 className="text-2xl font-bold mb-8 text-center text-primary">
                  {isEnglish ? "Qualifications and Certificates" : "المؤهلات والشهادات"}
                </h3>
              </ScrollReveal>
              <div className="max-w-3xl mx-auto space-y-4">
                {certificates.map((cert, index) => (
                  <ScrollReveal key={index} animation="fade-up" duration={800} delay={index * 100}>
                    <div className="p-4 border-l-4 border-primary bg-white/80 dark:bg-gray-800/50 rounded-r-lg shadow hover:shadow-md hover:translate-x-1 transition-all duration-300">
                      <p className="font-medium">{isEnglish ? cert.en : cert.ar}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Education */}
        <section id="education">
          <ScrollReveal animation="fade-up" duration={1000}>
            <h2 className="text-3xl font-bold mb-10 text-center text-primary">{isEnglish ? "Education" : "التعليم"}</h2>

            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 rounded-full"></div>

                {/* Education item */}
                <ScrollReveal animation="fade-up" duration={1000} delay={200}>
                  <div className="relative mb-12">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 w-6 h-6 rounded-full bg-primary border-4 border-white dark:border-gray-900"></div>

                    <Card className="max-w-lg mx-auto p-8 text-center bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl hover:shadow-2xl transition-all duration-500">
                      <div className="text-6xl mb-6 text-primary">🎓</div>
                      <h3 className="text-2xl font-bold mb-2">
                        {isEnglish ? "Faculty of Health Sciences" : "كلية العلوم الصحية"}
                      </h3>
                      <p className="text-lg text-gray-600 dark:text-gray-300 mb-2">
                        {isEnglish ? "Health Administration & Informatics" : "إدارة الصحة والمعلوماتية"}
                        {" • "}
                        {isEnglish ? "GPA: 3.49/4.0" : "المعدل التراكمي: 3.49/4.0"}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {isEnglish
                          ? "Misr University for Science and Technology (MUST)"
                          : "جامعة مصر للعلوم والتكنولوجيا"}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {isEnglish ? "2023 - Present" : "2023 - الحاضر"}
                      </p>
                    </Card>
                  </div>
                </ScrollReveal>

                {/* Previous education */}
                <ScrollReveal animation="fade-up" duration={1000} delay={400}>
                  <div className="relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 -top-2 w-6 h-6 rounded-full bg-primary/70 border-4 border-white dark:border-gray-900"></div>

                    <Card className="max-w-lg mx-auto p-6 text-center bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-500">
                      <h3 className="text-xl font-bold mb-2">
                        {isEnglish ? "High School Diploma" : "الثانوية العامة"}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 mb-2">
                        {isEnglish ? "Science Track" : "القسم العلمي"}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {isEnglish ? "2020 - 2023" : "2020 - 2023"}
                      </p>
                    </Card>
                  </div>
                </ScrollReveal>
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* Languages */}
        <section>
          <ScrollReveal animation="fade-up" duration={1000}>
            <h2 className="text-3xl font-bold mb-10 text-center text-primary">{isEnglish ? "Languages" : "اللغات"}</h2>
            <div className="max-w-3xl mx-auto">
              <Card className="p-8 text-center bg-white/80 dark:bg-gray-800/50 shadow-xl">
                <div className="grid grid-cols-2 gap-8">
                  <div className="flex flex-col items-center">
                    <div className="text-4xl mb-4">🇪🇬</div>
                    <h3 className="text-xl font-bold mb-2">{isEnglish ? "Arabic" : "العربية"}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{isEnglish ? "Native" : "اللغة الأم"}</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-4xl mb-4">🇬🇧</div>
                    <h3 className="text-xl font-bold mb-2">{isEnglish ? "English" : "الإنجليزية"}</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {isEnglish ? "Intermediate (Actively improving)" : "متوسط (تحسين نشط)"}
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </ScrollReveal>
        </section>

        <section>
          <ScrollReveal animation="fade-up" duration={1000}>
            <h2 className="text-3xl font-bold mb-10 text-center text-primary">
              {isEnglish ? "CV & Resume" : "السيرة الذاتية"}
            </h2>

            <div className="max-w-4xl mx-auto">
              <Card className="p-8 bg-white/80 dark:bg-gray-800/50 shadow-xl">
                <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6 md:gap-0">
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
          </ScrollReveal>
        </section>

        {/* Contact Section */}
        <section id="contact">
          <ScrollReveal animation="fade-up" duration={1000}>
            <h2 className="text-3xl font-bold mb-10 text-center text-primary">
              {isEnglish ? "Get In Touch" : "تواصل معي"}
            </h2>

            <div className="max-w-4xl mx-auto">
              <Card className="p-8 bg-white/80 dark:bg-gray-800/50 shadow-xl">
                <div className="grid md:grid-cols-2 gap-8">
                  <ScrollReveal animation="fade-right" duration={1000} delay={200}>
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
                              {isEnglish ? "Giza, Egypt" : "الجيزة، مصر"}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="bg-primary/10 p-3 rounded-full mt-1">
                            <Globe className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <h4 className="font-medium">{isEnglish ? "Portfolio" : "الموقع الشخصي"}</h4>
                            <a
                              href="https://dr-hout.vercel.app"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-primary hover:underline"
                            >
                              dr-hout.vercel.app
                            </a>
                          </div>
                        </div>
                      </div>

                      <div className="mt-8">
                        <h4 className="font-medium mb-4">{isEnglish ? "Social Media" : "وسائل التواصل الاجتماعي"}</h4>
                        <SocialLinks />
                      </div>
                    </div>
                  </ScrollReveal>

                  <ScrollReveal animation="fade-left" duration={1000} delay={400}>
                    <div>
                      <h3 className="text-xl font-bold mb-6 text-primary">
                        {isEnglish ? "Send Me a Message" : "أرسل لي رسالة"}
                      </h3>

                      <div className="bg-white/50 dark:bg-gray-800/50 rounded-lg p-6 text-center transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
                        <div className="text-6xl mb-4 mx-auto animate-bounce-slow">💬</div>
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
                          <Button size="lg" className="gap-2 group">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              className="w-5 h-5 group-hover:animate-wiggle"
                            >
                              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-.1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.72.045.419-.1.824z" />
                            </svg>
                            {isEnglish ? "Send WhatsApp Message" : "إرسال رسالة واتساب"}
                          </Button>
                        </a>
                      </div>
                    </div>
                  </ScrollReveal>
                </div>
              </Card>
            </div>
          </ScrollReveal>
        </section>
      </main>
      {/* Footer */}
      <footer className="py-10 mt-20 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center">
          <div className="mb-6">
            <SocialLinks size="sm" className="justify-center" />
          </div>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            {isEnglish
              ? "© 2024 Mostafa Emad Salah Hamdy. All rights reserved."
              : "© 2024 مصطفى عماد صلاح حمدي. جميع الحقوق محفوظة."}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            {isEnglish ? "Health Administration & Informatics Student" : "طالب إدارة الصحة والمعلوماتية"}
          </p>
        </div>
      </footer>
      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 p-3 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-all duration-300 opacity-80 hover:opacity-100 hover:scale-110"
        aria-label={isEnglish ? "Back to top" : "العودة إلى الأعلى"}
      >
        <ChevronUp className="h-5 w-5 animate-pulse" />
      </button>
      {/* Presentation Screen */}
      <PresentationScreen
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
        isEnglish={isEnglish}
      />
      {/* Presentation Viewer */}
      <PresentationViewer
        isOpen={isPresentationOpen}
        onClose={() => setIsPresentationOpen(false)}
        isEnglish={isEnglish}
        presentation={selectedPresentation}
      />
      <div
        className="custom-cursor hidden md:block"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
        }}
      ></div>
      {/* CSS for animations */}
      <style jsx global>{`
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }

        .animate-blink {
          animation: blink 1s step-end infinite;
        }

        .custom-cursor {
          position: fixed;
          width: 40px;
          height: 40px;
          border: 2px solid var(--primary);
          border-radius: 50%;
          pointer-events: none;
          transform: translate(-50%, -50%);
          z-index: 9999;
          transition: transform 0.1s ease;
          opacity: 0.6;
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }

        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }

        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }

        @keyframes bounce {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes wiggle {
          0%,
          100% {
            transform: rotate(0deg);
          }
          25% {
            transform: rotate(10deg);
          }
          75% {
            transform: rotate(-10deg);
          }
        }

        .group-hover\\:animate-wiggle:hover {
          animation: wiggle 1s ease-in-out;
        }
      `}</style>
    </div>
  )
}
