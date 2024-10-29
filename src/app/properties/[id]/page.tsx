"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import style from "@/app/properties/properties.module.css";
import PropertiesCarousel from "@/app/components/carousel/propertiesCarousel/propertiesCarousel";
import { Property } from "@/app/models/Property";

export default function PropertyDetails() {
    const params = useParams();
    const id = params.id; 
    console.log(id)
    const [property, setProperty] = useState<Property | null>(null);

    useEffect(() => {
        if (id) {
            const fetchProperty = async () => {
                try {
                    const response = await fetch(`https://victornepo.somosdevteam.com/api/properties/one/${id}`);
                    const data = await response.json();
                    setProperty(data.data);
                } catch (error) {
                    console.error("Erro ao buscar propriedade:", error);
                }
            };

            fetchProperty();
        }
    }, [id]);

    if (!property) {
        return <div>Carregando...</div>;
    }

    return (
        <section className={style.propertiesSection}>
            <h1>Detalhes da Propriedade {property.id}</h1>
            {/* Renderizar o carrossel com as imagens */}
            <PropertiesCarousel images={[property.photo_url]} />
            <div>
                <p>Valor: {property.value}</p>
                <p>Quartos: {property.bedrooms}</p>
                <p>Banheiros: {property.bathrooms}</p>
                {/* Renderizar outros campos relevantes */}
            </div>
        </section>
    );
}
