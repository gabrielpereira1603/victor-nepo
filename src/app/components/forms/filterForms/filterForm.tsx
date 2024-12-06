import React, { useEffect, useState } from "react";
import CommunInput from "@/app/components/forms/inputs/communInput/communInput";
import style from '@/app/components/forms/filterForms/filterForms.module.css';
import { fetchCities } from "@/services/City/CityService";
import api from "@/services/api";
import Swal from "sweetalert2";
import { City } from "@/app/models/City";
import { useFilterContext } from "@/contexts/FilterContext";
import { useRouter } from "next/navigation";
import LoadingIconComponent from "@/app/components/icons/LoadingIconComponent";
import { IoMdSearch } from "react-icons/io";
import CommunSelect from "../inputs/communSelect/communSelect";
import MaxValueComponent from "../../icons/MaxValueComponent";
import MinValueComponent from "../../icons/MinValueComponent";
import HouseComponent from "../../icons/HouseComponent";
import RoomComponent from "../../icons/RoomComponent";
import ClearComponent from "../../icons/ClearComponent";
import SearchComponent from "../../icons/SearchComponent";

export default function FilterForm() {
    const { filterData, setFilterData } = useFilterContext();
    const [cidade, setCidade] = useState<string>(filterData?.requestData?.searchQuery || "");
    const [minValue, setMinValue] = useState<string | number>(filterData?.requestData?.minValue || "");
    const [maxValue, setMaxValue] = useState<string | number>(filterData?.requestData?.maxValue || "");
    const [bedrooms, setBedrooms] = useState<string | number>(filterData?.requestData?.bedrooms || "");
    const [cities, setCities] = useState<City[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>(filterData?.requestData?.cidade || "");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    // Atualiza as cidades com base na busca
    useEffect(() => {
        if (searchQuery) {
            fetchCities(searchQuery)
                .then(setCities)
                .catch((error) => {
                    console.error("Erro ao definir cidades:", error);
                });
        } else {
            setCities([]);
        }
    }, [searchQuery]);

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!cidade && !minValue && !maxValue && !bedrooms) {
            setErrorMessage("Por favor, preencha pelo menos um campo.");
            setShowError(true);
            return;
        }

        setShowError(false);
        setLoading(true);

        const requestData: any = {
            cidade,
            minValue,
            maxValue,
            bedrooms: bedrooms !== "" ? bedrooms : undefined,
        };

        try {
            const response = await api.post('/properties/search', requestData);
            const properties = response.data;
            // Atualiza o contexto com os dados
            const updatedFilterData = { requestData, properties };
            setFilterData(updatedFilterData); // Aqui está a atualização do contexto com as propriedades

            if (properties.length === 0) {
                await Swal.fire({
                    title: 'Nenhum imóvel encontrado!',
                    text: 'Tente ajustar os filtros e buscar novamente.',
                    icon: 'warning',
                    confirmButtonText: 'OK',
                });
            } else {
                router.push('/filter'); // Redireciona para a página de filtro
            }
        } catch (error) {
            console.error("Erro ao buscar propriedades:", error);
            setErrorMessage("Ocorreu um erro ao buscar as propriedades.");
            setShowError(true);
        } finally {
            setLoading(false);
        }
    };

    // Função para limpar os filtros e recuperar todas as propriedades
    const clearFilters = async () => {
        setCidade("");
        setMinValue("");
        setMaxValue("");
        setBedrooms("");
        setSearchQuery("");
        setCities([]);

        setLoading(true);

        try {
            // Fazer uma nova requisição sem filtros para recuperar todas as propriedades
            const response = await api.get('/properties/all'); // Supondo que '/properties' seja a rota para recuperar todas as propriedades
            const properties = response.data;
            // Atualiza o contexto com os dados
            const updatedFilterData = { properties };
            setFilterData(updatedFilterData); // Aqui está a atualização do contexto com as propriedades


            // Após limpar os filtros, redirecionar para a página de filtro
            router.push('/filter');   
        } catch (error) {
            console.error("Erro ao recuperar todas as propriedades:", error);
            setErrorMessage("Ocorreu um erro ao recuperar as propriedades.");
            setShowError(true);
        } finally {
            setLoading(false);
        }
    };

    // Verifica se há algum filtro aplicado
    const isFilterApplied = cidade || minValue || maxValue || bedrooms;

    return (
        <div className="flex">
            <form className="filterForm" id={style.filterForm} onSubmit={handleSearch}>
                <h2 className="flex text-black text-lg font-semibold gap-1" id={style.title}>
                    Encontre seu
                    <span className={style.spanTitle}>Imóvel</span>
                </h2>

                <div className={style.divider} />
                <span className={style.inputs}>
                    <CommunInput
                        label="Cidade"
                        type="text"
                        placeholder="Digite a cidade"
                        value={cidade}
                        autoComplete="off"
                        onChange={(value) => {
                            if (typeof value === "string") {
                                setCidade(value);
                                setSearchQuery(value);
                            }
                        }}
                        suggestions={cities.map(city => city.name)}
                        icon={<HouseComponent width={20} height={20} className="text-black-500" />}
                        onSelectSuggestion={(suggestion) => {
                            setCidade(suggestion);
                            setSearchQuery("");
                            setCities([]); 
                        }}
                    />

                    <CommunInput
                        label="Valor Máximo"
                        type="number"
                        placeholder="Valor Máximo"
                        formatOptions={{
                            thousandSeparator: true,
                            prefix: 'R$ ',
                            decimalScale: 2,
                            fixedDecimalScale: true,
                        }}
                        value={maxValue}
                        onChange={(value) => {
                            if (typeof value === "number" || value === "") {
                                setMaxValue(value);
                            }
                        }}
                        icon={<MaxValueComponent width={20} height={20} className="text-black-500" />}
                    />

                    <CommunInput
                        label="Valor Mínimo"
                        type="number"
                        value={minValue}
                        onChange={(value) => {
                            if (typeof value === "number" || value === "") {
                                setMinValue(value);
                            }
                        }}
                        placeholder="Valor Mínimo"
                        icon={<MinValueComponent width={20} height={20} className="text-black-500" />}
                        formatOptions={{
                            thousandSeparator: true,
                            prefix: 'R$ ',
                            decimalScale: 2,
                            fixedDecimalScale: true,
                        }}
                    />

                    <CommunSelect
                        label="Quantidade de Quartos"
                        name="quartos"
                        value={bedrooms}
                        icon={<RoomComponent width={20} height={20} className="text-black-500" />}
                        onChange={(value) => setBedrooms(value)}
                        options={[
                            { value: 1, label: "1 Quarto" },
                            { value: 2, label: "2 Quartos" },
                            { value: 3, label: "3 Quartos" },
                            { value: 4, label: "4 Quartos" },
                            { value: "5+", label: "5+ Quartos" }
                        ]}
                    />

                    <button type="submit" className="w-full flex-shrink-0 flex items-center justify-center bg-green-600 text-white py-2 rounded-md shadow-sm hover:bg-green-700 transition-all mt-4 gap-1" disabled={loading}>
                        {loading ? (
                            <>
                                <LoadingIconComponent height={24} width={2} className="mr-2" style={{ fill: '#ffffff' }} />
                                Carregando...
                            </>
                        ) : (
                            <>
                                <SearchComponent height={16} width={16} className="" style={{ fill: '#ffffff' }} />
                                Buscar
                            </>
                        )}
                    </button>

                    <button 
                        type="button" 
                        className="w-full flex-shrink-0 flex items-center justify-center bg-yellow-500 text-white py-2 rounded-md shadow-sm hover:bg-yellow-700 transition-all gap-1" 
                        disabled={!isFilterApplied} 
                        onClick={clearFilters}
                    >
                        <ClearComponent height={16} width={16} className="" style={{ fill: '#ffffff' }} />
                        Limpar Filtro
                    </button>
                </span>
              
            </form>
        </div>
    );
}
