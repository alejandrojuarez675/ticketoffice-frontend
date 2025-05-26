// src/components/EventForm.jsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createEventAction } from '@/actions/eventActions'; 

export default function EventForm() {
    const router = useRouter();
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setError('');

        const formData = new FormData(event.currentTarget);
        // console.log(Object.fromEntries(formData.entries())); // Para depurar datos del form

        const result = await createEventAction(formData); // Llama a la Server Action

        setIsSubmitting(false);

        if (result.success) {
            // Evento creado exitosamente
            router.push('/events'); // Redirige a la lista de eventos
        } else {
            setError(result.error || 'An unknown error occurred.');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Event Name
                </label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>

            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                </label>
                <textarea
                    name="description"
                    id="description"
                    rows="3"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                ></textarea>
            </div>

            <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                    Date
                </label>
                <input
                    type="date"
                    name="date"
                    id="date"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
            </div>
            {/* Agrega más campos según necesites (ubicación, etc.) */}

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <div>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                    {isSubmitting ? 'Creating...' : 'Create Event'}
                </button>
            </div>
        </form>
    );
}