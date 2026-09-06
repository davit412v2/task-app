import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useProjectDetailPage } from '../hooks/useProjectDetailPage'
import { CheckCircle2, Circle, AlertCircle } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'

export default function ProjectDetailPage() {

    const {
        isLoading,
        backToProjects,
        handleCreateTask,
        title,
        setTitle,
        tasks,
        projectId,
        error,
        isSubmitting
    } = useProjectDetailPage()


    if (isLoading) return <div className="p-8 text-center text-slate-600">Cargando tareas...</div>

    return (
        <div className="max-w-3xl mx-auto p-8 space-y-6">
            <Button variant="outline" onClick={backToProjects}>
                ← Volver a Proyectos
            </Button>

            <h1 className="text-2xl font-bold text-slate-800">Detalle del Proyecto #{projectId}</h1>

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-md flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    <span>{error}</span>
                </div>
            )}

            <form onSubmit={handleCreateTask} className="flex gap-2">
                <Input
                    placeholder="Nueva tarea..."
                    value={title}
                    disabled={isSubmitting}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Button type="submit" isLoading={isSubmitting} >Agregar</Button>
            </form>

            <div className="space-y-2">
                {isLoading ? (

                    <>
                        <Skeleton className="h-14 w-full" />
                        <Skeleton className="h-14 w-full" />
                        <Skeleton className="h-14 w-full" />
                    </>
                ) : tasks.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 border border-dashed border-slate-200 rounded-lg">
                        <p className="text-slate-500 font-medium">No hay tareas en este proyecto.</p>
                        <p className="text-slate-400 text-sm mt-1">Crea la primera utilizando el campo de arriba.</p>
                    </div>
                ) : (

                    tasks.map((task) => (
                        <div
                            key={task.id}
                            // onClick={}
                            className="p-4 bg-white border border-slate-200 rounded-md flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
                        >
                            <div className="flex items-center gap-3">
                                {false ? (
                                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                                ) : (
                                    <Circle className="h-5 w-5 text-slate-300" />
                                )}
                                <span className={false ? 'line-through text-slate-400' : 'text-slate-800'}>
                                    {task.title}
                                </span>
                            </div>
                            <span
                                className={`text-xs px-2.5 py-1 rounded-full font-medium ${false ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                                    }`}
                            >
                                {false ? 'Completada' : 'Pendiente'}
                            </span>
                        </div>
                    ))
                )}
            </div>
            {/* <div className="space-y-2">
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
      </div> */}
        </div>
    )
}