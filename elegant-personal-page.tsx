import { useState, useEffect } from 'react'
import { ChevronDown, Facebook, Instagram, Linkedin, Youtube } from 'lucide-react'

export default function ClassicElegantPersonalPage() {
  const [isEnglish, setIsEnglish] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [age, setAge] = useState(0)

  useEffect(() => {
    const calculateAge = (birthDate: Date) => {
      const today = new Date()
      let age = today.getFullYear() - birthDate.getFullYear()
      const monthDifference = today.getMonth() - birthDate.getMonth()
      if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      return age
    }

    const birthDate = new Date('2005-03-09')
    setAge(calculateAge(birthDate))
  }, [])

  const toggleLanguage = () => setIsEnglish(!isEnglish)
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  return (
    <div className={`min-h-screen font-serif ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-cream text-gray-800'} transition-colors duration-300`}>
      <nav className="fixed w-full bg-opacity-90 backdrop-blur-sm z-10 transition-all duration-300">
        <div className="container mx-auto px-6 py-3 flex justify-between items-center">
          <h1 className="text-2xl font-bold">{isEnglish ? 'ME' : 'م.ع'}</h1>
          <div className="flex items-center space-x-4">
            <button onClick={toggleLanguage} className="text-sm hover:underline transition-all duration-300">
              {isEnglish ? 'عربي' : 'English'}
            </button>
            <button onClick={toggleDarkMode} className="text-sm hover:underline transition-all duration-300">
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>

      <header className="pt-24 pb-16 text-center">
        <div className="container mx-auto px-6">
          <img src="/placeholder.svg?height=150&width=150" alt="Mostafa Emad" className="w-40 h-40 mx-auto rounded-full border-4 border-current mb-6 transition-all duration-300 hover:scale-105" />
          <h1 className="text-4xl font-bold mb-2">{isEnglish ? 'Mostafa Emad Salah Hamdy' : 'مصطفى عماد صلاح حمدي'}</h1>
          <p className="text-xl mb-6">{isEnglish ? 'Passionate about Programming and Gaming' : 'شغوف بالبرمجة والألعاب'}</p>
          <ChevronDown className="mx-auto animate-bounce" />
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 space-y-24">
        <section>
          <h2 className="text-3xl font-bold mb-6 text-center">{isEnglish ? 'Personal Information' : 'المعلومات الشخصية'}</h2>
          <div className="max-w-2xl mx-auto space-y-4 text-center">
            <p><strong>{isEnglish ? 'Age' : 'العمر'}:</strong> {age}</p>
            <p><strong>{isEnglish ? 'Nationality' : 'الجنسية'}:</strong> {isEnglish ? 'Egyptian' : 'مصري'}</p>
            <p><strong>{isEnglish ? 'Email' : 'البريد الإلكتروني'}:</strong> mommm2005@gmail.com</p>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-center">{isEnglish ? 'Skills' : 'المهارات'}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Python', 'Data Science', 'Digital Marketing', 'Health Administration'].map((skill) => (
              <span key={skill} className="px-4 py-2 bg-opacity-20 bg-gray-500 rounded-full text-sm transition-all duration-300 hover:bg-opacity-30">
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-center">{isEnglish ? 'Qualifications and Certificates' : 'المؤهلات والشهادات'}</h2>
          <ul className="max-w-2xl mx-auto space-y-4 list-disc list-inside">
            <li>{isEnglish ? 'Digital Marketing: Misr University for Science and Technology (MUST), 2024' : 'التسويق الرقمي: جامعة مصر للعلوم والتكنولوجيا (MUST)، 2024'}</li>
            <li>{isEnglish ? 'ISO 45001/2018: Occupational Safety and Health Management System' : 'ISO 45001/2018: نظام إدارة السلامة والصحة المهنية'}</li>
            <li>{isEnglish ? 'Data Science: Completion Certificate from Moka Satar' : 'علوم البيانات: شهادة إتمام من موكا سطر'}</li>
            <li>{isEnglish ? 'Python 101: Completion Certificate from Moka Satar' : 'بايثون 101: شهادة إتمام من موكا سطر'}</li>
            <li>{isEnglish ? 'Body Language & Business Etiquette: Almentor platform' : 'لغة الجسد وآداب العمل: منصة المنتور'}</li>
            <li>{isEnglish ? 'Attendance Certificate at Third International Biotechnology Conference, Mast University' : 'شهادة حضور المؤتمر الدولي الثالث للتكنولوجيا الحيوية، جامعة ماست'}</li>
          </ul>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-center">{isEnglish ? 'Education' : 'التعليم'}</h2>
          <p className="text-center">{isEnglish ? 'Faculty of Health Sciences - Health Administration & Informatics' : 'كلية العلوم الصحية - إدارة الصحة والمعلوماتية'}</p>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-6 text-center">{isEnglish ? 'Social Media' : 'وسائل التواصل الاجتماعي'}</h2>
          <div className="flex justify-center space-x-6">
            <a href="https://www.facebook.com/mommm93205" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110">
              <Facebook size={24} />
              <span className="sr-only">Facebook</span>
            </a>
            <a href="https://www.instagram.com/lahn_alhout/" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110">
              <Instagram size={24} />
              <span className="sr-only">Instagram</span>
            </a>
            <a href="https://www.linkedin.com/in/mostafaelhout/" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110">
              <Linkedin size={24} />
              <span className="sr-only">LinkedIn</span>
            </a>
            <a href="https://www.youtube.com/@elhoutGaming" target="_blank" rel="noopener noreferrer" className="transition-transform duration-300 hover:scale-110">
              <Youtube size={24} />
              <span className="sr-only">YouTube</span>
            </a>
          </div>
        </section>
      </main>

      <footer className="text-center py-6">
        <p>{isEnglish ? '© 2024 Mostafa Emad Salah Hamdy. All rights reserved.' : '© 2024 مصطفى عماد صلاح حمدي. جميع الحقوق محفوظة.'}</p>
      </footer>
    </div>
  )
}