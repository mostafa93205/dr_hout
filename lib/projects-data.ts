import fs from "fs"
import path from "path"
import type { Project } from "./project-store"

// Path to the JSON file that will store our projects
const dataFilePath = path.join(process.cwd(), "data", "projects.json")

// Sample project data
const sampleProjects: Project[] = [
  {
    id: "1",
    title: "Health Data Analysis Dashboard",
    description: "A Python-based dashboard for analyzing health metrics and patient data for healthcare facilities.",
    category: "Data Analysis",
    status: "completed",
    technologies: ["Python", "Pandas", "Dash"],
    startDate: "2023-09-15",
    endDate: "2024-01-20",
    team: ["Mostafa Emad", "Ahmed Hassan"],
    imageUrl: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "2",
    title: "Hospital Management System",
    description: "A comprehensive system for managing hospital resources, staff scheduling, and patient records.",
    category: "Health Informatics",
    status: "in-progress",
    technologies: ["SQL", "Python", "Django"],
    startDate: "2024-02-10",
    team: ["Mostafa Emad", "Sara Ahmed", "Mohamed Ali"],
    imageUrl: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "3",
    title: "Health Sciences Social Media Campaign",
    description: "Designed and executed a digital marketing campaign for Faculty of Health Sciences events.",
    category: "Digital Marketing",
    status: "planning",
    technologies: ["Digital Marketing", "Social Media", "Analytics"],
    startDate: "2024-04-01",
    team: ["Mostafa Emad"],
    imageUrl: "/placeholder.svg?height=300&width=500",
  },
  {
    id: "4",
    title: "Student Union Web Portal",
    description: "Developed a web portal for Faculty of Health Sciences Student Union to manage events and activities.",
    category: "Web Development",
    status: "on-hold",
    technologies: ["HTML/CSS", "JavaScript", "PHP"],
    startDate: "2023-11-05",
    endDate: "2024-03-15",
    team: ["Mostafa Emad", "Laila Ibrahim"],
    imageUrl: "/placeholder.svg?height=300&width=500",
  },
]

// Ensure the data directory exists
export function ensureDataDirectory() {
  const dataDir = path.join(process.cwd(), "data")
  if (!fs.existsSync(dataDir)) {
    try {
      fs.mkdirSync(dataDir, { recursive: true })
    } catch (error) {
      console.error("Error creating data directory:", error)
      // Fallback to using /tmp directory in production environments
      if (process.env.NODE_ENV === "production") {
        return path.join("/tmp")
      }
      throw error
    }
  }
  return dataDir
}

// Get the appropriate data file path
export function getDataFilePath() {
  const dataDir = ensureDataDirectory()
  // In production (Vercel), use /tmp directory which is writable
  if (process.env.NODE_ENV === "production") {
    return path.join("/tmp", "projects.json")
  }
  return path.join(dataDir, "projects.json")
}

// Initialize the projects file with sample data if it doesn't exist
export function initializeProjectsFile() {
  const filePath = getDataFilePath()

  if (!fs.existsSync(filePath)) {
    try {
      fs.writeFileSync(filePath, JSON.stringify({ projects: sampleProjects }, null, 2))
    } catch (error) {
      console.error("Error writing to projects file:", error)
      // If we can't write to the file, return the sample projects
      return sampleProjects
    }
  }
  return null
}

// Get all projects
export function getProjects(): Project[] {
  try {
    initializeProjectsFile()
    const filePath = getDataFilePath()

    if (!fs.existsSync(filePath)) {
      return sampleProjects
    }

    const data = fs.readFileSync(filePath, "utf8")
    return JSON.parse(data).projects
  } catch (error) {
    console.error("Error reading projects file:", error)
    return sampleProjects
  }
}

// Save all projects
export function saveProjects(projects: Project[]) {
  try {
    const filePath = getDataFilePath()
    fs.writeFileSync(filePath, JSON.stringify({ projects }, null, 2))
    return true
  } catch (error) {
    console.error("Error saving projects file:", error)
    return false
  }
}

// Add a new project
export function addProject(project: Omit<Project, "id">): Project {
  const projects = getProjects()
  const id = (Math.max(...projects.map((p) => Number.parseInt(p.id)), 0) + 1).toString()
  const newProject = { id, ...project }

  saveProjects([...projects, newProject])
  return newProject
}

// Update an existing project
export function updateProject(project: Project): boolean {
  const projects = getProjects()
  const index = projects.findIndex((p) => p.id === project.id)

  if (index === -1) {
    return false
  }

  projects[index] = project
  return saveProjects(projects)
}

// Delete a project
export function deleteProject(id: string): boolean {
  const projects = getProjects()
  const filteredProjects = projects.filter((p) => p.id !== id)

  if (filteredProjects.length === projects.length) {
    return false // No project was deleted
  }

  return saveProjects(filteredProjects)
}

// Get a single project by ID
export function getProjectById(id: string): Project | null {
  const projects = getProjects()
  return projects.find((p) => p.id === id) || null
}
