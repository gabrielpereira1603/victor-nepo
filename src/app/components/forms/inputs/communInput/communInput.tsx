"use client";

import React from "react";
import style from "@/app/components/forms/inputs/communInput/communInput.module.css";
import { NumericFormat } from 'react-number-format';

interface CommunInputProps {
    label?: string;
    type?: string;
    placeholder?: string;
    value: string | number;
    onChange: (value: string | number) => void;
    autoComplete?: string;
    icon?: React.ReactNode; // Alterado para aceitar componentes React
    formatOptions?: object;
    suggestions?: string[];
    onSelectSuggestion?: (suggestion: string) => void;
}

const CommunInput: React.FC<CommunInputProps> = ({
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    autoComplete,
    icon,
    formatOptions,
    suggestions = [],
    onSelectSuggestion
}) => (
    <div className={`${style.inputWrapper} relative`}>
        {label && (
            <label htmlFor={label} className={`${style.label} text-sm font-medium text-gray-900 dark:text-gray mt-2 ml-1`}>
                {icon && <div className={`${style.inputIcon} left-2 top-3`}>{icon}</div>}
                
                {label}
            </label>
        )}


        {type === "number" && formatOptions ? (
            <NumericFormat
                {...formatOptions}
                value={value}
                onValueChange={(values) => {
                    if (values && values.floatValue !== undefined) {
                        onChange(values.floatValue);
                    } else {
                        onChange("");
                    }
                }}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeholder}
            />
        ) : (
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={(e) => {
                    const newValue = type === "number" ? (e.target.value ? parseInt(e.target.value) : "") : e.target.value;
                    onChange(newValue);
                }}
                autoComplete={autoComplete}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
        )}
        {/* Renderiza as sugestões, se houver */}
        {suggestions.length > 0 && (
            <ul className="absolute z-10 bg-white text-black border border-gray-300 mt-1 rounded-md shadow-lg w-full">
                {suggestions.map((suggestion, index) => (
                    <li
                        key={index}
                        className="cursor-pointer hover:bg-gray-200 p-2"
                        onClick={() => {
                            if (onSelectSuggestion) {
                                onSelectSuggestion(suggestion);
                            }
                        }}
                    >
                        {suggestion}
                    </li>
                ))}
            </ul>
        )}
    </div>
);

export default CommunInput;
