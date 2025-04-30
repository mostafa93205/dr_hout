import { create } from "zustand"

export interface Presentation {
  id: string
  title: string
  description: string
  slides: Slide[]
  createdAt: string
  lastModified: string
  isPublic: boolean
}

export interface Slide {
  id: string
  title: string
  content: string
  imageUrl?: string
  order: number
}

interface PresentationState {
  presentations: Presentation[]
  currentPresentation: Presentation | null
  isLoading: boolean
  error: string | null
  fetchPresentations: () => Promise<void>
  setCurrentPresentation: (id: string) => void
  addPresentation: (presentation: Omit<Presentation, "id" | "createdAt" | "lastModified">) => Promise<void>
  updatePresentation: (id: string, presentation: Partial<Presentation>) => Promise<void>
  deletePresentation: (id: string) => Promise<void>
  addSlide: (presentationId: string, slide: Omit<Slide, "id">) => Promise<void>
  updateSlide: (presentationId: string, slideId: string, slide: Partial<Slide>) => Promise<void>
  deleteSlide: (presentationId: string, slideId: string) => Promise<void>
  reorderSlides: (presentationId: string, slideIds: string[]) => Promise<void>
}

export const usePresentationStore = create<PresentationState>((set, get) => ({
  presentations: [],
  currentPresentation: null,
  isLoading: false,
  error: null,

  fetchPresentations: async () => {
    set({ isLoading: true, error: null })
    try {
      // Simulate API call
      // In a real app, this would be a fetch to your API
      setTimeout(() => {
        set({
          presentations: [
            {
              id: "1",
              title: "Introduction to Health Informatics",
              description: "An overview of health informatics principles and applications",
              slides: [
                {
                  id: "1-1",
                  title: "What is Health Informatics?",
                  content:
                    "Health informatics is the intersection of healthcare, information science, and computer science.",
                  order: 1,
                },
                {
                  id: "1-2",
                  title: "Key Applications",
                  content: "Electronic Health Records, Clinical Decision Support Systems, Telemedicine",
                  order: 2,
                },
              ],
              createdAt: "2024-04-15T10:00:00Z",
              lastModified: "2024-04-20T14:30:00Z",
              isPublic: true,
            },
            {
              id: "2",
              title: "Data Analysis in Healthcare",
              description: "Methods and tools for analyzing healthcare data",
              slides: [
                {
                  id: "2-1",
                  title: "Types of Healthcare Data",
                  content: "Clinical data, administrative data, patient-generated data",
                  order: 1,
                },
                {
                  id: "2-2",
                  title: "Analysis Techniques",
                  content: "Statistical analysis, machine learning, natural language processing",
                  order: 2,
                },
              ],
              createdAt: "2024-04-18T09:15:00Z",
              lastModified: "2024-04-22T11:45:00Z",
              isPublic: false,
            },
          ],
          isLoading: false,
        })
      }, 500)
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  setCurrentPresentation: (id) => {
    const presentation = get().presentations.find((p) => p.id === id) || null
    set({ currentPresentation: presentation })
  },

  addPresentation: async (presentation) => {
    set({ isLoading: true, error: null })
    try {
      // Simulate API call
      setTimeout(() => {
        const newPresentation = {
          ...presentation,
          id: `pres-${Date.now()}`,
          createdAt: new Date().toISOString(),
          lastModified: new Date().toISOString(),
        }

        set((state) => ({
          presentations: [...state.presentations, newPresentation],
          isLoading: false,
        }))
      }, 500)
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  updatePresentation: async (id, presentation) => {
    set({ isLoading: true, error: null })
    try {
      // Simulate API call
      setTimeout(() => {
        set((state) => ({
          presentations: state.presentations.map((p) =>
            p.id === id
              ? {
                  ...p,
                  ...presentation,
                  lastModified: new Date().toISOString(),
                }
              : p,
          ),
          currentPresentation:
            state.currentPresentation?.id === id
              ? {
                  ...state.currentPresentation,
                  ...presentation,
                  lastModified: new Date().toISOString(),
                }
              : state.currentPresentation,
          isLoading: false,
        }))
      }, 500)
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  deletePresentation: async (id) => {
    set({ isLoading: true, error: null })
    try {
      // Simulate API call
      setTimeout(() => {
        set((state) => ({
          presentations: state.presentations.filter((p) => p.id !== id),
          currentPresentation: state.currentPresentation?.id === id ? null : state.currentPresentation,
          isLoading: false,
        }))
      }, 500)
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  addSlide: async (presentationId, slide) => {
    set({ isLoading: true, error: null })
    try {
      // Simulate API call
      setTimeout(() => {
        const newSlide = {
          ...slide,
          id: `slide-${Date.now()}`,
        }

        set((state) => {
          const updatedPresentations = state.presentations.map((p) =>
            p.id === presentationId
              ? {
                  ...p,
                  slides: [...p.slides, newSlide],
                  lastModified: new Date().toISOString(),
                }
              : p,
          )

          const updatedCurrentPresentation =
            state.currentPresentation?.id === presentationId
              ? {
                  ...state.currentPresentation,
                  slides: [...state.currentPresentation.slides, newSlide],
                  lastModified: new Date().toISOString(),
                }
              : state.currentPresentation

          return {
            presentations: updatedPresentations,
            currentPresentation: updatedCurrentPresentation,
            isLoading: false,
          }
        })
      }, 500)
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  updateSlide: async (presentationId, slideId, slide) => {
    set({ isLoading: true, error: null })
    try {
      // Simulate API call
      setTimeout(() => {
        set((state) => {
          const updatedPresentations = state.presentations.map((p) =>
            p.id === presentationId
              ? {
                  ...p,
                  slides: p.slides.map((s) => (s.id === slideId ? { ...s, ...slide } : s)),
                  lastModified: new Date().toISOString(),
                }
              : p,
          )

          const updatedCurrentPresentation =
            state.currentPresentation?.id === presentationId
              ? {
                  ...state.currentPresentation,
                  slides: state.currentPresentation.slides.map((s) => (s.id === slideId ? { ...s, ...slide } : s)),
                  lastModified: new Date().toISOString(),
                }
              : state.currentPresentation

          return {
            presentations: updatedPresentations,
            currentPresentation: updatedCurrentPresentation,
            isLoading: false,
          }
        })
      }, 500)
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  deleteSlide: async (presentationId, slideId) => {
    set({ isLoading: true, error: null })
    try {
      // Simulate API call
      setTimeout(() => {
        set((state) => {
          const updatedPresentations = state.presentations.map((p) =>
            p.id === presentationId
              ? {
                  ...p,
                  slides: p.slides.filter((s) => s.id !== slideId),
                  lastModified: new Date().toISOString(),
                }
              : p,
          )

          const updatedCurrentPresentation =
            state.currentPresentation?.id === presentationId
              ? {
                  ...state.currentPresentation,
                  slides: state.currentPresentation.slides.filter((s) => s.id !== slideId),
                  lastModified: new Date().toISOString(),
                }
              : state.currentPresentation

          return {
            presentations: updatedPresentations,
            currentPresentation: updatedCurrentPresentation,
            isLoading: false,
          }
        })
      }, 500)
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },

  reorderSlides: async (presentationId, slideIds) => {
    set({ isLoading: true, error: null })
    try {
      // Simulate API call
      setTimeout(() => {
        set((state) => {
          const presentation = state.presentations.find((p) => p.id === presentationId)
          if (!presentation) {
            return state
          }

          const slideMap = new Map(presentation.slides.map((s) => [s.id, s]))
          const reorderedSlides = slideIds
            .map((id, index) => {
              const slide = slideMap.get(id)
              return slide ? { ...slide, order: index + 1 } : null
            })
            .filter(Boolean) as Slide[]

          const updatedPresentations = state.presentations.map((p) =>
            p.id === presentationId
              ? {
                  ...p,
                  slides: reorderedSlides,
                  lastModified: new Date().toISOString(),
                }
              : p,
          )

          const updatedCurrentPresentation =
            state.currentPresentation?.id === presentationId
              ? {
                  ...state.currentPresentation,
                  slides: reorderedSlides,
                  lastModified: new Date().toISOString(),
                }
              : state.currentPresentation

          return {
            presentations: updatedPresentations,
            currentPresentation: updatedCurrentPresentation,
            isLoading: false,
          }
        })
      }, 500)
    } catch (error) {
      set({ error: (error as Error).message, isLoading: false })
    }
  },
}))
