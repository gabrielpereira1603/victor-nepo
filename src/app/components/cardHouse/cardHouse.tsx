"use client";

import { useEffect, useState } from "react";
import { Property } from "@/app/models/Property";
import style from "@/app/components/cardHouse/cardHouse.module.css";
import Image from "next/image";

export default function CardHouse() {
    const [properties, setProperties] = useState<Property[]>([]); // Definindo o tipo do estado

    useEffect(() => {
        // Fazendo a requisição para a API que retorna os imóveis
        fetch("http://victornepo.somosdevteam.com/api/properties/all") // Substitua pela URL correta da API
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
                            <span className={style.id}>ID: {property.id}</span>
                            <h2 className={style.cityState}>
                                {property.city.name}, {property.state.name}
                            </h2>
                            <h2 className={style.neighborhood}>
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
