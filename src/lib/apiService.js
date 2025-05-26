// src/lib/apiService.js

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080';

/**
 * Placeholder function to get an authentication token.
 * Implement this based on how you store your tokens (e.g., localStorage, cookies via Server Actions).
 * Si se usa desde Server Components o Server Actions que pueden acceder a cookies httpOnly,
 * el token se obtendría de manera diferente (ej. import { cookies } from 'next/headers';)
 * y se pasaría explícitamente a fetchApi o se inyectaría en las opciones de cabecera.
 */
// const getAuthToken = () => {
//   if (typeof window !== "undefined") {
//     return localStorage.getItem('authToken');
//   }
//   return null;
// };

const fetchApi = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json', // Es buena práctica incluir el header Accept
    };

    // Ejemplo de cómo podrías añadir un token de autenticación automáticamente
    // const token = getAuthToken(); // O obtenerlo de `options` si se pasa explícitamente
    // if (token) {
    //   defaultHeaders['Authorization'] = `Bearer ${token}`;
    // }
    // Si el token se pasa en options.headers, se fusionará correctamente.

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers, // Permite sobrescribir o añadir cabeceras por petición
        },
    };

    try {
        const response = await fetch(url, config);

        // Manejo de respuesta sin contenido (ej. DELETE exitoso)
        if (response.status === 204) {
            return null; // O podrías devolver { success: true }
        }

        // Intenta parsear el cuerpo de la respuesta como JSON
        // Algunas APIs pueden devolver texto plano en errores no JSON
        let responseData;
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
            responseData = await response.json();
        } else {
            // Si no es JSON, intenta obtener el texto. Útil para errores de servidor no JSON.
            responseData = await response.text();
            // Si la respuesta no fue OK y no es JSON, es probable que responseData sea un mensaje de error en texto.
            if (!response.ok) {
                throw new Error(responseData || `Request failed with status ${response.status}`);
            }
        }

        if (!response.ok) {
            // Si responseData es un objeto (JSON parseado), intenta obtener un mensaje de error
            const message = responseData?.message || responseData?.error || JSON.stringify(responseData) || `Network response was not ok: ${response.status} ${response.statusText}`;
            const error = new Error(message);
            error.status = response.status;
            error.data = responseData; // Adjunta toda la respuesta de error por si es útil
            throw error;
        }

        return responseData;

    } catch (error) {
        // Asegurarse de que el error propagado tenga un mensaje
        // console.error(`API call to ${url} failed:`, error.message || error);
        // Re-lanza el error para que el componente/acción que llama pueda manejarlo
        throw error;
    }
};

// --- Funciones de Servicio Específicas ---

// User Signup
export const signup = (userData) => {
    return fetchApi('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
    });
};

// User Login
export const login = (credentials) => {
    return fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
    });
};

/**
 * Create New Event
 * @param {object} eventData - Los datos del evento.
 * @param {string} [token] - Token de autenticación opcional. Si se provee, se usará.
 */
export const createEvent = (eventData, token) => {
    const headers = {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return fetchApi('/events', { // Asumiendo que este endpoint está bajo /api/v1
        method: 'POST',
        body: JSON.stringify(eventData),
        headers,
    });
};

// Get Authenticated User
// El token se manejaría idealmente dentro de fetchApi o se pasaría explícitamente
export const getAuthenticatedUser = (token) => {
    const headers = {};
    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }
    return fetchApi('/users/me', { 
        method: 'GET',
        headers,
    });
};

// Get Event by ID
export const getEventById = (id) => {
    // Asumiendo que este endpoint es público y no requiere token,
    return fetchApi(`/events/${id}`, { 
        method: 'GET',
    });
};

/**
 * Obtiene una lista de eventos, con soporte para paginación.
 * El backend debe soportar query params como ?page=1&limit=10
 * y se espera que devuelva un objeto como { data: [], totalPages: 5, currentPage: 1, totalItems: 50 }
 * o similar.
 */
export const getEvents = ({ page = 1, limit = 10 } = {}) => {
    const queryParams = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
    return fetchApi(`/events/public?${queryParams.toString()}`, {
        method: 'GET',
    });
    // La respuesta esperada:
    // {
    //   data: [{id, name,...}, ...],
    //   meta: {
    //     currentPage: 1,
    //     totalPages: 10,
    //     itemsPerPage: 10,
    //     totalItems: 100
    //   }
    // }
    // o
    // {
    //   events: [...],
    //   totalPages: 10,
    //   currentPage: 1
    // }
    // Deberás ajustar cómo se procesa esta respuesta en el componente que llama a getEvents.
};

// añadir más funciones de servicio aquí (PUT, DELETE, etc.)
// export const updateEvent = (id, eventData, token) => {
//   const headers = {};
//   if (token) headers['Authorization'] = `Bearer ${token}`;
//   return fetchApi(`/events/${id}`, {
//     method: 'PUT',
//     body: JSON.stringify(eventData),
//     headers,
//   });
// };

// export const deleteEvent = (id, token) => {
//   const headers = {};
//   if (token) headers['Authorization'] = `Bearer ${token}`;
//   return fetchApi(`/events/${id}`, {
//     method: 'DELETE',
//     headers,
//   });
// };