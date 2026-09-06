import { useState, useEffect, type SyntheticEvent } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { getTasksByProject, createTask, updateTaskStatus } from '@/features/projects/api/Task.service'
import type { Task, TaskRequest } from '@/types'

export function useProjectDetailPage() {
    const { id } = useParams<{ id: string }>()
    const navigate = useNavigate()

    const [tasks, setTasks] = useState<Task[]>([])
    const [title, setTitle] = useState<string>('')
    const [description, setDescription] = useState<string>('')
    const [projectId,  setProjectId] = useState<number>(0)
    const [status, setStatus] = useState<string>('')
    const [priority, setPriority] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(true)

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
            console.error('Error al cargar tareas')
        } finally {
            setIsLoading(false)
        }
    }

    const handleCreateTask = async (e: SyntheticEvent) => {
        e.preventDefault()
        if (!title.trim() || !id) return

        const taskReq: TaskRequest = 
        {
            title: title,
            description: description,
            projectId: projectId,
            status: status,
            priority: priority,
        }

        try {
            const newTask = await createTask(taskReq)
            setTasks((prev) => [...prev, newTask])
            setTitle('')
        } catch (err) {
            alert('Error al crear tarea')
        }
    }

    // const handleUpdateStatus = async (task: Task) => {
    //     try {
    //         const updated = await toggleTaskStatus(task.id, !task.isCompleted)
    //         // Actualizamos solo la tarea modificada en el arreglo local
    //         setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)))
    //     } catch (err) {
    //         alert('Error al cambiar estado')
    //     }
    // }

    const backToProjects = () => {
        navigate("/projects")
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
    }
}