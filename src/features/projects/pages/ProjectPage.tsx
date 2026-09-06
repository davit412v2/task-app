import { useState, useEffect, type SyntheticEvent } from 'react'
import { getProjects, createProject, deleteProject } from '@/features/projects/api/Projects.service'
import type { Project } from '@/types'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setIsLoading(true)
      const data = await getProjects()
      setProjects(data)
    } catch (err) {
      setError('Error al cargar los proyectos del servidor')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = async (e: SyntheticEvent) => {
    e.preventDefault()
    if (!name.trim()) return

    try {
      const newProj = await createProject({ name, description })
      setProjects((prev) => [...prev, newProj])
      setName('')
      setDescription('')
    } catch (err) {
      alert('No se pudo crear el proyecto')
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await deleteProject(id)
      setProjects((prev) => prev.filter((p) => p.id !== id))
    } catch (err) {
      alert('Error al eliminar el proyecto')
    }
  }

  if (isLoading) return <div className="p-8 text-center text-slate-600">Cargando proyectos...</div>

  if (projects.length == 0 ) return <div className="p-8 text-center text-slate-600">No se han creado proyectos</div>

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">
      <h1 className="text-3xl font-bold text-slate-800">Panel de Proyectos</h1>

      {error && <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>}


      <form onSubmit={handleCreate} className="p-6 bg-white rounded-lg border border-slate-200 space-y-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-700">Nuevo Proyecto</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input 
            placeholder="Nombre del proyecto" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
          />
          <Input 
            placeholder="Descripción" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
          />
        </div>
        <Button type="submit">Crear Proyecto</Button>
      </form>

     
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((project) => (
          <div key={project.id} className="p-5 bg-white border border-slate-200 rounded-lg shadow-sm flex justify-between items-start">
            <div>
              <h3 className="font-bold text-slate-800 text-lg">{project.name}</h3>
              <p className="text-slate-600 text-sm mt-1">{project.description}</p>
            </div>
            <Button variant="destructive" onClick={() => handleDelete(project.id)}>
              Borrar
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}