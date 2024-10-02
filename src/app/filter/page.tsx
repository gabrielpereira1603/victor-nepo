// src/app/filter/Filter.tsx

"use client";

import React, { useEffect, useState } from "react";
import { useFilterContext } from "@/contexts/FilterContext";
import style from "@/app/filter/filter.module.css";
import CardHouse from "@/app/components/cardHouse/cardHouse";
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
            <h2 className={style.title}>Resultados da Busca</h2>
            <CardHouse properties={properties} />
        </section>
    );
}
