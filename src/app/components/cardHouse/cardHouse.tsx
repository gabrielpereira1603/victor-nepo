"use client";

import { useEffect, useState } from "react";
import { Property } from "@/app/models/Property";
import style from "@/app/components/cardHouse/cardHouse.module.css";
import Image from "next/image";

export default function CardHouse() {
    const [properties, setProperties] = useState<Property[]>([]); // Definindo o tipo do estado

    useEffect(() => {
        // Fazendo a requisição para a API que retorna os imóveis
        fetch("https://victornepo.somosdevteam.com/api/properties/all") // Substitua pela URL correta da API
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log(data.data); // Adicione esta linha
                    setProperties(data.data); // Atualizando o estado com os dados da API
                }
            })
            .catch(error => console.error("Erro ao buscar propriedades:", error));
    }, []);

    return (
        <section className={style.cardHouse}>
            <div className={style.content}>
                {properties.map(property => (
                    <div key={property.id} className={style.cardMain}>
                        <div className={style.cardTitle}>
                            <Image
                                src={property.photo_url || '/default-image.jpg'}
                                alt={`Foto da propriedade ${property.id}`}
                                width={300}
                                height={200}
                            />
                        </div>
                        <div className={style.cardBody}>
                            <h2 className={style.title}><span>{property.neighborhood.name}</span> #{property.id}</h2>
                            <span className={style.id}>ID: #{property.id}</span>
                            <h2 className={style.cityState}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
                                </svg>
                                {property.city.name}, {property.state.name}
                            </h2>
                            <h2 className={style.neighborhood}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"/>
                                </svg>
                                Bairro: {property.neighborhood.name}
                            </h2>
                            <div className={style.boxValue}>
                                <h2><strong>{property.value}</strong></h2>
                            </div>
                        </div>

                        <div className={style.rooms}>
                            <ul className={style.list}>
                                <li className={style.itens}>
                                    <i></i>
                                    <p>Quartos: {property.bedrooms}</p>
                                </li>
                                <li className={style.itens}>
                                    <i></i>
                                    <p>Banheiros: {property.bathrooms}</p>
                                </li>
                                <li className={style.itens}>
                                    <i></i>
                                    <p>Salas de estar: {property.living_rooms}</p>
                                </li>
                                <li className={style.itens}>
                                    <i></i>
                                    <p>Cozinhas: {property.kitchens}</p>
                                </li>
                                <li className={style.itens}>
                                    <i></i>
                                    <p>Garagens: {property.parking_spaces}</p>
                                </li>
                                <li className={style.itens}>
                                    <i></i>
                                    <p>Piscinas: {property.pools}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
