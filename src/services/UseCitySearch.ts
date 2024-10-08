import { useState, useEffect } from 'react';
import { fetchCities } from '@/services/City/CityService';
import { City } from '@/app/models/City';

export function UseCitySearch() {
    const [cities, setCities] = useState<City[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);

    useEffect(() => {
        if (searchQuery) {
            fetchCities(searchQuery)
                .then(setCities)
                .catch((error) => {
                    console.error("Erro ao definir cidades:", error);
                });
        }
    }, [searchQuery]);

    return {
        cities,
        setCities,
        searchQuery,
        setSearchQuery,
        errorMessage,
        setErrorMessage,
        showError,
        setShowError
    };
}