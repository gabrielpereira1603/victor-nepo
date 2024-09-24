"use client";

import style from "@/app/components/latestProperties/latestProperties.module.css";
import Image from "next/image";
import CardHouse from "@/app/components/cardHouse/cardHouse";

export default function LatestProperties() {
    return (
        <section className={style.latestProperties}>
            <div className={style.content}>
                <div className={style.boxText}>
                    <h2 className={style.title}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.9}
                             stroke="currentColor" className="size-8">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205 3 1m1.5.5-1.5-.5M6.75 7.364V3h-3v18m3-13.636 10.5-3.819"/>
                        </svg>
                        Últimos <span>Imóveis</span>
                    </h2>
                    <h2 className={style.subtitle}>Disponibilizamos vários imóveis para sua escolha!</h2>
                </div>
                <CardHouse />
            </div>
        </section>
    );
}
