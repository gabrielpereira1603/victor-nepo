"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import style from "@/app/properties/properties.module.css";
import PropertiesCarousel from "@/app/components/carousel/propertiesCarousel/propertiesCarousel";
import { Property } from "@/app/models/Property"; // Modelo da propriedade
import api from "@/services/api";
import FilterForm from "@/app/components/forms/filterForms/filterForm";
import ShareComponent from "@/app/components/icons/ShareComponent";

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
                    console.log(response)
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
            <div className={style.container}>
                <FilterForm />
                
                <div className={style.propetieDetails}>

                    <span className={style.headerInfo}>
                        <h1>
                            Descrição do Imóvel
                            <ShareComponent width={20} height={20} className="text-black-500" />
                        </h1>

                        <div className={style.divider} />

                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore eos qui, maxime nemo omnis nam neque eius, nobis nihil exercitationem recusandae voluptate! Aliquid iure tempore magnam omnis maxime perspiciatis molestiae?
                    </span>


                    <span className={style.address}>
                        <h1>Endereço</h1>

                        <div className={style.divider} />

                        <ul>
                            <li>
                                Bairro:
                            </li>

                            <li>
                                Cidade:
                            </li>

                            <li>
                                Estado:
                            </li>
                        </ul>
                    </span>


                    <span className={style.adicionalInfo}>
                        <h1>Informações Adicionais</h1>
                        <div className={style.divider} />

                    </span>


                    <span className={style.locationPropetie}>
                        <h1>Localização do Imóvel</h1>

                        <div className={style.divider} />
                    </span>
                </div>
            </div>
        </section>
    );
}
