import { useState, type SyntheticEvent } from "react";
import { useAuth } from "@/context/AuthContext";
import { authLogin } from "@/features/auth/api/Auth.service"
import { useNavigate } from 'react-router-dom';

export function useLogin() {

    const [userName, setUserName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const navigate = useNavigate()
    const { login } = useAuth();
    
    const handleSubmit = (e: SyntheticEvent) => {
        setIsSubmitting(true)
        e.preventDefault()
     
        const req = {
            username: userName,
            password: password,
        }
        authAPi(req)
        setIsSubmitting(false)
        navigate('/projects')
    }

    const authAPi = async (req: { username: string, password: string }) => {
        try {
            setIsLoading(true)
            const data = await authLogin(req)
            login(data.token);
            setIsLoading(false)
        } catch (err) {
            alert('No se pudo iniciar sesión')
        } finally {
            setIsLoading(false)
        }
    }

    return {
        userName,
        setUserName,
        password,
        setPassword,
        isLoading,
        handleSubmit,
        isSubmitting,
    }
}