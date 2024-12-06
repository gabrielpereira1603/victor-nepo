"use client";

import React, { useEffect, useState } from "react";
import { useFilterContext } from "@/contexts/FilterContext";
import style from "@/app/filter/filter.module.css";
import CardHouse from "@/app/components/cardHouse/cardHouse";
import FilterForm from "@/app/components/forms/filterForms/filterForm";
import SearchIconComponent from "@/app/components/icons/SearchIconComponent";
import { Property } from "@/app/models/Property";

export default function Filter() {
    const { filterData } = useFilterContext();
    const [properties, setProperties] = useState<Property[]>([]);


    useEffect(() => {
        if (filterData?.properties) {
            setProperties(filterData.properties); // Atualiza a lista de propriedades com os dados do contexto
        }
    }, [filterData]);

    // Função para gerar o título com base nos filtros
    const generateTitle = () => {
        const { searchQuery, minValue, maxValue, bedrooms } = filterData?.requestData || {};
        let titleParts: string[] = [];

        if (searchQuery) titleParts.push(`Cidade: ${searchQuery}`);
        if (minValue) titleParts.push(`Valor Mínimo: R$ ${minValue}`);
        if (maxValue) titleParts.push(`Valor Máximo: R$ ${maxValue}`);
        if (bedrooms) titleParts.push(`Quartos: ${bedrooms}`);

        // Retorna os filtros aplicados no título
        return titleParts.join(" | ");
    };

    return (
        <section className={style.filterSection}>
            <div className={style.welcome}>
                <h2 className={style.title}>Resultado da Busca por Imóvel</h2>
                <p>Victor Hugo Nepomuceno Corretor de Imóveis - Costa Rica/MS e Região.</p>
            </div>
            <span className={style.spanContent}>
                <FilterForm />
                <div className={style.mainContent}>
                    <div className={style.titleContainer}>
                        <SearchIconComponent width="24" height="24" className={style.icon} />
                        {/* O título gerado com base nos filtros */}
                        <h2 className={style.title}>{generateTitle()}</h2>
                    </div>

                    <CardHouse properties={properties} />
                </div>
            </span>
        </section>
    );
}
