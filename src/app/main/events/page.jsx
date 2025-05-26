// src/app/(main)/events/page.jsx
import Link from 'next/link';
import { getEvents } from '@/lib/apiService'; // Llamamos directamente al servicio
// O podrías usar la Server Action: import { getEventsAction } from '@/actions/eventActions';
import EventList from '@/components/EventList';
import PaginationControls from '@/components/PaginationControls';

// Las Server Components pueden ser async y recibir searchParams
export default async function EventsPage({ searchParams }) {
    const page = searchParams['page'] ? parseInt(searchParams['page']) : 1;
    const limit = searchParams['limit'] ? parseInt(searchParams['limit']) : 10;

    let eventsData = { events: [], totalPages: 1, currentPage: 1 }; // Valor por defecto
    let error = null;

    try {
        // Llamada directa al servicio
        const result = await getEvents({ page, limit });
        // Asumimos que `getEvents` devuelve un objeto como:
        // { events: [...], totalPages: X, currentPage: Y } o la estructura que tu API provea.
        // Ajusta esto según la respuesta real de tu API.
        // Si tu API solo devuelve el array de eventos, necesitarás otra forma de obtener totalPages.
        eventsData = {
            events: result.data || result.events || [], // Adapta según la estructura de tu respuesta
            totalPages: result.meta?.totalPages || result.totalPages || 1,
            currentPage: result.meta?.currentPage || result.currentPage || page,
        };

        // // Alternativa usando la Server Action (si la prefieres para centralizar)
        // const actionResult = await getEventsAction({ page, limit });
        // if (actionResult.success) {
        //     eventsData = {
        //         events: actionResult.data.events || [],
        //         totalPages: actionResult.data.totalPages || 1,
        //         currentPage: actionResult.data.currentPage || page,
        //     };
        // } else {
        //     error = actionResult.error;
        // }

    } catch (e) {
        console.error("Failed to fetch events:", e);
        error = e.message || "Could not load events.";
    }

    if (error) {
        return (
            <div className="container mx-auto p-4">
                <h1 className="text-2xl font-bold mb-4">Events</h1>
                <p className="text-red-500">Error loading events: {error}</p>
                <Link href="/new-event" className="text-blue-500 hover:underline">
                    Try creating a new event
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Upcoming Events</h1>
                <Link href="/new-event" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Create New Event
                </Link>
            </div>

            {eventsData.events.length > 0 ? (
                <EventList events={eventsData.events} />
            ) : (
                <p>No events found. Why not create one?</p>
            )}

            <PaginationControls
                currentPage={eventsData.currentPage}
                totalPages={eventsData.totalPages}
                basePath="/events" // La ruta base para la paginación
            />
        </div>
    );
}