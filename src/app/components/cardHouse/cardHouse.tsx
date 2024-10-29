"use client";

import { Property } from "@/app/models/Property";
import style from "@/app/components/cardHouse/cardHouse.module.css";
import Image from "next/image";
import { MdOutlineBedroomParent, MdOutlineBathroom, MdOutlineGarage } from "react-icons/md";
import { IoTvSharp } from "react-icons/io5";
import { TbToolsKitchen3 } from "react-icons/tb";
import { PiSwimmingPool } from "react-icons/pi";
import { useRouter } from "next/navigation";
import EyesIconComponent from "@/app/components/icons/EyesIconCompoonent";

interface CardHouseProps {
    properties: Property[];
}

export default function CardHouse({ properties }: CardHouseProps) {
    const router = useRouter();

    const formatCurrency = ({ value }: { value: any }) => {
        const numberValue = parseFloat(value);
        if (isNaN(numberValue)) return 'R$ 0,00';

        return numberValue.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
    };

    return (
        <section className={style.cardHouse}>
            <div className={style.content}>
                {properties.map(property => (
                    <div
                        key={property.id}
                        className={`${style.cardMain} cursor-pointer`}
                        onClick={() => router.push(`/properties/${property.id}`)} // Redireciona para a página da propriedade ao clicar
                    >
                        <div className={style.cardTitle}>
                            <Image
                                src={property.photo_url || '/default-image.jpg'}
                                alt={`Foto da propriedade ${property.id}`}
                                width={300}
                                height={200}
                                className={style.cardImage}
                            />
                            <div className={style.overlay}>
                                <EyesIconComponent height={32} width={32} />
                                <span className={style.viewMore}>Ver mais</span>
                            </div>
                        </div>
                        <div className={style.cardBody}>
                            <a href="" className={style.title}><span>{property.neighborhood.name}</span></a>
                            <span className={style.id}>ID: #{property.id}</span>
                            <h2 className={style.cityState}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"/>
                                </svg>
                                {property.city.name}, {property.state.name}
                            </h2>
                            <h2 className={style.neighborhood}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M9 6.75V15m6-6v8.25m.503 3.498 4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 0 0-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0Z"/>
                                </svg>
                                Bairro: {property.neighborhood.name}
                            </h2>
                            <div className={style.boxValue}>
                                <h2><strong>{formatCurrency({value: property.value})}</strong></h2>
                            </div>
                        </div>

                        <div className={style.rooms}>
                            <ul className={style.list}>
                                <li className={style.itens}>
                                    <MdOutlineBedroomParent/>
                                    <p>{property.bedrooms}</p>
                                </li>
                                <div className={style.divider}/>
                                <li className={style.itens}>
                                    <MdOutlineBathroom/>
                                    <p>{property.bathrooms}</p>
                                </li>
                                <div className={style.divider}/>
                                <li className={style.itens}>
                                    <IoTvSharp/>
                                    <p>{property.living_rooms}</p>
                                </li>
                                <div className={style.divider}/>
                                <li className={style.itens}>
                                    <TbToolsKitchen3 />
                                    <p>{property.kitchens}</p>
                                </li>
                                <div className={style.divider}/>
                                <li className={style.itens}>
                                    <MdOutlineGarage />
                                    <p>{property.parking_spaces}</p>
                                </li>
                                <div className={style.divider}/>
                                <li className={style.itens}>
                                    <PiSwimmingPool />
                                    <p>{property.pools}</p>
                                </li>
                            </ul>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
