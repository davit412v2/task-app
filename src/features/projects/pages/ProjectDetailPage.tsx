import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useProjectDetailPage } from '../hooks/useProjectDetailPage'
import { AlertCircle, Trash2 } from 'lucide-react'
import { Skeleton } from '@/components/ui/skeleton'
import { StarRating } from '@/components/ui/starRating'
import { TaskStatus } from '@/types'

export default function ProjectDetailPage() {

    const {
        isLoading,
        backToProjects,
        handleCreateTask,
        title,
        setTitle,
        description,
        setDescription,
        tasks,
        projectId,
        priority,
        setPriority,
        status,
        setStatus,
        error,
        isSubmitting,
        handlePriorityChange,
        handleStatusChange,
        handleDeleteTask
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
                <Input
                    placeholder="descripcion"
                    value={description}
                    disabled={isSubmitting}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value as TaskStatus)}
                    className="h-10 px-3 border border-slate-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-slate-900"
                >
                    {Object.values(TaskStatus).map((st) => (
                        <option key={st} value={st}>
                            {st}
                        </option>
                    ))}
                </select>
                <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium">Prioridad:</span>
                    <StarRating value={priority} onChange={setPriority} />
                </div>
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
                            className="p-4 bg-white border border-slate-200 rounded-lg flex flex-col md:flex-row items-center justify-between gap-4"
                        >
                            <span className="font-medium text-slate-800 flex-1">{task.title}</span>

                            <select
                                value={task.status}
                                onChange={(e) => handleStatusChange(task.id.toString(), e.target.value as TaskStatus)}
                                className="h-8 px-2 border border-slate-200 rounded-md bg-slate-50 text-xs font-medium focus:outline-none"
                            >
                                {Object.values(TaskStatus).map((st) => (
                                    <option key={st} value={st}>
                                        {st}
                                    </option>
                                ))}
                            </select>

                            <StarRating
                                value={Number(task.priority) || 1}
                                onChange={(newRating) => handlePriorityChange(task.id.toString(), newRating)}
                            />
                            <Button
                                variant="destructive"
                                className="h-10 w-10 p-0 flex items-center justify-center shrink-0"
                                onClick={() => handleDeleteTask(task.id)}
                                title="Eliminar tarea"
                            >
                                <Trash2 className="h-10 w-10 stroke-[3]" />
                            </Button>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}