import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import api from "@/services/api";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

import style from "@/app/components/carousel/propertiesCarousel/propertiesCarousel.module.css";
import { MdOutlineBathroom, MdOutlineBedroomParent, MdOutlineGarage } from "react-icons/md";
import { IoTvSharp } from "react-icons/io5";
import { PiSwimmingPool } from "react-icons/pi";
import { TbToolsKitchen3 } from "react-icons/tb";

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
  };
}

export default function PropertiesCarousel({ property }: PropertiesCarouselProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const houseDetails = [
    { icon: <MdOutlineBedroomParent />, text: `${property.bedrooms} Quartos` },
    { icon: <IoTvSharp />, text: `${property.living_rooms} Salas` },
    { icon: <MdOutlineBathroom />, text: `${property.bathrooms} Banheiros` },
    { icon: <TbToolsKitchen3 />, text: `${property.kitchens} Cozinhas` },
    { icon: <MdOutlineGarage />, text: `${property.parking_spaces} Vagas na Garagem` },
    { icon: <PiSwimmingPool />, text: `${property.pools} Piscinas` },
  ];

  const imageUrls = property.images.map((image) => image.image_url);

  return (
    <div className={style.carouselContainer}>
      <div className={style.carouselMain}>

        <div className={style.infoHouse}>
          <span className={style.type}>
            <p>Venda</p>
          </span>

          <div className={style.address}>
            <p className={style.addressIten}>{property.neighborhood.name}</p>
            <p className={style.addressIten}>
              {property.city.name}, {property.state.name}
            </p>
          </div>

          <div className={style.divider} />
            <div className={style.description}>
              <ul className={style.descriptionList}>
                {houseDetails.map((item, index) => (
                  <li key={index}>
                    <i>{item.icon}</i>
                    <p>{item.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          <div className={style.divider} />
          <div className={style.value}>
            <h1>R$ {parseFloat(property.value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}</h1>
          </div>
        </div>

        {/* Carrossel principal com Swiper */}
        <Swiper
          spaceBetween={10}
          navigation={false}
          thumbs={{ swiper: thumbsSwiper }}
          modules={[FreeMode, Navigation, Thumbs]}
          className={`${style.mainCarousel} mySwiper2`}
        >
          {imageUrls.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`Imagem ${index}`} className={style.mainImage} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
      <div className={style.thumbCarousel}>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={8}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className={`${style.thumbSwiper} mySwiper`}
        >
          {imageUrls.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`Thumbnail ${index}`} className={style.thumbnailImage} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

