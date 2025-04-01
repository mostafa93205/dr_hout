"use client"

import { useState } from "react"
import { Plus, Trash2, Edit, X, ChevronDown, ChevronUp, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Moon, Sun } from "lucide-react"

// Project type definition
type Project = {
  id: string
  title: string
  description: string
  category: string
  status: "planning" | "in-progress" | "completed" | "on-hold"
  technologies: string[]
  startDate: string
  endDate?: string
  team?: string[]
}

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
  },
]

export default function ProjectManagement() {
  const [isEnglish, setIsEnglish] = useState(true)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [projects, setProjects] = useState<Project[]>(sampleProjects)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [filterStatus, setFilterStatus] = useState<string>("all")
  const [sortBy, setSortBy] = useState<string>("date")
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc")

  // New project form state
  const [newProject, setNewProject] = useState<Omit<Project, "id">>({
    title: "",
    description: "",
    category: "",
    status: "planning",
    technologies: [],
    startDate: new Date().toISOString().split("T")[0],
  })

  // Edit project state
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [techInput, setTechInput] = useState("")
  const [teamMemberInput, setTeamMemberInput] = useState("")

  // Dialog states
  const [addDialogOpen, setAddDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState<string | null>(null)

  // Toggle language
  const toggleLanguage = () => {
    setIsEnglish(!isEnglish)
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  // Filter projects based on search term, category, and status
  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || project.category === filterCategory
    const matchesStatus = filterStatus === "all" || project.status === filterStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  // Sort projects
  const sortedProjects = [...filteredProjects].sort((a, b) => {
    if (sortBy === "title") {
      return sortDirection === "asc" ? a.title.localeCompare(b.title) : b.title.localeCompare(a.title)
    } else if (sortBy === "date") {
      return sortDirection === "asc"
        ? new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
        : new Date(b.startDate).getTime() - new Date(a.startDate).getTime()
    } else if (sortBy === "status") {
      const statusOrder = { planning: 0, "in-progress": 1, "on-hold": 2, completed: 3 }
      return sortDirection === "asc"
        ? statusOrder[a.status] - statusOrder[b.status]
        : statusOrder[b.status] - statusOrder[a.status]
    }
    return 0
  })

  // Get unique categories for filter
  const categories = ["all", ...new Set(projects.map((project) => project.category))]

  // Add new project
  const handleAddProject = () => {
    const id = (Math.max(...projects.map((p) => Number.parseInt(p.id)), 0) + 1).toString()
    setProjects([...projects, { id, ...newProject }])
    setNewProject({
      title: "",
      description: "",
      category: "",
      status: "planning",
      technologies: [],
      startDate: new Date().toISOString().split("T")[0],
    })
    setAddDialogOpen(false)
  }

  // Delete project
  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((project) => project.id !== id))
    setProjectToDelete(null)
    setDeleteDialogOpen(false)
  }

  // Edit project
  const handleEditProject = () => {
    if (editingProject) {
      setProjects(projects.map((project) => (project.id === editingProject.id ? editingProject : project)))
      setEditingProject(null)
      setEditDialogOpen(false)
    }
  }

  // Add technology to new project
  const handleAddTechnology = () => {
    if (techInput && !newProject.technologies.includes(techInput)) {
      setNewProject({
        ...newProject,
        technologies: [...newProject.technologies, techInput],
      })
      setTechInput("")
    }
  }

  // Add technology to editing project
  const handleAddTechnologyToEdit = () => {
    if (techInput && editingProject && !editingProject.technologies.includes(techInput)) {
      setEditingProject({
        ...editingProject,
        technologies: [...editingProject.technologies, techInput],
      })
      setTechInput("")
    }
  }

  // Add team member to editing project
  const handleAddTeamMember = () => {
    if (teamMemberInput && editingProject) {
      const team = editingProject.team || []
      if (!team.includes(teamMemberInput)) {
        setEditingProject({
          ...editingProject,
          team: [...team, teamMemberInput],
        })
        setTeamMemberInput("")
      }
    }
  }

  // Remove technology from new project
  const handleRemoveTechnology = (tech: string) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies.filter((t) => t !== tech),
    })
  }

  // Remove technology from editing project
  const handleRemoveTechnologyFromEdit = (tech: string) => {
    if (editingProject) {
      setEditingProject({
        ...editingProject,
        technologies: editingProject.technologies.filter((t) => t !== tech),
      })
    }
  }

  // Remove team member from editing project
  const handleRemoveTeamMember = (member: string) => {
    if (editingProject && editingProject.team) {
      setEditingProject({
        ...editingProject,
        team: editingProject.team.filter((m) => m !== member),
      })
    }
  }

  // Get status badge color
  const getStatusColor = (status: string) => {
    switch (status) {
      case "planning":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "in-progress":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
      case "completed":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "on-hold":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${isDarkMode ? "dark bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"}`}
    >
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-primary">{isEnglish ? "Project Management" : "إدارة المشاريع"}</h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" onClick={toggleLanguage}>
                {isEnglish ? "عربي" : "English"}
              </Button>
              <Button variant="ghost" size="icon" onClick={toggleDarkMode} className="rounded-full">
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Controls */}
        <div className="mb-8 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder={isEnglish ? "Search projects..." : "البحث عن المشاريع..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger>
              <SelectValue placeholder={isEnglish ? "Filter by category" : "تصفية حسب الفئة"} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category === "all" ? (isEnglish ? "All Categories" : "جميع الفئات") : category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder={isEnglish ? "Filter by status" : "تصفية حسب الحالة"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{isEnglish ? "All Statuses" : "جميع الحالات"}</SelectItem>
              <SelectItem value="planning">{isEnglish ? "Planning" : "التخطيط"}</SelectItem>
              <SelectItem value="in-progress">{isEnglish ? "In Progress" : "قيد التنفيذ"}</SelectItem>
              <SelectItem value="completed">{isEnglish ? "Completed" : "مكتمل"}</SelectItem>
              <SelectItem value="on-hold">{isEnglish ? "On Hold" : "معلق"}</SelectItem>
            </SelectContent>
          </Select>

          <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-full">
                <Plus className="mr-2 h-4 w-4" />
                {isEnglish ? "Add Project" : "إضافة مشروع"}
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle>{isEnglish ? "Add New Project" : "إضافة مشروع جديد"}</DialogTitle>
                <DialogDescription>
                  {isEnglish ? "Fill in the details for your new project." : "املأ تفاصيل مشروعك الجديد."}
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="title">{isEnglish ? "Project Title" : "عنوان المشروع"}</Label>
                  <Input
                    id="title"
                    value={newProject.title}
                    onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                    placeholder={isEnglish ? "Enter project title" : "أدخل عنوان المشروع"}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="description">{isEnglish ? "Description" : "الوصف"}</Label>
                  <Textarea
                    id="description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    placeholder={isEnglish ? "Enter project description" : "أدخل وصف المشروع"}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="category">{isEnglish ? "Category" : "الفئة"}</Label>
                    <Input
                      id="category"
                      value={newProject.category}
                      onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                      placeholder={isEnglish ? "e.g. Web Development" : "مثال: تطوير الويب"}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="status">{isEnglish ? "Status" : "الحالة"}</Label>
                    <Select
                      value={newProject.status}
                      onValueChange={(value: "planning" | "in-progress" | "completed" | "on-hold") =>
                        setNewProject({ ...newProject, status: value })
                      }
                    >
                      <SelectTrigger id="status">
                        <SelectValue placeholder={isEnglish ? "Select status" : "اختر الحالة"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="planning">{isEnglish ? "Planning" : "التخطيط"}</SelectItem>
                        <SelectItem value="in-progress">{isEnglish ? "In Progress" : "قيد التنفيذ"}</SelectItem>
                        <SelectItem value="completed">{isEnglish ? "Completed" : "مكتمل"}</SelectItem>
                        <SelectItem value="on-hold">{isEnglish ? "On Hold" : "معلق"}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="startDate">{isEnglish ? "Start Date" : "تاريخ البدء"}</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={newProject.startDate}
                      onChange={(e) => setNewProject({ ...newProject, startDate: e.target.value })}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="endDate">{isEnglish ? "End Date (Optional)" : "تاريخ الانتهاء (اختياري)"}</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={newProject.endDate || ""}
                      onChange={(e) => setNewProject({ ...newProject, endDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label>{isEnglish ? "Technologies" : "التقنيات"}</Label>
                  <div className="flex gap-2">
                    <Input
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      placeholder={isEnglish ? "Add technology" : "أضف تقنية"}
                    />
                    <Button type="button" variant="outline" onClick={handleAddTechnology}>
                      {isEnglish ? "Add" : "إضافة"}
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {newProject.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                        {tech}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => handleRemoveTechnology(tech)} />
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
                  {isEnglish ? "Cancel" : "إلغاء"}
                </Button>
                <Button onClick={handleAddProject} disabled={!newProject.title || !newProject.description}>
                  {isEnglish ? "Add Project" : "إضافة المشروع"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Sort controls */}
        <div className="flex justify-between items-center mb-4">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {isEnglish
              ? `Showing ${sortedProjects.length} of ${projects.length} projects`
              : `عرض ${sortedProjects.length} من ${projects.length} مشروع`}
          </div>
          <div className="flex items-center gap-2">
            <Label htmlFor="sortBy" className="text-sm">
              {isEnglish ? "Sort by:" : "ترتيب حسب:"}
            </Label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger id="sortBy" className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">{isEnglish ? "Date" : "التاريخ"}</SelectItem>
                <SelectItem value="title">{isEnglish ? "Title" : "العنوان"}</SelectItem>
                <SelectItem value="status">{isEnglish ? "Status" : "الحالة"}</SelectItem>
              </SelectContent>
            </Select>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSortDirection(sortDirection === "asc" ? "desc" : "asc")}
            >
              {sortDirection === "asc" ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Projects list */}
        {sortedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProjects.map((project) => (
              <Card key={project.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-xl">{project.title}</CardTitle>
                      <CardDescription className="text-sm mt-1">{project.category}</CardDescription>
                    </div>
                    <Badge className={`${getStatusColor(project.status)}`}>
                      {isEnglish
                        ? project.status.charAt(0).toUpperCase() + project.status.slice(1).replace("-", " ")
                        : project.status === "planning"
                          ? "التخطيط"
                          : project.status === "in-progress"
                            ? "قيد التنفيذ"
                            : project.status === "completed"
                              ? "مكتمل"
                              : "معلق"}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{project.description}</p>

                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                      {isEnglish ? "TECHNOLOGIES" : "التقنيات"}
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {project.team && project.team.length > 0 && (
                    <div className="mb-4">
                      <h4 className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1">
                        {isEnglish ? "TEAM" : "الفريق"}
                      </h4>
                      <div className="flex flex-wrap gap-1">
                        {project.team.map((member) => (
                          <Badge key={member} variant="secondary" className="text-xs">
                            {member}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    <span>
                      {isEnglish ? "Started: " : "بدأ: "}
                      {new Date(project.startDate).toLocaleDateString()}
                    </span>
                    {project.endDate && (
                      <span className="ml-3">
                        {isEnglish ? "Ended: " : "انتهى: "}
                        {new Date(project.endDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 pt-2">
                  <Dialog
                    open={deleteDialogOpen && projectToDelete === project.id}
                    onOpenChange={(open) => {
                      setDeleteDialogOpen(open)
                      if (!open) setProjectToDelete(null)
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => setProjectToDelete(project.id)}>
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>{isEnglish ? "Delete Project" : "حذف المشروع"}</DialogTitle>
                        <DialogDescription>
                          {isEnglish
                            ? "Are you sure you want to delete this project? This action cannot be undone."
                            : "هل أنت متأكد أنك تريد حذف هذا المشروع؟ لا يمكن التراجع عن هذا الإجراء."}
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                          {isEnglish ? "Cancel" : "إلغاء"}
                        </Button>
                        <Button variant="destructive" onClick={() => handleDeleteProject(project.id)}>
                          {isEnglish ? "Delete" : "حذف"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>

                  <Dialog
                    open={editDialogOpen && editingProject?.id === project.id}
                    onOpenChange={(open) => {
                      setEditDialogOpen(open)
                      if (open) setEditingProject({ ...project })
                      else setEditingProject(null)
                    }}
                  >
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" onClick={() => setEditingProject({ ...project })}>
                        <Edit className="h-4 w-4 text-blue-500" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                      <DialogHeader>
                        <DialogTitle>{isEnglish ? "Edit Project" : "تعديل المشروع"}</DialogTitle>
                        <DialogDescription>
                          {isEnglish ? "Make changes to your project details." : "قم بإجراء تغييرات على تفاصيل مشروعك."}
                        </DialogDescription>
                      </DialogHeader>

                      {editingProject && (
                        <div className="grid gap-4 py-4">
                          <div className="grid gap-2">
                            <Label htmlFor="edit-title">{isEnglish ? "Project Title" : "عنوان المشروع"}</Label>
                            <Input
                              id="edit-title"
                              value={editingProject.title}
                              onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                            />
                          </div>

                          <div className="grid gap-2">
                            <Label htmlFor="edit-description">{isEnglish ? "Description" : "الوصف"}</Label>
                            <Textarea
                              id="edit-description"
                              value={editingProject.description}
                              onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="edit-category">{isEnglish ? "Category" : "الفئة"}</Label>
                              <Input
                                id="edit-category"
                                value={editingProject.category}
                                onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                              />
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor="edit-status">{isEnglish ? "Status" : "الحالة"}</Label>
                              <Select
                                value={editingProject.status}
                                onValueChange={(value: "planning" | "in-progress" | "completed" | "on-hold") =>
                                  setEditingProject({ ...editingProject, status: value })
                                }
                              >
                                <SelectTrigger id="edit-status">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="planning">{isEnglish ? "Planning" : "التخطيط"}</SelectItem>
                                  <SelectItem value="in-progress">
                                    {isEnglish ? "In Progress" : "قيد التنفيذ"}
                                  </SelectItem>
                                  <SelectItem value="completed">{isEnglish ? "Completed" : "مكتمل"}</SelectItem>
                                  <SelectItem value="on-hold">{isEnglish ? "On Hold" : "معلق"}</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="grid gap-2">
                              <Label htmlFor="edit-startDate">{isEnglish ? "Start Date" : "تاريخ البدء"}</Label>
                              <Input
                                id="edit-startDate"
                                type="date"
                                value={editingProject.startDate}
                                onChange={(e) => setEditingProject({ ...editingProject, startDate: e.target.value })}
                              />
                            </div>

                            <div className="grid gap-2">
                              <Label htmlFor="edit-endDate">
                                {isEnglish ? "End Date (Optional)" : "تاريخ الانتهاء (اختياري)"}
                              </Label>
                              <Input
                                id="edit-endDate"
                                type="date"
                                value={editingProject.endDate || ""}
                                onChange={(e) => setEditingProject({ ...editingProject, endDate: e.target.value })}
                              />
                            </div>
                          </div>

                          <div className="grid gap-2">
                            <Label>{isEnglish ? "Technologies" : "التقنيات"}</Label>
                            <div className="flex gap-2">
                              <Input
                                value={techInput}
                                onChange={(e) => setTechInput(e.target.value)}
                                placeholder={isEnglish ? "Add technology" : "أضف تقنية"}
                              />
                              <Button type="button" variant="outline" onClick={handleAddTechnologyToEdit}>
                                {isEnglish ? "Add" : "إضافة"}
                              </Button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {editingProject.technologies.map((tech) => (
                                <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                                  {tech}
                                  <X
                                    className="h-3 w-3 cursor-pointer"
                                    onClick={() => handleRemoveTechnologyFromEdit(tech)}
                                  />
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="grid gap-2">
                            <Label>{isEnglish ? "Team Members" : "أعضاء الفريق"}</Label>
                            <div className="flex gap-2">
                              <Input
                                value={teamMemberInput}
                                onChange={(e) => setTeamMemberInput(e.target.value)}
                                placeholder={isEnglish ? "Add team member" : "أضف عضو فريق"}
                              />
                              <Button type="button" variant="outline" onClick={handleAddTeamMember}>
                                {isEnglish ? "Add" : "إضافة"}
                              </Button>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-2">
                              {editingProject.team &&
                                editingProject.team.map((member) => (
                                  <Badge key={member} variant="secondary" className="flex items-center gap-1">
                                    {member}
                                    <X
                                      className="h-3 w-3 cursor-pointer"
                                      onClick={() => handleRemoveTeamMember(member)}
                                    />
                                  </Badge>
                                ))}
                            </div>
                          </div>
                        </div>
                      )}

                      <DialogFooter>
                        <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
                          {isEnglish ? "Cancel" : "إلغاء"}
                        </Button>
                        <Button onClick={handleEditProject}>{isEnglish ? "Save Changes" : "حفظ التغييرات"}</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">
              {isEnglish
                ? "No projects found. Try adjusting your filters or add a new project."
                : "لم يتم العثور على مشاريع. حاول ضبط عوامل التصفية أو إضافة مشروع جديد."}
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

