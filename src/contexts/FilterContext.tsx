"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

interface FilterContextType {
    filterData: any;
    setFilterData: (data: any) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

const EXPIRATION_TIME = 15 * 60 * 1000;

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [filterData, setFilterData] = useState<any>(null);

    // Carrega os dados do localStorage e verifica a validade
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const savedData = localStorage.getItem('filterData');
            const savedTimestamp = localStorage.getItem('filterTimestamp');

            if (savedData && savedTimestamp) {
                const currentTime = new Date().getTime();
                const storedTime = parseInt(savedTimestamp, 10);
                console.log("Dados salvos no localStorage:", savedData);
                console.log("Timestamp salvo no localStorage:", savedTimestamp);
                // Verifica se os dados expiraram
                if (currentTime - storedTime < EXPIRATION_TIME) {
                    setFilterData(JSON.parse(savedData));
                } else {
                    // Se expirado, remove os dados
                    localStorage.removeItem('filterData');
                    localStorage.removeItem('filterTimestamp');
                }
            }
        }
    }, []);

    // Armazena os dados e a timestamp no localStorage quando os dados mudarem
    useEffect(() => {
        if (typeof window !== 'undefined') {
            if (filterData) {
                const currentTime = new Date().getTime();
                localStorage.setItem('filterData', JSON.stringify(filterData));
                localStorage.setItem('filterTimestamp', currentTime.toString());
            } else {
                localStorage.removeItem('filterData');
                localStorage.removeItem('filterTimestamp');
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
