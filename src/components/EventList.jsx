// src/components/EventList.jsx
import Link from 'next/link';

export default function EventList({ events }) {
    if (!events || events.length === 0) {
        return <p>No events to display.</p>;
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
                <div key={event.id || event._id} className="border rounded-lg p-4 shadow-lg">
                    <h2 className="text-xl font-semibold mb-2">{event.name}</h2>
                    <p className="text-gray-700 mb-1">Date: {new Date(event.date).toLocaleDateString()}</p>
                    <p className="text-gray-600 mb-3 truncate">{event.description}</p>
                    <Link href={`/events/${event.id || event._id}`} className="text-blue-500 hover:underline">
                        View Details
                    </Link>
                </div>
            ))}
        </div>
    );
}