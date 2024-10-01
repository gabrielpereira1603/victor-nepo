import api from '@/services/api';
import { City } from "@/app/models/City";

export const fetchCities = async (query: string): Promise<City[]> => {
    try {
        if (query.length <= 2) {
            return [];
        }
        const response = await api.get(`/cities/search?query=${query}`);

        if (response.status === 200) {
            return response.data;
        } else {
            console.error(`Erro ao buscar cidades. Status da resposta: ${response.status}`);
            return [];
        }
    } catch (error: unknown) {
        if (isAxiosError(error)) {
            if (error.response) {
                console.error(
                    `Erro na resposta da API ao buscar cidades: ${error.response.status} - ${error.message}`
                );
            } else if (error.request) {
                console.error("Nenhuma resposta da API. Verifique sua conexão ou o servidor.");
            } else {
                console.error("Erro ao configurar a requisição:", error.message);
            }
        } else {
            console.error("Erro inesperado ao buscar cidades:", (error as Error).message);
        }
        return [];
    }
};

function isAxiosError(error: unknown): error is import('axios').AxiosError {
    return (error as import('axios').AxiosError).isAxiosError !== undefined;
}
