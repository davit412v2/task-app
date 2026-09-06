import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useProjectDetailPage } from '../hooks/useProjectDetailPage'

export default function ProjectDetailPage() {

    const {
        isLoading,
        backToProjects,
        handleCreateTask,
        title,
        setTitle,
        tasks,
        projectId
    } = useProjectDetailPage()


  if (isLoading) return <div className="p-8 text-center text-slate-600">Cargando tareas...</div>

  return (
    <div className="max-w-3xl mx-auto p-8 space-y-6">
      <Button variant="outline" onClick={backToProjects}>
        ← Volver a Proyectos
      </Button>

      <h1 className="text-2xl font-bold text-slate-800">Detalle del Proyecto #{projectId}</h1>

      <form onSubmit={handleCreateTask} className="flex gap-2">
        <Input
          placeholder="Nueva tarea..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Button type="submit">Agregar</Button>
      </form>

      {/* Listado de Tareas */}
      <div className="space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="p-4 bg-white border border-slate-200 rounded-md flex items-center justify-between cursor-pointer hover:bg-slate-50"
          >
            <span className={false ? 'line-through text-slate-400' : 'text-slate-800'}>
              {task.title}
            </span>
            <span className={`text-xs px-2 py-1 rounded ${false? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              {false ? 'Completada' : 'Pendiente'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}