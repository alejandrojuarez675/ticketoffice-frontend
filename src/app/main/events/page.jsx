'use client';
import React, { useEffect, useState } from 'react';
import { fetchEvents } from '@/lib/apiService';
import EventImages from '@/components/EventImages';
import EventInfo from '@/components/EventInfo';

export default function EventPage() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading
    const [error, setError] = useState(null); // State to handle potential errors

    useEffect(() => {
        const getEvents = async () => {
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

        getEvents();
    }, []);

    if (loading) {
        return <div className="text-center py-4">Loading events...</div>; // Loading state
    }

    if (error) {
        return <div className="text-center py-4 text-red-500">{error}</div>; // Show error message
    }

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 mt-8">
            {events.length > 0 ? (
                events.map((event) => (
                    <div key={event.id} className="mb-8">
                        <EventImages images={event.images} />
                        <EventInfo
                            title={event.title}
                            date={event.date}
                            location={event.location}
                            ageRestriction={event.ageRestriction}
                            time={event.time}
                            price={event.price}
                        />
                    </div>
                ))
            ) : (
                <div className="text-center py-4">No events available.</div> // Fallback if no events
            )}
        </div>
    );
}