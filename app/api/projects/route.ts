import { type NextRequest, NextResponse } from "next/server"
import { getProjects, addProject } from "@/lib/projects-data"

export async function GET() {
  try {
    const projects = getProjects()
    return NextResponse.json({ projects })
  } catch (error) {
    console.error("Error in GET /api/projects:", error)
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const projectData = await request.json()

    // Validate required fields
    if (!projectData.title || !projectData.description || !projectData.category || !projectData.status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const project = addProject(projectData)

    return NextResponse.json({ project }, { status: 201 })
  } catch (error) {
    console.error("Error in POST /api/projects:", error)
    return NextResponse.json({ error: "Failed to add project" }, { status: 500 })
  }
}

