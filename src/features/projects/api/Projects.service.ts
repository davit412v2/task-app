import api from '../../../api/axios'
import type { Project } from '@/types'

export const getProjects = async (): Promise<Project[]> => {
  const response = await api.get<Project[]>('projects/')
  return response.data
}

export const getProjectId = async (id: number): Promise<Project> => {
  const response = await api.get<Project>(`/projects/${id}`)
  return response.data
}

export const createProject = async (data: { name: string; description: string }): Promise<Project> => {
  const response = await api.post<Project>('projects/', data)
  return response.data
}

export const deleteProject = async (id: number): Promise<void> => {
  await api.delete(`/projects/${id}`)
}