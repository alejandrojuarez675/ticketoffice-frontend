// src/components/Header/Header.jsx (o donde lo tengas)
// Asegúrate de que Tailwind CSS esté configurado en tu proyecto Next.js 15.
'use client';
import React, { useState } from 'react';
import Link from 'next/link';
// import Image from 'next/image'; // Descomenta si usas un archivo de imagen para el logo

// Componente SVG para el ícono de búsqueda (puedes reemplazarlo con uno de una librería)
const SearchIcon = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={2}
    stroke="currentColor"
    className={className || "h-5 w-5"} // Tamaño por defecto, puede ser sobrescrito
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
    />
  </svg>
);

export default function Header() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="w-full bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        {/* Contenedor del Logo */}
        <div className="flex-shrink-0">
          <Link href="/" className="text-xl sm:text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
            {/* Opción 1: Texto como logo */}
            TicketOffice
            {/* Opción 2: Imagen como logo
            <Image
              src="/path-to-your-logo.png"
              alt="Ticket Office Logo"
              width={160} // Ajusta según tu logo
              height={35} // Ajusta según tu logo
              priority
            />
            */}
          </Link>
        </div>

        {/* Contenedor de Navegación y Búsqueda */}
        <nav className="flex items-center gap-x-3 sm:gap-x-4 md:gap-x-5">
          {/* Enlaces de Navegación - Estos se moverán */}
          <ul className="flex items-center gap-x-3 sm:gap-x-4 md:gap-x-5">
            <li>
              <Link href="/contactanos" className="text-gray-600 hover:text-blue-600 px-2 py-2 text-sm sm:text-base font-medium transition-colors">
                Contáctanos
              </Link>
            </li>
            <li>
              <Link href="/signin" className="text-gray-600 hover:text-blue-600 px-2 py-2 text-sm sm:text-base font-medium transition-colors">
                Sign In
              </Link>
            </li>
            <li>
              <Link href="/register" className="bg-blue-600 text-white hover:bg-blue-700 px-3 sm:px-4 py-2 rounded-md text-sm sm:text-base font-medium transition-colors">
                Register
              </Link>
            </li>
          </ul>

          {/* Grupo de Búsqueda (Input + Icono) */}
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Buscar..."
              className={`border-gray-300 rounded-md shadow-sm text-sm transition-all duration-300 ease-in-out focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                ${isSearchOpen
                  ? 'w-32 sm:w-40 md:w-48 opacity-100 px-3 py-2 border' // Visible y con padding y borde
                  : 'w-0 opacity-0 p-0 border-none' // Oculto
                }`}
              aria-hidden={!isSearchOpen} // Para accesibilidad
              tabIndex={isSearchOpen ? 0 : -1} // Para accesibilidad
            />
            <button
              onClick={toggleSearch}
              className="p-2 text-gray-500 hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-full transition-colors"
              aria-label={isSearchOpen ? "Cerrar búsqueda" : "Abrir búsqueda"}
              aria-expanded={isSearchOpen}
            >
              <SearchIcon className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}