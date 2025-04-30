"use client"

import { useState, useEffect } from "react"
import { Moon, Sun, Facebook, Instagram, Linkedin, Youtube, Twitter, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function PersonalPage() {
  const [isEnglish, setIsEnglish] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [age, setAge] = useState(0)

  useEffect(() => {
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
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.1 },
    )

    document.querySelectorAll(".scroll-animate").forEach((element) => {
      observer.observe(element)
    })

    return () => observer.disconnect()
  }, [])

  const toggleLanguage = () => {
    setIsEnglish(!isEnglish)
  }

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
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

  return (
    <div
      className={`min-h-screen font-serif transition-all duration-300 ${isDarkMode ? "dark bg-gray-900 text-gray-100" : "bg-gradient-to-br from-slate-50 to-slate-100 text-gray-800"}`}
      dir={isEnglish ? "ltr" : "rtl"}
    >
      {/* Navigation */}
      <nav className="fixed w-full z-10 backdrop-blur-md bg-white/70 dark:bg-gray-900/70 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold hover:scale-105 transition-transform duration-300">
            {isEnglish ? "Dr Hout" : "د. حوت"}
          </h1>
          <div className="flex items-center space-x-4">
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
      <header className="pt-32 pb-16 text-center">
        <div className="container mx-auto px-6">
          <div className="relative w-40 h-40 mx-auto mb-8">
            <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/60 rounded-full blur-xl opacity-20 animate-pulse"></div>
            <img
              src="/placeholder.svg?height=150&width=150"
              alt="Mostafa Emad"
              className="relative w-40 h-40 mx-auto rounded-full border-4 border-white dark:border-gray-800 shadow-xl object-cover animate-float"
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 fade-in bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
            {isEnglish ? "Mostafa Emad Salah Hamdy" : "مصطفى عماد صلاح حمدي"}
          </h1>
          <p className="text-xl mb-8 fade-in fade-in-delay-1 max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            {isEnglish
              ? "I am a dedicated Health Administration & Informatics student with a strong passion for leveraging programming and digital solutions to improve healthcare systems. My expertise spans data analysis, digital marketing, Python development, and health system management."
              : "أنا طالب متخصص في إدارة الصحة والمعلوماتية مع شغف قوي بتسخير البرمجة والحلول الرقمية لتحسين أنظمة الرعاية الصحية. تمتد خبرتي لتشمل تحليل البيانات والتسويق الرقمي وتطوير بايثون وإدارة النظم الصحية."}
          </p>
          <ChevronDown className="mx-auto animate-bounce fade-in fade-in-delay-2 text-primary" />
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-12 space-y-32">
        {/* Personal Information */}
        <section className="scroll-animate">
          <Card className="max-w-3xl mx-auto p-8 shadow-lg hover:shadow-xl transition-all duration-500 bg-white/80 dark:bg-gray-800/50 backdrop-blur-sm">
            <h2 className="text-3xl font-bold mb-8 text-center text-primary">
              {isEnglish ? "Personal Information" : "المعلومات الشخصية"}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:scale-105 transition-transform duration-300">
                <p className="font-medium text-gray-500 dark:text-gray-400 text-sm mb-1">
                  {isEnglish ? "Age" : "العمر"}
                </p>
                <p className="text-xl font-bold">{age}</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:scale-105 transition-transform duration-300">
                <p className="font-medium text-gray-500 dark:text-gray-400 text-sm mb-1">
                  {isEnglish ? "Nationality" : "الجنسية"}
                </p>
                <p className="text-xl font-bold">{isEnglish ? "Egyptian" : "مصري"}</p>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:scale-105 transition-transform duration-300">
                <p className="font-medium text-gray-500 dark:text-gray-400 text-sm mb-1">
                  {isEnglish ? "Email" : "البريد الإلكتروني"}
                </p>
                <div className="space-y-1">
                  <p className="text-lg font-bold">mommm93205@gmail.com</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {isEnglish ? "University: " : "الجامعة: "}
                    200041746@must.edu.eg
                  </p>
                </div>
              </div>
              <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 hover:scale-105 transition-transform duration-300">
                <p className="font-medium text-gray-500 dark:text-gray-400 text-sm mb-1">
                  {isEnglish ? "Position" : "المنصب"}
                </p>
                <p className="text-lg font-bold">
                  {isEnglish
                    ? "Head of Social Activities and Trips Committee 2024-2025, Faculty of Health Sciences Student Union"
                    : "رئيس لجنة الأنشطة الاجتماعية والرحلات 2024-2025، اتحاد طلاب كلية العلوم الصحية"}
                </p>
              </div>
            </div>
          </Card>
        </section>

        {/* Skills */}
        <section className="scroll-animate">
          <h2 className="text-3xl font-bold mb-10 text-center text-primary">{isEnglish ? "Skills" : "المهارات"}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-primary/80 to-primary p-6 rounded-xl text-white text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="text-5xl mb-4 opacity-80">{skill.icon}</div>
                <h3 className="text-xl font-bold">{skill.name}</h3>
              </div>
            ))}
          </div>
        </section>

        {/* Certificates */}
        <section className="scroll-animate">
          <h2 className="text-3xl font-bold mb-10 text-center text-primary">
            {isEnglish ? "Qualifications and Certificates" : "المؤهلات والشهادات"}
          </h2>
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
        </section>

        {/* Education */}
        <section className="scroll-animate">
          <h2 className="text-3xl font-bold mb-10 text-center text-primary">{isEnglish ? "Education" : "التعليم"}</h2>
          <div className="max-w-3xl mx-auto">
            <Card className="p-8 text-center bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-xl hover:shadow-2xl transition-all duration-500">
              <div className="text-6xl mb-6 text-primary">🎓</div>
              <h3 className="text-2xl font-bold mb-4">
                {isEnglish ? "Faculty of Health Sciences" : "كلية العلوم الصحية"}
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                {isEnglish ? "Health Administration & Informatics" : "إدارة الصحة والمعلوماتية"}
              </p>
            </Card>
          </div>
        </section>

        {/* Languages */}
        <section className="scroll-animate">
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
        </section>

        {/* Projects and Work */}
        <section className="scroll-animate">
          <h2 className="text-3xl font-bold mb-10 text-center text-primary">
            {isEnglish ? "Projects & Work" : "المشاريع والأعمال"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-r from-primary/80 to-primary flex items-center justify-center">
                <div className="text-6xl text-white">📊</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {isEnglish ? "Health Data Analysis Dashboard" : "لوحة تحليل البيانات الصحية"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {isEnglish
                    ? "A Python-based dashboard for analyzing health metrics and patient data for healthcare facilities."
                    : "لوحة معلومات تعتمد على بايثون لتحليل المقاييس الصحية وبيانات المرضى للمرافق الصحية."}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">Python</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">Pandas</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">Dash</span>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-r from-primary/80 to-primary flex items-center justify-center">
                <div className="text-6xl text-white">🏥</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {isEnglish ? "Hospital Management System" : "نظام إدارة المستشفيات"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {isEnglish
                    ? "A comprehensive system for managing hospital resources, staff scheduling, and patient records."
                    : "نظام شامل لإدارة موارد المستشفى وجدولة الموظفين وسجلات المرضى."}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">SQL</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">Python</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">Django</span>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-r from-primary/80 to-primary flex items-center justify-center">
                <div className="text-6xl text-white">🏥</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {isEnglish ? "Hospital Management System with AI" : "نظام إدارة المستشفيات مع الذكاء الاصطناعي"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {isEnglish
                    ? "Flask-based app with patient records, appointments, billing, and an AI-powered congestion prediction system."
                    : "تطبيق قائم على Flask مع سجلات المرضى والمواعيد والفواتير ونظام تنبؤ بالازدحام مدعوم بالذكاء الاصطناعي."}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">Python</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">Flask</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">AI</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">SQL</span>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-r from-primary/80 to-primary flex items-center justify-center">
                <div className="text-6xl text-white">📱</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {isEnglish ? "Health Sciences Social Media Campaign" : "حملة وسائل التواصل الاجتماعي لعلوم الصحة"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {isEnglish
                    ? "Designed and executed a digital marketing campaign for Faculty of Health Sciences events."
                    : "تصميم وتنفيذ حملة تسويق رقمي لفعاليات كلية العلوم الصحية."}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">Digital Marketing</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">Social Media</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">Analytics</span>
                </div>
              </div>
            </Card>

            <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300">
              <div className="h-48 bg-gradient-to-r from-primary/80 to-primary flex items-center justify-center">
                <div className="text-6xl text-white">🌐</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  {isEnglish ? "Student Union Web Portal" : "بوابة اتحاد الطلاب الإلكترونية"}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {isEnglish
                    ? "Developed a web portal for Faculty of Health Sciences Student Union to manage events and activities."
                    : "تطوير بوابة إلكترونية لاتحاد طلاب كلية العلوم الصحية لإدارة الفعاليات والأنشطة."}
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">HTML/CSS</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">JavaScript</span>
                  <span className="px-2 py-1 bg-primary/10 text-primary rounded-md text-xs">PHP</span>
                </div>
              </div>
            </Card>
          </div>
        </section>

        {/* Social Media */}
        <section className="scroll-animate">
          <h2 className="text-3xl font-bold mb-10 text-center text-primary">
            {isEnglish ? "Social Media" : "وسائل التواصل الاجتماعي"}
          </h2>
          <div className="flex flex-wrap justify-center gap-6 max-w-3xl mx-auto">
            <Link href="https://www.facebook.com/mommm93205" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full h-16 w-16 p-0 hover:scale-110 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
              >
                <Facebook className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                <span className="sr-only">Facebook</span>
              </Button>
            </Link>
            <Link href="https://www.instagram.com/dr_hout/" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full h-16 w-16 p-0 hover:scale-110 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all duration-300"
              >
                <Instagram className="h-6 w-6 text-pink-600 dark:text-pink-400" />
                <span className="sr-only">Instagram</span>
              </Button>
            </Link>
            <Link href="https://www.linkedin.com/in/mostafaelhout/" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full h-16 w-16 p-0 hover:scale-110 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300"
              >
                <Linkedin className="h-6 w-6 text-blue-700 dark:text-blue-500" />
                <span className="sr-only">LinkedIn</span>
              </Button>
            </Link>
            <Link href="https://www.youtube.com/@Dr_hout" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full h-16 w-16 p-0 hover:scale-110 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-300"
              >
                <Youtube className="h-6 w-6 text-red-600 dark:text-red-400" />
                <span className="sr-only">YouTube</span>
              </Button>
            </Link>
            <Link href="https://x.com/Dr_hout" target="_blank" rel="noopener noreferrer">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full h-16 w-16 p-0 hover:scale-110 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
              >
                <Twitter className="h-6 w-6" />
                <span className="sr-only">X</span>
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-10 mt-20 border-t border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            {isEnglish
              ? "© 2024 Mostafa Emad Salah Hamdy. All rights reserved."
              : "© 2024 مصطفى عماد صلاح حمدي. جميع الحقوق محفوظة."}
          </p>
        </div>
      </footer>

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
