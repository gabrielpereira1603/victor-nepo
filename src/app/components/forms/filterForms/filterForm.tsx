"use client";

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

export default function FilterForm() {
    const { setFilterData } = useFilterContext();
    const [cidade, setCidade] = useState<string>("");
    const [minValue, setMinValue] = useState<number | "">("");
    const [maxValue, setMaxValue] = useState<number | "">("");
    const [bedrooms, setBedrooms] = useState<string | number>(""); // Ajustando o tipo para string | number
    const [cities, setCities] = useState<City[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('filterData') || '{}');
        if (storedData && storedData.requestData) {
            setCidade(storedData.requestData.cidade || "");
            setMinValue(storedData.requestData.minValue || "");
            setMaxValue(storedData.requestData.maxValue || "");
            setBedrooms(storedData.requestData.bedrooms || "");
            setSearchQuery(storedData.requestData.cidade || "");
        }
    }, []);

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

        const requestData: any = {};
        if (cidade) requestData.cidade = cidade;
        if (minValue) requestData.minValue = minValue;
        if (maxValue) requestData.maxValue = maxValue;
        if (bedrooms !== "") requestData.bedrooms = bedrooms;

        try {
            const response = await api.post('/properties/search', requestData);
            const properties = response.data;

            const updatedFilterData = { requestData, properties };

            setFilterData(updatedFilterData);
            console.log('filterForm: ' + JSON.stringify(updatedFilterData));
            localStorage.setItem('filterData', JSON.stringify(updatedFilterData));

            if (properties.length === 0) {
                await Swal.fire({
                    title: 'Nenhum imóvel encontrado!',
                    text: 'Tente ajustar os filtros e buscar novamente.',
                    icon: 'warning',
                    confirmButtonText: 'OK',
                });
            } else {
                router.push('/filter');
            }
        } catch (error) {
            console.error("Erro ao buscar propriedades:", error);
            setErrorMessage("Ocorreu um erro ao buscar as propriedades.");
            setShowError(true);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex">
            <form className="filterForm" id={style.filterForm} onSubmit={handleSearch}>
                <h2 className="flex text-black text-lg font-semibold gap-1" id={style.title}>
                    Encontre seu
                    <span className={style.spanTitle}>Imóvel</span>
                </h2>

                <div className={style.divider} />

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
                    onSelectSuggestion={(suggestion) => {
                        setCidade(suggestion);
                        setSearchQuery("");
                        setCities([]); 
                    }}
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
                    onChange={(value) => setBedrooms(value)}
                    options={[
                        { value: 1, label: "1 Quarto" },
                        { value: 2, label: "2 Quartos" },
                        { value: 3, label: "3 Quartos" },
                        { value: 4, label: "4 Quartos" },
                        { value: "5+", label: "5+ Quartos" }
                    ]}
                />

                <button type="submit" className="w-full flex-shrink-0 flex items-center justify-center bg-green-600 text-white py-2 rounded-md shadow-sm hover:bg-green-700 transition-all mt-4" disabled={loading}>
                    {loading ? (
                        <>
                            <LoadingIconComponent height={20} width={20} className="mr-2" style={{ fill: '#ffffff' }} />
                            Carregando...
                        </>
                    ) : (
                        <>
                            <IoMdSearch />
                            Buscar
                        </>
                    )}
                </button>
            </form>
        </div>
    );
}
