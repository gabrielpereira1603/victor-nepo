import api from "@/services/api";
import Swal from 'sweetalert2';

export const searchProperties = async ({ searchQuery, minValue, maxValue, bedrooms }: {
    searchQuery: string,
    minValue: string,
    maxValue: string,
    bedrooms: string
}) => {
    try {
        const response = await api.post('/properties/search', {
            cidade: searchQuery || null,
            minValue: minValue || null,
            maxValue: maxValue || null,
            quartos: bedrooms || null,
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar propriedades:", error);
        throw error;
    }
};
