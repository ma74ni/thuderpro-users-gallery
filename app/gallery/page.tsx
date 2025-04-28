'use client';

import { useEffect, useState } from "react";
import { getUsers } from "../utils/api";
import { User } from "../types/user";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";
import Alert from "../components/Alert";
import SkeletonCard from "../components/SkeletonCard";
import Card from "../components/Card";

export default function Gallery() {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  }, [token, router]);

  useEffect(() => {
    const loaderUser = async () => {
      setLoading(true);
      setError(null);
      try{
        const data = await getUsers(page);
        setUsers(data.data);
        setTotalPages(data.total_pages);        
        setLoading(false);
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

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1);
    }
  };

  if (!token) return null;
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">Galería de Usuarios</h1>
      {error && <Alert title="Error" body={error} type="error" />}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading || error ? (
          <>
            {Array(8).fill(undefined).map((_, index) => <SkeletonCard key={index} />)}
          </>
        ):(
          <>
            {users.map((user) => (
              <Card key={user.id} user={user} />
            ))}
          </>
        )}
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={page === 1}
          className="cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100"
        >
          Anterior
        </button>
        <span className="bg-gray-200 text-gray-700 py-2 px-4 dark:bg-gray-800 dark:text-gray-200">{page} / {totalPages}</span>
        <button
          onClick={handleNextPage}
          disabled={page === totalPages}
          className="cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r disabled:opacity-50 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-100"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
}
