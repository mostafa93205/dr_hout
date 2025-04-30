import { create } from "zustand"
import { v4 as uuidv4 } from "uuid"
import type { Presentation } from "@/components/presentation-viewer"

interface PresentationStore {
  presentations: Presentation[]
  activePresentationId: string | null
  loading: boolean
  error: string | null
  fetchPresentations: () => Promise<void>
  addPresentation: (presentation: Omit<Presentation, "id">) => Promise<void>
  updatePresentation: (presentation: Presentation) => Promise<void>
  deletePresentation: (id: string) => Promise<void>
  setActivePresentation: (id: string | null) => void
}

// Mock data for initial presentations
const initialPresentations: Presentation[] = [
  {
    id: "1",
    title: {
      en: "Introduction to Web Development",
      ar: "مقدمة في تطوير الويب",
    },
    description: {
      en: "A comprehensive overview of modern web development technologies and practices.",
      ar: "نظرة شاملة على تقنيات وممارسات تطوير الويب الحديثة.",
    },
    type: "slides",
    slides: [
      {
        title: { en: "Introduction", ar: "مقدمة" },
        content: {
          en: "Welcome to Web Development 101. This presentation covers the basics of HTML, CSS, and JavaScript.",
          ar: "مرحبًا بكم في تطوير الويب 101. يغطي هذا العرض التقديمي أساسيات HTML و CSS و JavaScript.",
        },
        color: "from-primary/80 to-primary",
      },
      {
        title: { en: "HTML Basics", ar: "أساسيات HTML" },
        content: {
          en: "HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser.",
          ar: "HTML (لغة ترميز النص التشعبي) هي لغة الترميز القياسية للمستندات المصممة ليتم عرضها في متصفح الويب.",
        },
        color: "from-blue-500/80 to-blue-600",
      },
      {
        title: { en: "CSS Fundamentals", ar: "أساسيات CSS" },
        content: {
          en: "CSS (Cascading Style Sheets) is a style sheet language used for describing the presentation of a document written in HTML.",
          ar: "CSS (أوراق الأنماط المتتالية) هي لغة ورقة الأنماط المستخدمة لوصف عرض مستند مكتوب بلغة HTML.",
        },
        color: "from-green-500/80 to-green-600",
      },
    ],
    date: "2023-10-15",
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "2",
    title: {
      en: "React.js for Beginners",
      ar: "React.js للمبتدئين",
    },
    description: {
      en: "Learn the fundamentals of React.js and build your first application.",
      ar: "تعلم أساسيات React.js وقم ببناء تطبيقك الأول.",
    },
    type: "pdf",
    pdfUrl: "https://www.africau.edu/images/default/sample.pdf",
    date: "2023-11-20",
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
  },
  {
    id: "3",
    title: {
      en: "Advanced JavaScript Techniques",
      ar: "تقنيات JavaScript المتقدمة",
    },
    description: {
      en: "Explore advanced JavaScript concepts and patterns for professional development.",
      ar: "استكشف مفاهيم وأنماط JavaScript المتقدمة للتطوير الاحترافي.",
    },
    type: "link",
    externalLink:
      "https://docs.google.com/presentation/d/e/2PACX-1vQmrymNHFZYTuDm9jLfi-oCiN8-6H1xgFmA-HYnLjNRgKntiqpULaYwwY9Zxsp9v9GyJZKfi6CgPpE-/pub?start=false&loop=false&delayms=3000",
    date: "2023-12-05",
    thumbnailUrl: "/placeholder.svg?height=400&width=600",
  },
]

// Create the store
export const usePresentationStore = create<PresentationStore>((set, get) => ({
  presentations: [],
  activePresentationId: null,
  loading: false,
  error: null,

  fetchPresentations: async () => {
    set({ loading: true, error: null })
    try {
      // In a real app, you would fetch from an API
      // For this demo, we'll use the mock data
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500))
      set({ presentations: initialPresentations, loading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch presentations",
        loading: false,
      })
    }
  },

  addPresentation: async (presentation) => {
    set({ loading: true, error: null })
    try {
      // In a real app, you would send to an API
      // For this demo, we'll just add to the local state
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newPresentation = {
        ...presentation,
        id: uuidv4(),
      }

      set((state) => ({
        presentations: [...state.presentations, newPresentation],
        loading: false,
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to add presentation",
        loading: false,
      })
    }
  },

  updatePresentation: async (presentation) => {
    set({ loading: true, error: null })
    try {
      // In a real app, you would send to an API
      // For this demo, we'll just update the local state
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      set((state) => ({
        presentations: state.presentations.map((p) => (p.id === presentation.id ? presentation : p)),
        loading: false,
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to update presentation",
        loading: false,
      })
    }
  },

  deletePresentation: async (id) => {
    set({ loading: true, error: null })
    try {
      // In a real app, you would send to an API
      // For this demo, we'll just remove from the local state
      // Simulate network delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      set((state) => ({
        presentations: state.presentations.filter((p) => p.id !== id),
        activePresentationId: state.activePresentationId === id ? null : state.activePresentationId,
        loading: false,
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete presentation",
        loading: false,
      })
    }
  },

  setActivePresentation: (id) => {
    set({ activePresentationId: id })
  },
}))
