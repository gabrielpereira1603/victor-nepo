import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";

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
  images: string[];
}

export default function PropertiesCarousel({ images }: PropertiesCarouselProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);

  const houseDetails = [
    { icon: <MdOutlineBedroomParent />, text: "01 Quarto" },
    { icon: <IoTvSharp />, text: "01 Sala" },
    { icon: <MdOutlineBathroom />, text: "01 Banheiro" },
    { icon: <TbToolsKitchen3 />, text: "01 Cozinha" },
    { icon: <MdOutlineGarage />, text: "01 Vaga na Garagem" },
    { icon: <PiSwimmingPool />, text: "01 Piscina" },
  ];

  return (
    <div className={style.carouselContainer}>
      <div className={style.carouselMain}>
        {/* Informações sobre a propriedade */}
        <div className={style.infoHouse}>
          <span className={style.type}><p>Venda</p></span>
          <div className={style.address}>
            <p className={style.addressIten}>Bairro Jarim Europa II</p>
            <p className={style.addressIten}>Costa Rica, Mato Grosso do Sul</p>
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
            <h1>R$ 270.000,00</h1>
          </div>
        </div>

        {/* Carrossel principal com Swiper */}
          <Swiper
           style={{
            'margin': '0px', // Defina a cor das setas, caso necessário
          }}
            spaceBetween={10}
            navigation={false}
            thumbs={{ swiper: thumbsSwiper }}
            modules={[FreeMode, Navigation, Thumbs]}
            className={`${style.mainCarousel} mySwiper2`}
          >
            {images.map((image, index) => (
              <SwiperSlide key={index}>
                <img src={image} alt={`Imagem ${index}`} className={style.mainImage} />
              </SwiperSlide>
            ))}
          </Swiper>
      </div>
      <div className={style.thumbCarousel}>
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}  // Habilita o loop para as imagens voltarem ao início
          spaceBetween={8}  // Espaçamento controlado entre as miniaturas
          slidesPerView={4}  // Exibe 4 miniaturas por vez
          freeMode={true}  // Permite que o carrossel se mova livremente
          watchSlidesProgress={true}  // Observa o progresso das slides para controle
          modules={[FreeMode, Navigation, Thumbs]}
          className={`${style.thumbSwiper} mySwiper`}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img src={image} alt={`Thumbnail ${index}`} className={style.thumbnailImage} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
