// src/lib/apiService.js

const API_BASE_URL =
process.env.NEXT_PUBLIC_API_BASE_URL || "[http://localhost:8080](http://localhost:8080/)";

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
        images: ["https://media.licdn.com/dms/image/v2/C5612AQGbvv_Zj5JQ1w/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1551108267663?e=2147483647&v=beta&t=uau57Gh-xmNbI30zoJ5FHU3tvWHjKyGhaz6uxuN5Rjc", "https://academy.4.events/pt-br/wp-content/uploads/2021/05/eventos-coporativo-telao-1024x576.jpg", "https://www.jornalrmc.com.br/wp-content/uploads/2023/08/WhatsApp-Image-2023-08-22-at-10.09.05.jpg"],
    },
];

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

const fetchApi = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;

    const defaultHeaders = {
        "Content-Type": "application/json",
        Accept: "application/json",
    };

    // Handle token management
    const token = typeof window !== "undefined" ? localStorage.getItem('authToken') : null;
    if (token) {
        defaultHeaders['Authorization'] = `Bearer ${token}`;
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
        if (endpoint === "/users/me") {
            return await fetchMockUser(); // Mock user data
        }
        if (endpoint === "/v1/events") {
            return await fetchMockEvents(); // Mock event data
        }

        if (endpoint === "/events/public") {
            return await fetchMockPublicEvents(); // Mock function for public events
        }

        const response = await fetch(url, config);

        if (!response.ok) {
            const errorMessage = response.statusText || 'An error occurred';
            throw new Error(errorMessage);
        }

        return await response.json();
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

// Store the token in localStorage for future requests
    if (response.token) {
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
    return fetchApi(`/public/v1/event/${id}`, {
        method: "GET",
    });
};

// Fetch Events (with pagination if needed)
export const getEvents = ({ page = 1, limit = 10 } = {}) => {
    const queryParams = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
    });
    return fetchApi(`/events/public?${queryParams.toString()}`, {
        method: "GET",
    });
};

// Example of more functions to add
// export const updateEvent = (id, eventData) => { /* ... */ };
// export const deleteEvent = (id) => { /* ... */ };