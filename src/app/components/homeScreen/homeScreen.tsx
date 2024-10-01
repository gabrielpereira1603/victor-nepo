"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Usamos para redirecionar o usuário
import style from "@/app/components/homeScreen/homeScreen.module.css";
import BackgroundPhoto from "./images/background.webp";
import { City } from "@/app/models/City";
import { fetchCities } from "@/services/City/CityService";
import { NumericFormat } from 'react-number-format';

export default function HomeScreen() {
    const [cities, setCities] = useState<City[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [minValue, setMinValue] = useState<string>("");
    const [maxValue, setMaxValue] = useState<string>("");
    const [bedrooms, setBedrooms] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState<string>("");
    const [showError, setShowError] = useState<boolean>(false);

    const router = useRouter(); // Hook para redirecionamento

    useEffect(() => {
        if (searchQuery) {
            fetchCities(searchQuery)
                .then(setCities)
                .catch((error) => {
                    console.error("Erro ao definir cidades:", error);
                });
        }
    }, [searchQuery]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!searchQuery && !minValue && !maxValue && !bedrooms) {
            setErrorMessage("Por favor, preencha pelo menos um campo para buscar.");
            setShowError(true);
            setTimeout(() => {
                setShowError(false);
            }, 3000);
            return;
        }

        const formattedMinValue = minValue ? parseFloat(minValue).toString() : "";
        const formattedMaxValue = maxValue ? parseFloat(maxValue).toString() : "";

        // Redireciona o usuário para a rota de filtros
        router.push({
            pathname: "/filter",
            query: {
                cidade: searchQuery,
                minValue: formattedMinValue,
                maxValue: formattedMaxValue,
                quartos: bedrooms
            }
        });
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

                    <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
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
                                <label htmlFor="quartos" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">
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
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.773zm0 0L8.25 8.25M8.25 15.75l6.75 6.75M6.75 6.75l10.5 10.5"/>
                                </svg>
                                Buscar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
}
