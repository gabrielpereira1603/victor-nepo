"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import style from "@/app/properties/properties.module.css";
import PropertiesCarousel from "@/app/components/carousel/propertiesCarousel/propertiesCarousel";
import { Property } from "@/app/models/Property"; // Defina esse modelo com os campos que você espera da API
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
                    const response = await fetch(`http://127.0.0.1:8000/api/properties/${id}`); // Ajuste a URL de acordo com sua API
                    if (!response.ok) {
                        throw new Error("Erro ao buscar dados");
                    }
                    const data: Property = await response.json();
                    console.log(data);

                    setProperty(data); 
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

    const imageUrls = property.images.map((image: { image_url: string }) => image.image_url);


    return (
        <section className={style.propertiesSection}>
          <PropertiesCarousel property={property} />
          <div className="details-property"></div>
        </section>
      );
}
