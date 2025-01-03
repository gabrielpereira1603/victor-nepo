"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import style from "@/app/properties/properties.module.css";
import PropertiesCarousel from "@/app/components/carousel/propertiesCarousel/propertiesCarousel";
import { Property } from "@/app/models/Property"; // Modelo da propriedade
import api from "@/services/api";

export default function PropertyDetails() {
    const { id } = useParams(); // Pega o ID da propriedade da URL
    const [property, setProperty] = useState<Property | null>(null); // Estado para armazenar os dados da propriedade
    const [loading, setLoading] = useState<boolean>(true); // Estado de carregamento

    useEffect(() => {
        if (id) {
            const fetchProperty = async () => {
                try {
                    setLoading(true);
                    const response = await api.get(`/properties/${id}`); // Usando o Axios configurado
                    setProperty(response.data); // Configura os dados no estado
                } catch (error) {
                    console.error("Erro ao buscar dados:", error);
                } finally {
                    setLoading(false);
                }
            };

            fetchProperty();
        }
    }, [id]);

    if (loading) {
        return <div>Carregando...</div>;
    }

    if (!property) {
        return <div>Propriedade não encontrada.</div>;
    }

    // Obtem as URLs das imagens para passar ao carrossel
    const imageUrls = property.images.map((image: { image_url: string }) => image.image_url);

    return (
        <section className={style.propertiesSection}>
            {/* Passa a propriedade completa para o carrossel */}
            <PropertiesCarousel property={property} />
            <div className="details-property"></div>
        </section>
    );
}
