// src/app/filter/Filter.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useFilterContext } from "@/contexts/FilterContext";
import style from "@/app/filter/filter.module.css";
import CardHouse from "@/app/components/cardHouse/cardHouse";
import FilterForm from "@/app/components/forms/filterForms/filterForm";
import {Property} from "@/app/models/Property";

export default function Filter() {
    const { filterData } = useFilterContext(); // Usando o contexto
    const [properties, setProperties] = useState<Property[]>([]);

    useEffect(() => {
        if (filterData) {
            setProperties(filterData.properties);
        }
    }, [filterData]);

    return (
        <section className={style.filterSection}>
            <FilterForm/>

            <div className={style.mainContent}>
                <h2 className={style.title}>Resultados da Busca</h2>
                <CardHouse properties={properties}/>
            </div>
        </section>
    );
}
