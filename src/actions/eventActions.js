// src/actions/eventActions.js
'use server'; // MUY IMPORTANTE: Indica que estas son Server Actions

import { revalidatePath } from 'next/cache';
import { createEvent as createEventService, getEvents as getEventsService } from '@/lib/apiService'; 

export async function createEventAction(formData) {
    const eventData = {
        name: formData.get('name'),
        description: formData.get('description'),
        date: formData.get('date'),
        // ... otros campos del formulario
    };

    // Ejemplo si necesitaras un token (ej. guardado en una cookie httpOnly)
    // const token = cookies().get('authToken')?.value;
    // if (!token) {
    //   return { success: false, error: 'Not authenticated' };
    // }

    try {
        // const newEvent = await createEventService(eventData, token);
        const newEvent = await createEventService(eventData); // Sin token por ahora
        revalidatePath('/events'); // Invalida el caché para la ruta /events, para que se actualice la lista
        return { success: true, data: newEvent };
    } catch (error) {
        console.error('Create event action error:', error);
        return { success: false, error: error.message || 'Failed to create event' };
    }
}

// Podrías tener una Server Action también para obtener eventos si quisieras
// centralizar más la lógica, o llamarlo directamente desde Server Components.
export async function getEventsAction({ page, limit }) {
    try {
        const result = await getEventsService({ page, limit });
        return { success: true, data: result }; // Asumiendo que getEventsService devuelve { events: [], totalPages: X, ... }
    } catch (error) {
        console.error('Get events action error:', error);
        return { success: false, error: error.message || 'Failed to fetch events' };
    }
}