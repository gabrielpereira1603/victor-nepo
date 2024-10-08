"use client"
import React from 'react';

export const BodyNightMode = ({ children }: { children: React.ReactNode }) => {
    const [isNightMode, setIsNightMode] = React.useState(false);

    React.useEffect(() => {
        const hour = new Date().getHours();
        const nightStart = 18; // 18:00
        const nightEnd = 6; // 06:00
        if (hour >= nightStart || hour < nightEnd) {
            setIsNightMode(true);
        } else {
            setIsNightMode(false);
        }
    }, []);

    return (
        <div className={isNightMode ? 'bg-[#575757] text-white' : 'bg-[#f3f3f9] text-black'}>
            {children}
        </div>
    );
};
