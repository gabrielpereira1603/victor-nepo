"use client";

import React from "react";
import style from "@/app/components/forms/inputs/communSelect/communSelect.module.css";

interface CommunSelectProps {
    label?: string;
    name?: string;
    value: string | number;
    onChange: (value: string | number) => void;
    options: { value: string | number; label: string }[];
    icon?: React.ReactNode; // Adicionamos a propriedade de ícone
}

const CommunSelect: React.FC<CommunSelectProps> = ({ label, name, value, onChange, options, icon }) => {
    return (
        <div className={`${style.inputWrapper} relative`}>
            {label && (
                <label htmlFor={name} className={`${style.label} mb-2 text-sm font-medium text-gray-900 dark:text-gray mt-2 ml-1`}>
                    {icon && <div className={`left-3 top-3`}>{icon}</div>}
                    {label}
                </label>
            )}
            <div className="relative">
                {/* Renderiza o ícone, se fornecido */}

                <select
                    id={name}
                    name={name}
                    value={value}
                    onChange={(e) => {
                        const selectedValue = e.target.value;
                        if (selectedValue === "") {
                            onChange("");
                        } else if (!isNaN(Number(selectedValue))) {
                            onChange(Number(selectedValue));
                        } else {
                            onChange(selectedValue);
                        }
                    }}
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-${icon ? '10' : '3'} p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                >
                    <option value="">Selecione</option>
                    {options.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default CommunSelect;
