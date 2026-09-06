import api from '../../../api/axios'
import type { AuthResponse } from '@/types'

export const authLogin = async(data: {username: string, password:string}): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('auth', data)
    return response.data
}