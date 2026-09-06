import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useProjectPage } from '../hooks/useProjectPage'

export default function ProjectsPage() {

  const {
    isLoading,
    projects,
    error,
    handleCreate,
    name,
    setName,
    description,
    setDescription,
    handleDelete,
    handleLogout,
    navigateToProject
  } = useProjectPage()


  if (isLoading) return <div className="p-8 text-center text-slate-600">Cargando proyectos...</div>

  if (projects.length == 0) return <div className="p-8 text-center text-slate-600">No se han creado proyectos</div>

  return (
    <div className="max-w-4xl mx-auto p-8 space-y-8">

      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold text-slate-700">
          Panel de Proyectos
        </h1>

        <Button variant="destructive" onClick={handleLogout}>
          Salir
        </Button>
      </div>


      {error && <div className="p-4 bg-red-100 text-red-700 rounded-md">{error}</div>}


      <form onSubmit={handleCreate} className="p-6 bg-white rounded-lg border border-slate-200 space-y-4 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-700">
          Nuevo Proyecto
        </h2>

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
          <div key={project.id} onClick={() => navigateToProject(project.id.toString())} className="p-5 bg-white border border-slate-200 rounded-lg shadow-sm flex justify-between items-start">
            <div>
              <h3 className="font-bold text-slate-800 text-lg">{project.name}</h3>
              <p className="text-slate-600 text-sm mt-1">{project.description}</p>
            </div>
            <Button variant="destructive" onClick={(e) => handleDelete(project.id, e)}>
              Borrar
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}