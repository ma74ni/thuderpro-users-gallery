'use client';
import { useEffect, useState } from "react";
import { User } from "../../types/user";
import { getUser } from "../../utils/api";
import { useRouter } from "next/navigation";
import Alert from "@/app/components/Alert";
import Image from "next/image";
import { useParams } from "next/navigation";

const UserPage = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();
    
    const { id } = useParams();

    useEffect(() => {
        if (!id) return;
        const loadUser = async () => {
          setLoading(true);
          setError(null);
          try {
            const userData = await getUser(Number(id));
            setUser(userData);
            setLoading(false);
          } catch (error) {
            console.error("Error loading user details:", error);
            setError('Hubo un error al cargar los detalles del usuario.');
            setLoading(false);
          }
        };
    
        loadUser();
      }, [id]);

      if (loading) {
        return <div>Cargando detalles del usuario...</div>; // Puedes usar un Skeleton aquí también
      }
    
      if (error) {
        return <Alert title="Error" body={error} type="error" />;
      }
    
      if (!user) {
        return <div>Usuario no encontrado.</div>;
      }

    return(
        <div className="container mx-auto p-4">
        <div className="bg-gray-300 flex flex-col items-center dark:bg-gray-600 shadow-md rounded-xl p-8">
          <Image
            src={user.avatar}
            alt={`${user.first_name} ${user.last_name}`}
            width={150}
            height={150}
            className="rounded-full mb-6"
          />
          <h2 className="text-2xl font-semibold mt-2 text-gray-900 dark:text-gray-100">{`${user.first_name} ${user.last_name}`}</h2>
          <p className="text-lg text-gray-800 dark:text-gray-200 mb-4">{user.email}</p>
        </div>
        <div className="flex w-full justify-center mt-4">
            <button type='button' onClick={() => router.back()} className="bg-violet-400 hover:bg-violet-600 dark:bg-cyan-400 dark:hover:bg-cyan-600 py-2 px-4 rounded-xl cursor-pointer">
                Volver a la Galería
            </button>
        </div>
      </div>
    )
}
export default UserPage;