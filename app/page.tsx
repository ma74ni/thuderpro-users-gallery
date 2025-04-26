'use client';

import { useEffect, useState } from "react";
import { getUsers } from "./utils/api";
import { User } from "./types/user";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);


  useEffect(() => {
    const loaderUser = async () => {
      setLoading(true);
      setError(null);
      try{
        const data = await getUsers(page);
        setUsers(data.data);
        setTotalPages(data.total_pages);
        setPage(data.page);
        setLoading(false);
        console.log("User data:", data);
        console.log("Total pages:", totalPages);
      }
      catch (error) {
        console.error("Error loading user:", error);
        setError('Hubo un error al cargar los usuarios. Por favor, intenta de nuevo más tarde.');
      }
      finally {
        setLoading(false);
      }
    }
    loaderUser();
  },[page]);
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Galería de Usuarios</h1>
      {loading && <p className="text-gray-500">Cargando...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {users.map((user) => (
            <div key={user.id} className="bg-white shadow-md rounded-lg p-4">
              
              <h2 className="text-xl font-semibold mt-2">{`${user.first_name} ${user.last_name}`}</h2>
              <p className="text-gray-600">{user.email}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
