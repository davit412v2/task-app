import { useState, useEffect, type SyntheticEvent } from 'react'
import { getProjects, createProject, deleteProject } from '@/features/projects/api/Projects.service'
import type { Project } from '@/types'
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from 'react-router-dom';
import { getTasksByProject } from '@/features/projects/api/Task.service'


export function useProjectPage() {
    const [projects, setProjects] = useState<Project[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string | null>(null)

    const [name, setName] = useState<string>('')
    const [description, setDescription] = useState<string>('')

    const { logout } = useAuth();
    const navigate = useNavigate()

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

    const handleDelete = async (id: number, e: SyntheticEvent) => {
        e.stopPropagation()
        try {
            const isValidDeleteProject = await validDeletProject(id)
            if (isValidDeleteProject) {
                await deleteProject(id)
                setProjects((prev) => prev.filter((p) => p.id !== id))
            } else {
                alert('No se puede eliminar el proyecto aun tiene tareas')
            }
        } catch (err) {
            alert('Error al eliminar el proyecto')
        }
    }

    const handleLogout = (e: SyntheticEvent) => {
        e.preventDefault()
        logout()
        navigate('/login')
    }

    const navigateToProject = (id: string) => {
        navigate(`/projects/${id}`)
    }

    const validDeletProject = async (id: number) => {
        const data = await getTasksByProject(id)
        return !!data
    }

    return {
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
    }
}