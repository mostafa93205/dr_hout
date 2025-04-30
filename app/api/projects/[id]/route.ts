import { type NextRequest, NextResponse } from "next/server"
import { getProjectById, updateProject, deleteProject } from "@/lib/projects-data"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const project = getProjectById(id)

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ project })
  } catch (error) {
    console.error(`Error in GET /api/projects/${params.id}:`, error)
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const projectData = await request.json()

    // Validate required fields
    if (!projectData.title || !projectData.description || !projectData.category || !projectData.status) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Ensure the ID in the URL matches the ID in the body
    if (projectData.id !== id) {
      return NextResponse.json({ error: "Project ID mismatch" }, { status: 400 })
    }

    const success = updateProject(projectData)

    if (!success) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ project: projectData })
  } catch (error) {
    console.error(`Error in PUT /api/projects/${params.id}:`, error)
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const success = deleteProject(id)

    if (!success) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(`Error in DELETE /api/projects/${params.id}:`, error)
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 })
  }
}
