"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

// Interface para os dados do filtro
interface FilterData {
    requestData?: {
        searchQuery?: string;
        cidade?: string; 
        minValue?: string;
        maxValue?: string;
        bedrooms?: string;
    };
    properties: Array<any>;
}

// Tipagem do contexto
interface FilterContextType {
    filterData: FilterData | null;
    setFilterData: (data: FilterData | any) => void;
}

// Criando o contexto
const FilterContext = createContext<FilterContextType | undefined>(undefined);

const EXPIRATION_TIME = 15 * 60 * 1000; // 15 minutos

export const FilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [filterData, setFilterData] = useState<FilterData | null>(null);

    // Função utilitária para carregar dados do localStorage
    const loadFilterDataFromLocalStorage = (): FilterData | null => {
        try {
            const savedData = localStorage.getItem("filterData");
            const savedTimestamp = localStorage.getItem("filterTimestamp");

            if (savedData && savedTimestamp) {
                const currentTime = new Date().getTime();
                const storedTime = parseInt(savedTimestamp, 10);

                // Verifica se os dados expiraram
                if (currentTime - storedTime < EXPIRATION_TIME) {
                    return JSON.parse(savedData) as FilterData;
                } else {
                    // Remove dados expirados
                    localStorage.removeItem("filterData");
                    localStorage.removeItem("filterTimestamp");
                }
            }
        } catch (error) {
            console.error("Erro ao carregar dados do localStorage:", error);
        }
        return null;
    };

    // Função utilitária para salvar dados no localStorage
    const saveFilterDataToLocalStorage = (data: FilterData | null) => {
        try {
            if (data) {
                const currentTime = new Date().getTime();
                localStorage.setItem("filterData", JSON.stringify(data));
                localStorage.setItem("filterTimestamp", currentTime.toString());
            } else {
                localStorage.removeItem("filterData");
                localStorage.removeItem("filterTimestamp");
            }
        } catch (error) {
            console.error("Erro ao salvar dados no localStorage:", error);
        }
    };

    // Carregar dados ao montar o componente
    useEffect(() => {
        if (typeof window !== "undefined") {
            const loadedData = loadFilterDataFromLocalStorage();
            if (loadedData) {
                setFilterData(loadedData);
            }
        }
    }, []);

    // Salvar dados no localStorage sempre que filterData mudar
    useEffect(() => {
        if (typeof window !== "undefined") {
            saveFilterDataToLocalStorage(filterData);
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
        throw new Error("useFilterContext deve ser usado dentro de um FilterProvider");
    }
    return context;
};
