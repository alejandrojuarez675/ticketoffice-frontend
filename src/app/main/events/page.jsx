'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchEvents } from '@/lib/apiService';
import EventImages from '@/components/EventImages';
import EventInfo from '@/components/EventInfo';
import EventCategories from '@/components/EventCategories';

export default function EventsListPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading
    const [error, setError] = useState(null); // State to handle potential errors

    useEffect(() => {
        const loadEvents = async () => {
            setLoading(true); // Set loading state before fetching
            try {
                const fetchedEvents = await fetchEvents();
                setEvents(fetchedEvents);
            } catch (error) {
                console.error('Error fetching events:', error); // Log error for debugging
                setError('Failed to fetch events'); // Set error message state
            } finally {
                setLoading(false); // Always reset loading state
            }
        };

        loadEvents();
    }, []);

    if (loading) {
        return <div className="text-center py-4">Loading events...</div>; // Loading state
    }

    if (error) {
        return <div className="text-center py-4 text-red-500">{error}</div>; // Show error message
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">Próximos Eventos</h1>
            {events.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {events.map((event) => (
                        // Asume que `event.id` o `event._id` es el identificador único
                        <div key={event.id || event._id} className="border rounded-lg shadow-lg overflow-hidden flex flex-col">
                            {/* Podrías usar una versión resumida o un componente CardEvent aquí */}
                            <EventImages images={event.images_thumbnail || (event.images && event.images.slice(0,1)) || []} eventId={event.id || event._id} isThumbnail={true} />
                            <div className="p-4 flex flex-col flex-grow">
                                <EventInfo
                                    title={event.title}
                                    date={event.date}
                                    location={event.location}
                                    // No mostrar todos los detalles en la tarjeta, solo lo esencial
                                    // ageRestriction={event.ageRestriction}
                                    // time={event.time}
                                    price={event.price}
                                />
                                <div className="mt-auto pt-4"> {/* Empuja el botón hacia abajo */}
                                    <Link
                                        href={`/main/events/${event.id || event._id}`} // RUTA DINÁMICA
                                        className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition duration-150 ease-in-out"
                                    >
                                        Ver Detalles
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-4">No events available.</div> // Fallback if no events
            )}
            <EventCategories />
        </div>
        
    );
}