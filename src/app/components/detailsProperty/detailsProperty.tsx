import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import Image from "next/image"; 
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import style from "@/app/components/detailsProperty/detailsProperty.module.css";
import ShareComponent from "../icons/ShareComponent";


interface PropertiesCarouselProps {
    property: {
      images: { image_url: string }[];
      value: string;
      neighborhood: { name: string };
      city: { name: string };
      state: { name: string };
      bedrooms: number;
      bathrooms: number;
      kitchens: number;
      living_rooms: number;
      parking_spaces: number;
      pools: number;
      description: string;
      maps: string;
    };
  }

  
export default function DetailsProperty({ property }: PropertiesCarouselProps) {
    return (
        <div className={style.propetieDetails}>
            <span className={style.headerInfo}>
                <h1>
                    Descrição do Imóvel
                    <ShareComponent width={20} height={20} className="text-black-500"/>
                </h1>

                <div className={style.divider} />

                {property.description ? property.description : "Descrição ainda não cadastrada. Entre em contato para mais informações."}
            </span>

            <span className={style.address}>
                <h1>Endereço</h1>

                <div className={style.divider} />

                <ul>
                    <li>
                        Bairro: {property.neighborhood.name}
                    </li>

                    <li>
                        Cidade: {property.city.name}
                    </li>

                    <li>
                        Estado: {property.state.name}
                    </li>
                </ul>
            </span>

            <span className={style.adicionalInfo}>
                <h1>Informações Adicionais</h1>
                <div className={style.divider} />
                <ul>
                    <li>
                        Operação: Venda
                    </li>

                    <li>
                        Tipo: Casas
                    </li>

                    <li>
                        Preço:  R$ {parseFloat(property.value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                    </li>

                    <li>
                        Quartos: {property.bedrooms}
                    </li>

                    <li>
                        Banheiros: {property.bathrooms}
                    </li>

                    <li>
                        Carro(s) na garagem: {property.parking_spaces}
                    </li>
                </ul>
            </span>

            <span className={style.locationPropetie}>
                <h1>Localização do Imóvel</h1>

                <div className={style.divider} />

                <iframe 
                    src={property.maps}
                    width="380"
                    height="380"
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </span>

        </div>
      );
}