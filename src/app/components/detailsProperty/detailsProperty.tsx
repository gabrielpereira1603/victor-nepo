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
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60110.62072092734!2d-51.223764680317686!3d-19.673682831444797!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9499658c3248de25%3A0x82925c667f225d56!2sParana%C3%ADba%2C%20MS%2C%2079500-000!5e0!3m2!1spt-BR!2sbr!4v1735934539449!5m2!1spt-BR!2sbr"
                    width="380"
                    height="380"
                    style={{ border: 0 }} // Corrigido para usar um objeto
                    allowFullScreen={true} // Corrigido para React
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </span>

        </div>
      );
}