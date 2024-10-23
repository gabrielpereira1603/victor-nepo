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
        if (filterData && filterData.properties) {
            setProperties(filterData.properties);
        } else {
            setProperties([]);
        }
    }, [filterData]);
    console.log(properties)


    return (
        <section className={style.filterSection}>
            <FilterForm />

            <div className={style.mainContent}>
                <div className={style.titleContainer}>
                    <SearchIconComponent width="24" height="24" className={style.icon} />
                    <h2 className={style.title}>Resultados da Busca</h2>
                </div>
                <div className={style.divider} />

                <CardHouse properties={properties} />
            </div>
        </section>
    );
}
