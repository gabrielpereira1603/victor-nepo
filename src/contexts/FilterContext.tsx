"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface FilterContextType {
    filterData: any;
    setFilterData: (data: any) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [filterData, setFilterData] = useState<any>(null);

    // Esse useEffect garante que o código só rodará no lado do cliente
    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Tenta obter os dados do localStorage na inicialização
            const savedFilterData = localStorage.getItem('filterData');
            setFilterData(savedFilterData ? JSON.parse(savedFilterData) : null);
        }
    }, []);

    // Armazena os dados no localStorage sempre que eles mudam
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (filterData) {
                localStorage.setItem('filterData', JSON.stringify(filterData));
            } else {
                localStorage.removeItem('filterData');
            }
        }
    }, [filterData]);

    return (
        <FilterContext.Provider value={{ filterData, setFilterData }}>
            {children}
        </FilterContext.Provider>
    );
};

export const useFilterContext = () => {
    const context = useContext(FilterContext);
    if (context === undefined) {
        throw new Error('useFilterContext deve ser usado dentro de um FilterProvider');
    }
    return context;
};
