// src/app/main/events/[eventId]/error.jsx
'use client';

import { useEffect } from 'react';

export default function EventDetailError({ error, reset }) {
  useEffect(() => {
    console.error("Error en la página de detalle del evento:", error);
  }, [error]);

  return (
    <div className="container mx-auto px-4 py-10 text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-3">¡Oops! Algo salió mal.</h2>
      <p className="text-gray-700 mb-6">No pudimos cargar los detalles de este evento.</p>
      <button
        onClick={() => reset()} // Intenta re-renderizar el segmento de la ruta
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Intentar de Nuevo
      </button>
    </div>
  );
}