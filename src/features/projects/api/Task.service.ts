import api from '../../../api/axios'
import type { Task, TaskRequest } from '@/types'

export const getTasksByProject = async (projectId: number): Promise<Task[]> => {
    const response = await api.get<Task[]>(`tasks/project/${projectId}`)
    return response.data
}

export const createTask = async (data: TaskRequest): Promise<Task> => {
    const response = await api.post<Task>(`tasks`, data)
    return response.data
}

export const updateTaskStatus = async (taskId: number, data: Task): Promise<Task> => {
    const response = await api.put<Task>(`tasks/${taskId}`, data)
    return response.data
}

export const deleteTask = async (taskId: number): Promise<void> => {
    await api.delete(`tasks/${taskId}`)
}