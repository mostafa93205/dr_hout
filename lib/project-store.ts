import { create } from "zustand"

// Project type definition
export type Project = {
  id: string
  title: string
  description: string
  category: string
  status: "planning" | "in-progress" | "completed" | "on-hold"
  technologies: string[]
  startDate: string
  endDate?: string
  team?: string[]
  imageUrl?: string
}

// Define the store type
interface ProjectStore {
  projects: Project[]
  loading: boolean
  error: string | null
  fetchProjects: () => Promise<void>
  addProject: (project: Omit<Project, "id">) => Promise<void>
  updateProject: (project: Project) => Promise<void>
  deleteProject: (id: string) => Promise<void>
  uploadImage: (id: string, imageUrl: string) => Promise<void>
}

// Create the store
export const useProjectStore = create<ProjectStore>((set, get) => ({
  projects: [],
  loading: false,
  error: null,

  fetchProjects: async () => {
    set({ loading: true, error: null })
    try {
      const response = await fetch("/api/projects")
      if (!response.ok) {
        throw new Error("Failed to fetch projects")
      }
      const data = await response.json()
      set({ projects: data.projects, loading: false })
    } catch (error) {
      console.error("Error fetching projects:", error)
      set({ error: error instanceof Error ? error.message : "Unknown error", loading: false })
    }
  },

  addProject: async (project) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      })

      if (!response.ok) {
        throw new Error("Failed to add project")
      }

      const data = await response.json()
      set((state) => ({
        projects: [...state.projects, data.project],
        loading: false,
      }))
    } catch (error) {
      console.error("Error adding project:", error)
      set({ error: error instanceof Error ? error.message : "Unknown error", loading: false })
    }
  },

  updateProject: async (project) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/projects/${project.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(project),
      })

      if (!response.ok) {
        throw new Error("Failed to update project")
      }

      set((state) => ({
        projects: state.projects.map((p) => (p.id === project.id ? project : p)),
        loading: false,
      }))
    } catch (error) {
      console.error("Error updating project:", error)
      set({ error: error instanceof Error ? error.message : "Unknown error", loading: false })
    }
  },

  deleteProject: async (id) => {
    set({ loading: true, error: null })
    try {
      const response = await fetch(`/api/projects/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to delete project")
      }

      set((state) => ({
        projects: state.projects.filter((p) => p.id !== id),
        loading: false,
      }))
    } catch (error) {
      console.error("Error deleting project:", error)
      set({ error: error instanceof Error ? error.message : "Unknown error", loading: false })
    }
  },

  uploadImage: async (id, imageUrl) => {
    set({ loading: true, error: null })
    try {
      const project = get().projects.find((p) => p.id === id)
      if (!project) {
        throw new Error("Project not found")
      }

      const updatedProject = { ...project, imageUrl }

      const response = await fetch(`/api/projects/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedProject),
      })

      if (!response.ok) {
        throw new Error("Failed to update project image")
      }

      set((state) => ({
        projects: state.projects.map((p) => (p.id === id ? { ...p, imageUrl } : p)),
        loading: false,
      }))
    } catch (error) {
      console.error("Error uploading image:", error)
      set({ error: error instanceof Error ? error.message : "Unknown error", loading: false })
    }
  },
}))

