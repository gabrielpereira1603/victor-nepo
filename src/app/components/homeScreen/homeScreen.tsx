"use client";

import style from "@/app/components/homeScreen/homeScreen.module.css";
import BackgroundPhoto from "./images/background.webp";
import Image from "next/image";

export default function HomeScreen() {
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
                    <form className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <div className="w-full">
                                <label htmlFor="bairro"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">
                                    Bairro
                                </label>
                                <input
                                    type="text"
                                    id="bairro"
                                    name="bairro"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Digite o bairro"
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="cidade"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">
                                    Cidade
                                </label>
                                <input
                                    type="text"
                                    id="cidade"
                                    name="cidade"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Digite a cidade"
                                />
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="w-full">
                                <label htmlFor="valorMin"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">
                                    Valor Mínimo
                                </label>
                                <input
                                    type="number"
                                    id="valorMin"
                                    name="valorMin"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Valor Mínimo"
                                />
                            </div>
                            <div className="w-full">
                                <label htmlFor="valorMax"
                                       className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray">
                                    Valor Máximo
                                </label>
                                <input
                                    type="number"
                                    id="valorMax"
                                    name="valorMax"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Valor Máximo"
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
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
                                          d="m15.75 15.75-2.489-2.489m0 0a3.375 3.375 0 1 0-4.773-4.773 3.375 3.375 0 0 0 4.774 4.774ZM21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
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
