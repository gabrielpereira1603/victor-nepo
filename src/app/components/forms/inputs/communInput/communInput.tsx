"use client";

import React from "react";
import style from "@/app/components/forms/inputs/communInput/communInput.module.css";
import Image from "next/image";
import { NumericFormat } from 'react-number-format';

interface CommunInputProps {
    label?: string;
    type?: string;
    placeholder?: string;
    value: string | number;
    onChange: (value: string | number) => void;
    autoComplete?: string;
    icon?: string;
    formatOptions?: object;
}

const CommunInput: React.FC<CommunInputProps> = ({ label, type = "text", placeholder, value, onChange, autoComplete, icon, formatOptions }) => (
    <div className={style.inputWrapper}>
        {label && (
            <label htmlFor={label} className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray mt-2">
                {label}
            </label>
        )}
        {icon && <Image src={icon} alt="input icon" className={style.inputIcon} />}

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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-green-600 focus:border-green-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
        )}
    </div>
);

export default CommunInput;
