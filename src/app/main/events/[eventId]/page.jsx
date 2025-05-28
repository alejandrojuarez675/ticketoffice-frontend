// src/app/main/events/[eventId]/page.jsx

// Ya no necesitamos 'use client' para la carga principal de datos
import { getEventById } from '@/lib/apiService'; // Asegúrate que el nombre de la función sea el correcto en tu apiService
import EventImages from '@/components/EventImages';
import EventInfo from '@/components/EventInfo';
import EventDetail from '@/components/EventDetail';
import { notFound } from 'next/navigation'; // Para manejar errores 404

// Las páginas en el App Router pueden ser funciones async para cargar datos en el servidor
export default async function EventDetailPage({ params }) {
    const { eventId } = params; // eventId viene del nombre de la carpeta [eventId]

    // Es buena práctica validar si eventId existe, aunque Next.js usualmente lo maneja.
    if (!eventId) {
        console.error("Event ID es undefined en params.");
        notFound(); // Redirige a la página 404 si no hay eventId
    }

    let eventData = null;
    let fetchError = null;

    try {
        // Llamamos directamente a la función para obtener los datos del evento en el servidor
        eventData = await getEventById(eventId);

        // Si la API devuelve null o undefined porque el evento no existe con ese ID
        if (!eventData) {
            notFound(); // Mostramos la página 404
        }
    } catch (error) {
        console.error(`Error fetching event data for ID ${eventId} in Server Component:`, error);
        fetchError = 'No se pudieron cargar los detalles del evento. Por favor, inténtalo más tarde.';
        // Opcionalmente, si tienes un archivo error.js, puedes simplemente dejar que el error se propague:
        // throw error;
    }

    // Si hubo un error durante el fetch, mostramos un mensaje
    if (fetchError) {
        return (
            <div className="container mx-auto px-4 py-10 text-center">
                <h1 className="text-2xl font-bold text-red-600 mb-4">Error de Carga</h1>
                <p className="text-red-500">{fetchError}</p>
            </div>
        );
    }

    // Si por alguna razón eventData es null aquí (y no se lanzó notFound antes)
    if (!eventData) {
        // Esto es un seguro extra, idealmente el `if (!eventData)` dentro del try/catch ya llamó a `notFound()`
        return <div className="text-center py-10">Evento no encontrado.</div>;
    }

    // Si todo está bien, renderizamos la página con los datos del evento
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Carrusel de Imágenes del Evento */}
            {/* Asegúrate que eventData.images es un array; usa un array vacío como fallback */}
            <EventImages images={eventData.images || []} eventId={eventId} />

            {/* Información Principal del Evento */}
            <EventInfo
                title={eventData.title || 'Título del Evento no Disponible'}
                date={eventData.date} // Asegúrate que el formato sea el esperado por EventInfo
                location={eventData.location}
                ageRestriction={eventData.ageRestriction}
                time={eventData.time}
                price={eventData.price} // Considera el formato de la moneda/precio
            />

            {/* Descripción Detallada y Otra Información General */}
            <EventDetail eventData={eventData} />

            {/* Aquí podrías añadir un botón o sección para la compra de tiquetes */}
            <div className="mt-12 text-center">
                <button
                    type="button"
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-md transition-transform transform hover:scale-105"
                >
                    Comprar Tiquetes
                </button>
                {/* Este botón necesitaría lógica adicional, probablemente en un Componente de Cliente */}
            </div>
        </div>
    );
}