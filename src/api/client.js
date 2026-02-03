import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const fetchCatalog = async () => {
    try {
        const response = await api.get(`/${import.meta.env.VITE_CATALOG_ENDPOINT}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch catalog", error);
        throw error;
    }
};

// Fallback or additional API calls if needed
export const fetchProductById = async (id) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
};
