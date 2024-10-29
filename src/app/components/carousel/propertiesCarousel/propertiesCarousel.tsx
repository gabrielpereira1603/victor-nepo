"use client";

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "@/app/components/carousel/propertiesCarousel/propertiesCaroousel.module.css";

interface PropertiesCarouselProps {
  images: string[];
}

export default function PropertiesCarousel({ images }: PropertiesCarouselProps) {
  const settings = {
    customPaging: function (i: number) {
      return (
        <a>
          <img
            src={images[i] || "/default-thumbnail.jpg"} // Usa a imagem correspondente ou um thumbnail padrão
            alt={`Thumbnail da imagem ${i + 1}`}
            className={style.customThumbnail}
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className={style.carouselContainer}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Imagem da propriedade ${index + 1}`}
              className={style.carouselImage}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
