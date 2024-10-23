"use client";

import React from "react";
import style from "@/app/components/forms/inputs/communInput/communInput.module.css";

interface CommunSelectProps {
    label?: string;
    name?: string;
    value: string | number;
    onChange: (value: string | number) => void;
    options: { value: string | number; label: string }[];
}

const CommunSelect: React.FC<CommunSelectProps> = ({ label, name, value, onChange, options }) => {
    return (
        <div className={`${style.inputWrapper}`}>
            {label && (
                <label htmlFor={name} className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray mt-2">
                    {label}
                </label>
            )}
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
                <option value="">Selecione</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default CommunSelect;
