import { useState, useEffect, type SyntheticEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getTasksByProject, createTask, updateTask, deleteTask } from '@/features/projects/api/Task.service'
import type { Task, TaskRequest } from '@/types'
import { TaskStatus } from '@/types'

export function useProjectDetailPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [tasks, setTasks] = useState<Task[]>([])
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [projectId, setProjectId] = useState<number>(0)
    const [status, setStatus] = useState<TaskStatus>(TaskStatus.TODO)
    const [priority, setPriority] = useState<number>(1)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    useEffect(() => {
        if (id) {
            setProjectId(Number(id))
            fetchTasks(Number(id))
        }
    }, [id])

    const fetchTasks = async (projectId: number) => {
        try {
            setIsLoading(true)
            const data = await getTasksByProject(projectId)
            setTasks(data)
        } catch (err) {
            setError('Error al cargar los proyectos del servidor')
        } finally {
            setIsLoading(false)
        }
    }

    const handleCreateTask = async (e: SyntheticEvent) => {
        setIsSubmitting(true)
        e.preventDefault()
        if (!title.trim() || !id) return

        const taskReq: TaskRequest =
        {
            title: title,
            description: description,
            projectId: projectId,
            status: status,
            priority: priority.toString(),
        }

        try {
            const newTask = await createTask(taskReq)
            setTasks((prev) => [...prev, newTask])
            setTitle('')
            setPriority(1)
            setStatus(TaskStatus.TODO)
        } catch (err) {
            alert('Error al crear tarea')
        } finally {
            setIsSubmitting(false)
        }
    }

    const handlePriorityChange = async (taskId: string, newPriority: number) => {
        try {
            const updated = await updateTask(taskId, { priority: newPriority.toString() })
            setTasks((prev) => prev.map((t) => (t.id.toString() === taskId ? updated : t)))
        } catch (err) {
            alert('Error al actualizar prioridad')
        }
    }

    const handleStatusChange = async (taskId: string, newStatus: TaskStatus) => {
        try {
            const updated = await updateTask(taskId, { status: newStatus })
            setTasks((prev) => prev.map((t) => (t.id.toString() === taskId ? updated : t)))
        } catch (err) {
            alert('Error al actualizar estado')
        }
    }

    const backToProjects = () => {
        navigate("/projects")
    }

    const handleDeleteTask = async (taskId: number) => {
        try {
            await deleteTask(taskId)
            setTasks((prev) => prev.filter((t) => t.id !== taskId))
        } catch (err) {
            alert('Error al eliminar la tarea')
        }
    }

    return {
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
    }
}