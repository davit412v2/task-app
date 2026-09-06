import { useState, type SyntheticEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [userName, setUserName] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const navigate = useNavigate()

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault()
        navigate('/projects')
        console.log("Datos a enviar: ", { userName, password })
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
                <Button type="submit" className="w-full">
                    Ingresar
                </Button>
            </form>
        </div>
    )
}