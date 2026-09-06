import { useState, type SyntheticEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';
import { useAuth } from "@/context/AuthContext";
import { authLogin } from "@/features/auth/api/Auth.service"


export default function LoginPage() {
    const [userName, setUserName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const navigate = useNavigate()
    const { login } = useAuth();

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        console.log("Datos a enviar: ", { userName, password })
        const req = {
            username: userName,
            password: password,
        }
        authAPi(req)
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

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-50" >
            <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md w-80 space-y-4">
                <h2 className="text-xl font-bold text-center text-slate-800">
                    Iniciar Sesión
                </h2>
                <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Nombre de usuario</label>
                    <Input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="usuario"
                        required
                    />
                </div>

                <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700">Contraseña</label>
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                    />
                </div>
                <Button
                    type="submit"
                    variant={isLoading ? "default" : "outline"}
                    className="w-full"
                >
                    Ingresar
                </Button>
            </form>
        </div>
    )
}