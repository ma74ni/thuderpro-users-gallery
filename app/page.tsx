'use client';
import Image from 'next/image';
import { useAuth } from './context/AuthContext';
import { useRouter } from "next/navigation";
import { useModal } from './context/ModalContext';

export default function Home() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();
  const { openModal } = useModal();

  const handleProtectedNavigation = () => {
    if (isLoggedIn) {
      router.push('/gallery');
    } else {
      openModal('login')
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex md:flex-row flex-col items-center justify-center">
      <div className="basis-1/2 pt-12">
        <h1 className="text-3xl md:text-7xl sm:text-5xl text-center font-bold mb-4 text-gray-900 dark:text-gray-100">
          ¡Hola! Esta es la galería de usuarios
        </h1>
        <div className="flex justify-center">
          <button type='button' onClick={handleProtectedNavigation} className="bg-violet-400 hover:bg-violet-600 dark:bg-cyan-400 dark:hover:bg-cyan-600 py-2 px-4 rounded-xl cursor-pointer">
            Ver usuarios
          </button>
        </div>
      </div>
      <div className="basis-1/2">
        <div className="h-24 w-24 flex-col items-center justify-center md:h-96 md:w-96 hidden md:flex">
         <Image
          src="/assets/images/slider.jpg"
          alt="slider"
          width={1408}
          height={768}
          sizes="100vw"
        />
        </div>
      </div>
    </div>
    </div>
  );
}
