import { useState } from "react";

interface AuthFormProps {
  onSubmit: (email: string, password: string) => Promise<void>;
  title: string;
}

const AuthForm = ({ onSubmit, title }: AuthFormProps) =>{
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Por favor ingresa email y contraseña");
      return;
    }

    try {
      await onSubmit(email, password);
    }catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Ha ocurrido un error desconocido");
        }
      }
  };

  return (
    <>
      {error && <p className="text-red-500 mb-4">{error}</p>}      
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-gray-200">Correo Electrónico</label>
            <input 
                type="email" 
                className="w-full border p-2 rounded dark:border-gray-200 dark:text-gray-200"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />    
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-gray-900 dark:text-gray-200">Contraseña</label>
            <input 
                type="password"
                className="w-full border p-2 rounded dark:border-gray-200 dark:text-gray-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
          </div>
          <button
            type="submit"
            className="bg-violet-400 dark:bg-cyan-400 dark:hover:bg-cyan-600 py-2 px-4 rounded-xl cursor-pointer w-full">
            {title}  
          </button>
        </form>
    </>
  );
}
export default AuthForm;
