"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useProjectStore, type Project } from "@/lib/project-store"
import { Pencil, Trash, Star, Plus, ExternalLink } from "lucide-react"

interface ProjectManagementPanelProps {
  isEnglish: boolean
  isDarkMode: boolean
}

export default function ProjectManagementPanel({ isEnglish, isDarkMode }: ProjectManagementPanelProps) {
  const { projects, isLoading, addProject, updateProject, deleteProject, toggleFeatured } = useProjectStore()
  const [isAdding, setIsAdding] = useState(false)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [formData, setFormData] = useState<Partial<Project>>({
    title: "",
    description: "",
    imageUrl: "",
    tags: [],
    link: "",
    featured: false,
  })

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // Handle tags input (comma-separated)
  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const tagsString = e.target.value
    const tagsArray = tagsString.split(",").map((tag) => tag.trim())
    setFormData((prev) => ({ ...prev, tags: tagsArray }))
  }

  // Start adding a new project
  const startAddingProject = () => {
    setIsAdding(true)
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      tags: [],
      link: "",
      featured: false,
    })
  }

  // Start editing an existing project
  const startEditingProject = (project: Project) => {
    setIsEditing(project.id)
    setFormData({
      title: project.title,
      description: project.description,
      imageUrl: project.imageUrl || "",
      tags: project.tags,
      link: project.link || "",
      featured: project.featured,
    })
  }

  // Cancel adding/editing
  const cancelAction = () => {
    setIsAdding(false)
    setIsEditing(null)
  }

  // Submit form for adding a new project
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.description) return

    await addProject({
      title: formData.title!,
      description: formData.description!,
      imageUrl: formData.imageUrl,
      tags: formData.tags || [],
      link: formData.link,
      featured: formData.featured || false,
    })

    setIsAdding(false)
  }

  // Submit form for editing an existing project
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!isEditing || !formData.title || !formData.description) return

    await updateProject(isEditing, formData)
    setIsEditing(null)
  }

  // Handle project deletion
  const handleDeleteProject = async (id: string) => {
    if (
      window.confirm(isEnglish ? "Are you sure you want to delete this project?" : "هل أنت متأكد من حذف هذا المشروع؟")
    ) {
      await deleteProject(id)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{isEnglish ? "Project Management" : "إدارة المشاريع"}</h2>
        <Button onClick={startAddingProject} disabled={isAdding || isEditing !== null}>
          <Plus className="mr-2 h-4 w-4" />
          {isEnglish ? "Add Project" : "إضافة مشروع"}
        </Button>
      </div>

      {/* Add Project Form */}
      {isAdding && (
        <Card className={isDarkMode ? "bg-gray-800" : ""}>
          <CardHeader>
            <CardTitle>{isEnglish ? "Add New Project" : "إضافة مشروع جديد"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  {isEnglish ? "Title" : "العنوان"}
                </label>
                <Input id="title" name="title" value={formData.title || ""} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="text-sm font-medium">
                  {isEnglish ? "Description" : "الوصف"}
                </label>
                <Input
                  id="description"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="imageUrl" className="text-sm font-medium">
                  {isEnglish ? "Image URL" : "رابط الصورة"}
                </label>
                <Input id="imageUrl" name="imageUrl" value={formData.imageUrl || ""} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <label htmlFor="tags" className="text-sm font-medium">
                  {isEnglish ? "Tags (comma-separated)" : "الوسوم (مفصولة بفواصل)"}
                </label>
                <Input id="tags" name="tags" value={formData.tags?.join(", ") || ""} onChange={handleTagsChange} />
              </div>

              <div className="space-y-2">
                <label htmlFor="link" className="text-sm font-medium">
                  {isEnglish ? "Project Link" : "رابط المشروع"}
                </label>
                <Input id="link" name="link" value={formData.link || ""} onChange={handleChange} />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="featured"
                  name="featured"
                  checked={formData.featured || false}
                  onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="featured" className="text-sm font-medium">
                  {isEnglish ? "Featured Project" : "مشروع مميز"}
                </label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={cancelAction}>
                  {isEnglish ? "Cancel" : "إلغاء"}
                </Button>
                <Button type="submit">{isEnglish ? "Add Project" : "إضافة المشروع"}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Edit Project Form */}
      {isEditing && (
        <Card className={isDarkMode ? "bg-gray-800" : ""}>
          <CardHeader>
            <CardTitle>{isEnglish ? "Edit Project" : "تعديل المشروع"}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="edit-title" className="text-sm font-medium">
                  {isEnglish ? "Title" : "العنوان"}
                </label>
                <Input id="edit-title" name="title" value={formData.title || ""} onChange={handleChange} required />
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-description" className="text-sm font-medium">
                  {isEnglish ? "Description" : "الوصف"}
                </label>
                <Input
                  id="edit-description"
                  name="description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-imageUrl" className="text-sm font-medium">
                  {isEnglish ? "Image URL" : "رابط الصورة"}
                </label>
                <Input id="edit-imageUrl" name="imageUrl" value={formData.imageUrl || ""} onChange={handleChange} />
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-tags" className="text-sm font-medium">
                  {isEnglish ? "Tags (comma-separated)" : "الوسوم (مفصولة بفواصل)"}
                </label>
                <Input id="edit-tags" name="tags" value={formData.tags?.join(", ") || ""} onChange={handleTagsChange} />
              </div>

              <div className="space-y-2">
                <label htmlFor="edit-link" className="text-sm font-medium">
                  {isEnglish ? "Project Link" : "رابط المشروع"}
                </label>
                <Input id="edit-link" name="link" value={formData.link || ""} onChange={handleChange} />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="edit-featured"
                  name="featured"
                  checked={formData.featured || false}
                  onChange={(e) => setFormData((prev) => ({ ...prev, featured: e.target.checked }))}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <label htmlFor="edit-featured" className="text-sm font-medium">
                  {isEnglish ? "Featured Project" : "مشروع مميز"}
                </label>
              </div>

              <div className="flex justify-end space-x-2">
                <Button type="button" variant="outline" onClick={cancelAction}>
                  {isEnglish ? "Cancel" : "إلغاء"}
                </Button>
                <Button type="submit">{isEnglish ? "Update Project" : "تحديث المشروع"}</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        {isLoading ? (
          <p>{isEnglish ? "Loading projects..." : "جاري تحميل المشاريع..."}</p>
        ) : projects.length === 0 ? (
          <p>{isEnglish ? "No projects found." : "لم يتم العثور على مشاريع."}</p>
        ) : (
          projects.map((project) => (
            <Card
              key={project.id}
              className={`${isDarkMode ? "bg-gray-800" : ""} ${project.featured ? "border-primary" : ""}`}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h3 className="font-medium">{project.title}</h3>
                      {project.featured && <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{project.description}</p>
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary flex items-center mt-2"
                      >
                        <ExternalLink className="h-3 w-3 mr-1" />
                        {isEnglish ? "View Project" : "عرض المشروع"}
                      </a>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleFeatured(project.id)}
                      title={isEnglish ? "Toggle Featured" : "تبديل التمييز"}
                    >
                      <Star className={`h-4 w-4 ${project.featured ? "text-yellow-500 fill-yellow-500" : ""}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEditingProject(project)}
                      disabled={isAdding || isEditing !== null}
                      title={isEnglish ? "Edit" : "تعديل"}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteProject(project.id)}
                      disabled={isAdding || isEditing !== null}
                      title={isEnglish ? "Delete" : "حذف"}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
