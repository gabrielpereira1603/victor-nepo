import api from "@/services/api";
import Swal from 'sweetalert2';

export const searchProperties = async (searchQuery: string, minValue: string, maxValue: string, bedrooms: string, setFilterData: any, setLoading: any, setErrorMessage: any, setShowError: any, router: any) => {
    if (!searchQuery && !minValue && !maxValue && !bedrooms) {
        setErrorMessage("Por favor, preencha pelo menos um campo.");
        setShowError(true);
        return;
    }

    setShowError(false);
    setLoading(true);

    const requestData = {
        cidade: searchQuery,
        minValue: minValue || null,
        maxValue: maxValue || null,
        quartos: bedrooms || null,
    };

    try {
        const response = await api.post('/properties/search', requestData);
        const properties = response.data;

        if (properties.length === 0) {
            await Swal.fire({
                title: 'Nenhum imóvel encontrado!',
                text: 'Tente ajustar os filtros e buscar novamente.',
                icon: 'warning',
                confirmButtonText: 'OK',
            });
            return;
        }

        setFilterData({ requestData, properties });
        router.push('/filter');

    } catch (error) {
        console.error("Erro ao buscar propriedades:", error);
        setErrorMessage("Ocorreu um erro ao buscar as propriedades.");
        setShowError(true);
    } finally {
        setLoading(false);
    }
};
