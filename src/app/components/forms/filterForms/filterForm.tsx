"use client";

import CommunInput from "@/app/components/forms/inputs/communInput/communInput";
import React, { useEffect, useState } from "react";
import style from '@/app/components/forms/filterForms/filterForms.module.css';
import { fetchCities } from "@/services/City/CityService";
import api from "@/services/api";
import Swal from "sweetalert2";
import { City } from "@/app/models/City";
import { useFilterContext } from "@/contexts/FilterContext";
import { useRouter } from "next/navigation";

export default function FilterForm() {
    const { filterData, setFilterData } = useFilterContext();
    const [cidade, setCidade] = useState("");
    const [minValue, setMinValue] = useState("");
    const [maxValue, setMaxValue] = useState("");
    const [bedrooms, setBedrooms] = useState("");
    const [cities, setCities] = useState<City[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('filterData') || '{}');
        if (storedData) {
            setCidade(storedData.cidade || "");
            setMinValue(storedData.minValue || "");
            setMaxValue(storedData.maxValue || "");
            setBedrooms(storedData.quartos || "");
        }
    }, []);

    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem('filterData') || '{}');
        if (storedData) {
            setCidade(storedData.cidade || "");
            setMinValue(storedData.minValue || "");
            setMaxValue(storedData.maxValue || "");
            setBedrooms(storedData.quartos || "");
        }
    }, []);

    useEffect(() => {
        if (searchQuery) {
            fetchCities(searchQuery)
                .then(setCities)
                .catch((error) => {
                    console.error("Erro ao definir cidades:", error);
                });
        }
    }, [searchQuery]);


    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();

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

            localStorage.setItem('filterData', JSON.stringify(requestData));

            if (properties.length === 0) {
                await Swal.fire({
                    title: 'Nenhum imóvel encontrado!',
                    text: 'Tente ajustar os filtros e buscar novamente.',
                    icon: 'warning',
                    confirmButtonText: 'OK',
                });
                return;
            }

            console.log(properties);
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

    return (
        <div className="flex">
            <form className="filterForm" id={style.filterForm} onSubmit={handleSearch}>
                <h2 className="flex text-lg font-semibold gap-1" id={style.title}>
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
                    onChange={(e) => setCidade(e.target.value)}
                />

                <CommunInput
                    label="Valor Mínimo"
                    type="number"
                    value={minValue}
                    onChange={(value) => setMinValue(value)}
                    placeholder="Valor Mínimo"
                    formatOptions={{
                        thousandSeparator: true,
                        prefix: 'R$ ',
                        decimalScale: 2,
                        fixedDecimalScale: true,
                    }}
                />

                <CommunInput
                    label="Valor Máximo"
                    type="number"
                    value={maxValue}
                    onChange={(value) => setMaxValue(value)}
                    placeholder="Valor Máximo"
                    formatOptions={{
                        thousandSeparator: true,
                        prefix: 'R$ ',
                        decimalScale: 2,
                        fixedDecimalScale: true,
                    }}
                />

                <CommunInput
                    label="Quartos"
                    type="number"
                    placeholder="Quartos"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                />
                <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md shadow-sm hover:bg-green-700 transition-all mt-4" disabled={loading}>
                    {loading ? "Carregando..." : "Buscar"}
                </button>
            </form>
        </div>
    );
}
