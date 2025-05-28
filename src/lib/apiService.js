
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
// Mock data for users and events
const mockUserData = { username: "testUser", token: "mockToken123" }; // Example user data
const mockPublicEvents = [
    {
        id: 1,
        title: "Concert of Don Omar 1",
        date: "11-12-2025",
        location: "Bogotá, Movistar Arena",
        ageRestriction: 15,
        time: "7:00 p.m.",
        price: "100.99",
        categories: ["Music", "Concert"],
        images: ["https://media.licdn.com/dms/image/v2/C5612AQGbvv_Zj5JQ1w/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1551108267663?e=2147483647&v=beta&t=uau57Gh-xmNbI30zoJ5FHU3tvWHjKyGhaz6uxuN5Rjc", "https://academy.4.events/pt-br/wp-content/uploads/2021/05/eventos-coporativo-telao-1024x576.jpg", "https://www.jornalrmc.com.br/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-22-at-10.09.05.jpg"],
    },
    {
        id: 2,
        title: "Concert of Don Omar 2",
        date: "11-12-2025",
        location: "Bogotá, Movistar Arena",
        ageRestriction: 15,
        time: "7:00 p.m.",
        price: "100.99",
        categories: ["Music", "Concert", "Live"],
        images: ["https://media.licdn.com/dms/image/v2/C5612AQGbvv_Zj5JQ1w/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1551108267663?e=2147483647&v=beta&t=uau57Gh-xmNbI30zoJ5FHU3tvWHjKyGhaz6uxuN5Rjc", "https://academy.4.events/pt-br/wp-content/uploads/2021/05/eventos-coporativo-telao-1024x576.jpg", "https://www.jornalrmc.com.br/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-22-at-10.09.05.jpg"],
    },
    {
        id: 3,
        title: "Aguilar Family Concert",
        date: "10-30-2025",
        location: "Colombian Plaza",
        ageRestriction: 12,
        time: "8:00 p.m.",
        price: "80.50",
        categories: ["Music", "Family", "Concert"],
        images: ["https://media.licdn.com/dms/image/v2/C5612AQGbvv_Zj5JQ1w/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1551108267663?e=2147483647&v=beta&t=uau57Gh-xmNbI30zoJ5FHU3tvWHjKyGhaz6uxuN5Rjc", "https://academy.4.events/pt-br/wp-content/uploads/2021/05/eventos-coporativo-telao-1024x576.jpg", "https://www.jornalrmc.com.br/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-22-at-10.09.05.jpg"],
    },
];
const mockEventDetails = {
    id: 1,
    title: "Concert of Don Omar",
    date: "11-12-2025",
    location: "Bogotá, Movistar Arena",
    ageRestriction: 15,
    time: "7:00 p.m.",
    price: "100.99",
    description: "¡El artista que enamoró al país con su voz regresa al escenario más importante de Colombia! Descripción detallada sobre el evento.",
    generalInfo: [
        "El aforo total incluye reservas técnicas y de patrocinadores.",
        "El precio de las boletas puede fluctuar en función de la oferta y demanda.",
        "Las compras realizadas por Página web, Contact Center y Puntos de venta tienen un costo adicional."
    ],
    images: ["https://media.licdn.com/dms/image/v2/C5612AQGbvv_Zj5JQ1w/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1551108267663?e=2147483647&v=beta&t=uau57Gh-xmNbI30zoJ5FHU3tvWHjKyGhaz6uxuN5Rjc"],
};

// Function to mock fetching user data
const fetchMockUser = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockUserData);
        }, 1000); 
    });
};

// Function to simulate fetching public events
const fetchMockPublicEvents = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockPublicEvents);
        }, 1000); 
    });
};

// Function to mock fetching events
const fetchMockEvents = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(mockPublicEvents);
        }, 1000); 
    });
};

// Function to mock fetching a specific event by ID
const fetchMockEventById = (id) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const event = mockPublicEvents.find(event => event.id === id);
            if (event) {
                resolve({ ...event, description: mockEventDetails.description, generalInfo: mockEventDetails.generalInfo });
            } else {
                reject(new Error('Event not found'));
            }
        }, 1000);
    });
};

const fetchApi = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    console.log(`Fetching API: ${options.method || 'GET'} ${url}`);
    const defaultHeaders = {
        "Content-Type": "application/json",
        Accept: "application/json",
    };

    // Handle token management
    if (typeof window !== "undefined") {
        const token = localStorage.getItem('authToken');
        if (token) {
            defaultHeaders['Authorization'] = `Bearer ${token}`;
        }
    }

    const config = {
        ...options,
        headers: {
        ...defaultHeaders,
        ...options.headers,
        },
    };

    try {
        // Use mocked APIs for testing purposes
        if (endpoint === "/users/me" && config.method === "GET") {
            return await fetchMockUser(); // Mock user data
        }
        if (endpoint === "/v1/events" && config.method === "POST") {
            return await fetchMockEvents(); // Mock event data
        }

        if (endpoint === "/events/public" && config.method === "GET") {
            return await fetchMockPublicEvents(); // Mock function for public events
        }

        const eventByIdRegex = /^\/public\/v1\/event\/(\d+)$/; // Expresión regular para capturar el ID
        const eventByIdMatch = endpoint.match(eventByIdRegex);

        if (eventByIdMatch && config.method === "GET") {
            const eventId = parseInt(eventByIdMatch[1], 10); // El ID capturado está en eventByIdMatch[1]
            console.log(`Using mock for GET /public/v1/event/${eventId}`);
            return await fetchMockEventById(eventId);
        }

        const response = await fetch(url, config);

        if (response.status === 204) { // No Content
            return null;
        }

        const responseData = await response.json().catch(() => {
            // Si response.json() falla, podría no ser JSON (ej. error HTML del servidor)
            return response.text().then(text => {
                 throw new Error(`Response was not JSON. Status: ${response.status}. Body: ${text}`);
            });
        });

        if (!response.ok) {
            const message = responseData?.message || responseData?.error || JSON.stringify(responseData) || `Network error: ${response.status} ${response.statusText}`;
            const error = new Error(message);
            error.status = response.status;
            error.data = responseData;
            throw error;
        }
        return responseData;

    }   
    catch (error) {
        throw error;
    }
};

// --- Functions for API Operations ---

export const fetchEvents = async () => {
    // Assuming this is the endpoint to get public events
    return await fetchApi("/events/public", {
        method: "GET",
    });
};

// User Signup
export const signup = (userData) => {
    return fetchApi("/auth/signup", {
        method: "POST",
        body: JSON.stringify(userData),
    });
};

// User Login
export const login = async (credentials) => {
    const response = await fetchApi("/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials),
    });

    if (typeof window !== "undefined" && response && response.token) {
        localStorage.setItem('authToken', response.token);
    }
    return response;
};

// Create New Event
export const createEvent = (eventData) => {
    return fetchApi("/v1/events", {
        method: "POST",
        body: JSON.stringify(eventData),
    });
};

// Get Authenticated User
export const getAuthenticatedUser = async () => {
    return fetchApi("/users/me", {
        method: "GET",
    });
};

// Get Event by ID
export const getEventById = (id) => {
    return fetchApi(`/public/v1/event/${id}`, { method: "GET" });
};

// Fetch Events (with pagination if needed)
export const getEvents = ({ page = 1, limit = 10 } = {}) => {
    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
    });
    // Este endpoint SÍ está mockeado arriba (GET /events/public?...)
    return fetchApi(`/events/public?${queryParams.toString()}`, { method: "GET" });
};