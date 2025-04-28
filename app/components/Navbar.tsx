'use client';
import Link from 'next/link';
import { useState } from 'react';
import { Bars3Icon, UserIcon  } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Modal from './Modal';
import AuthForm from './AuthForm';
import { registerUser, loginUser } from '../utils/api';
import { useRouter } from "next/navigation";
import { useAuth } from '../context/AuthContext';
import { useModal } from '../context/ModalContext';
import Alert from './Alert';

const Navbar = () => {
  const router = useRouter();
  
  const { isLoggedIn, login, logout } = useAuth();
  const { isOpen, modalType, openModal, closeModal } = useModal();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleRegister = async (email: string, password: string) => {
    await registerUser(email, password);
    setShowAlert(true);
    closeModal();
  }

  const handleLogin = async (email: string, password: string) => {
    const data = await loginUser(email, password);
    console.log("Ingresó");
    login(data.token);
    router.push("/gallery");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const AuthButtons = () => (
    <>
      <button onClick={() => openModal('login')} className='border-2 border-violet-400 dark:border-cyan-400 dark:hover:border-cyan-600 py-2 px-4 rounded-xl cursor-pointer'>Ingresar</button>
      <button onClick={() => openModal('register')} className='bg-violet-400 dark:bg-cyan-400 dark:hover:bg-cyan-600 py-2 px-4 rounded-xl cursor-pointer'>Registrar</button>
    </>
  );
  const GalleryLink = () => (
    <>
      <Link href="/gallery" className="block px-3 py-2 rounded-md text-base font-medium">
        Galería
      </Link>
      <button onClick={logout} className='border-2 border-violet-400 dark:border-cyan-400 dark:hover:border-cyan-600 py-2 px-4 rounded-xl cursor-pointer'>Salir</button>
    </>
  );

  return (
    <>
    {showAlert && (
      <Alert
        type="success"
        title="Registro exitoso"
        body="Ahora debes iniciar sesión para continuar."
        setShowAlert={setShowAlert}
      />
    )}
    
    <nav className="bg-gray-100 shadow">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                width={100}
                height={30}
                className="h-8 w-auto"
                src="/assets/logo/logo.svg"
                alt="Tu Logo"
              />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center space-x-4">
              {isLoggedIn ? <GalleryLink /> : <AuthButtons />}
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-200 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              {isMenuOpen ? (
                <UserIcon  className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isMenuOpen && (
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
          {isLoggedIn ? <GalleryLink /> : <AuthButtons />}
        </div>
      )}
    </nav>

    <Modal isOpen={isOpen} onClose={closeModal} title={modalType === 'login' ? 'Ingresar' : 'Registrar'}>
      {modalType === 'login' ? (
        <AuthForm onSubmit={handleLogin} title="Ingresar" />
      ) : (
        <AuthForm onSubmit={handleRegister} title="Registrar" />
      )}
    </Modal>
    </>
  );
};

export default Navbar;