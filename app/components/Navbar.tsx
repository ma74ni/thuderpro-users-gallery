'use client';
import Link from 'next/link';
import { useState } from 'react';
import { MinusIcon, UserIcon  } from '@heroicons/react/24/outline';
import Image from 'next/image';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-100 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <Link href="/nosotros" className="text-gray-500 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                Nosotros
              </Link>
              <Link href="/servicios" className="text-gray-500 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                Servicios
              </Link>
              <Link href="/contacto" className="text-gray-500 hover:bg-gray-200 px-3 py-2 rounded-md text-sm font-medium">
                Contacto
              </Link>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              type="button"
              className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              aria-expanded="false"
            >
              <span className="sr-only">Abrir menú principal</span>
              {isOpen ? (
                <UserIcon  className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <MinusIcon className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Menú móvil */}
      <div className={isOpen ? 'md:hidden block' : 'md:hidden hidden'}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link href="/nosotros" className="bg-gray-200 text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
            Nosotros
          </Link>
          <Link href="/servicios" className="text-gray-500 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium">
            Servicios
          </Link>
          <Link href="/contacto" className="text-gray-500 hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium">
            Contacto
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;