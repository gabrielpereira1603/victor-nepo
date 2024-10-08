"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import style from "@/app/components/homeScreen/homeScreen.module.css";
import BackgroundPhoto from "./images/background.webp";
import { searchProperties } from "@/services/FilterService";
import { NumericFormat } from 'react-number-format';
import {useFilterContext} from "@/contexts/FilterContext";
import {UseCitySearch} from "@/services/UseCitySearch";
import { IoMdSearch } from "react-icons/io";
import api from "@/services/api";

export default function HomeScreen() {
    const { cities, setCities, searchQuery, setSearchQuery, errorMessage, setErrorMessage, showError, setShowError } = UseCitySearch();
    const [minValue, setMinValue] = useState<string>("");
    const [maxValue, setMaxValue] = useState<string>("");
    const [bedrooms, setBedrooms] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

    const { setFilterData } = useFilterContext();
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        searchProperties(searchQuery, minValue, maxValue, bedrooms, setFilterData, setLoading, setErrorMessage, setShowError, router);
    };

    return (
        <section
            className={style.homeScreen}
            style={{
                backgroundImage: `url(${BackgroundPhoto.src})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                height: "56vh",
                width: "100%",
            }}
        >
            <div className={style.content}>
                <div className={style.formContent}>
                    <h2 className={style.title}>
                        Encontre <span>seu imóvel</span>
                    </h2>

                    {showError && errorMessage && (
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 transition-opacity duration-300 opacity-100">
                            <strong className="font-bold">Atenção!</strong>
                            <span className="block sm:inline"> {errorMessage}</span>
                        </div>
                    )}

                    <form className="flex flex-col gap-4" onSubmit={handleSearch}>
                        <div className="relative w-full">
                            <label htmlFor="cidade" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">
                                Cidade
                            </label>
                            <input
                                type="text"
                                id="cidade"
                                name="cidade"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder="Digite a cidade"
                                autoComplete="off"
                            />
                            {cities.length > 0 && (
                                <ul className="absolute z-10 bg-white border border-gray-300 mt-1 rounded-md shadow-lg w-full">
                                    {cities.map((city) => (
                                        <li
                                            key={city.id}
                                            className="cursor-pointer hover:bg-gray-200 p-2"
                                            onClick={() => {
                                                setSearchQuery(city.name);
                                                setCities([]);
                                            }}
                                        >
                                            {city.name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <div className="flex gap-4">
                            <div className="w-full">
                                <label htmlFor="valorMin" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">
                                    Valor Mínimo
                                </label>
                                <NumericFormat
                                    id="valorMin"
                                    name="valorMin"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Valor Mínimo"
                                    thousandSeparator={true}
                                    prefix={'R$ '}
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    onValueChange={(values) => {
                                        const { floatValue } = values;
                                        setMinValue(floatValue ? floatValue.toString() : "");
                                    }}
                                />
                            </div>

                            <div className="w-full">
                                <label htmlFor="valorMax" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">
                                    Valor Máximo
                                </label>
                                <NumericFormat
                                    id="valorMax"
                                    name="valorMax"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Valor Máximo"
                                    thousandSeparator={true}
                                    prefix={'R$ '}
                                    decimalScale={2}
                                    fixedDecimalScale={true}
                                    onValueChange={(values) => {
                                        const { floatValue } = values;
                                        setMaxValue(floatValue ? floatValue.toString() : "");
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-4 md:flex-row">
                            <div className="w-full md:w-3/4">
                                <label htmlFor="quartos"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">
                                    Quantidade de Quartos
                                </label>
                                <select
                                    id="quartos"
                                    name="quartos"
                                    value={bedrooms}
                                    onChange={(e) => setBedrooms(e.target.value)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-white dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                >
                                    <option value="">Selecione</option>
                                    <option value="1">1 Quarto</option>
                                    <option value="2">2 Quartos</option>
                                    <option value="3">3 Quartos</option>
                                    <option value="4">4 Quartos</option>
                                    <option value="5+">5+ Quartos</option>
                                </select>
                            </div>

                            <button
                                type="submit"
                                className="w-full md:w-1/4 mt-3 md:mt-7 flex-shrink-0 flex items-center justify-center bg-green-600 text-white py-2 rounded-md shadow-sm hover:bg-green-700 transition-all"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <svg
                                            className="animate-spin w-5 h-5 mr-2"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                        >
                                            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.5"/>
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v8l4 4"/>
                                        </svg>
                                        Carregando...
                                    </>
                                ) : (
                                    <>
                                        <IoMdSearch/>
                                        Buscar
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
