"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import HomeScreen from "@/app/components/homeScreen/homeScreen";
import LatestProperties from "@/app/components/latestProperties/latestProperties";
import { Alert } from "./models/Alert";

export default function Home() {
  const [alert, setAlert] = useState<Alert | null>(null); 
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function fetchAlert() {
      try {
        const response = await fetch(`https://victornepo.somosdevteam.com/api/alerts/all`);
        const data = await response.json();

        if (data.success && data.data.activeAlerts.length > 0) {
          setAlert(data.data.activeAlerts[0]);
          setShowModal(true);
        }
      } catch (error) {
        console.error("Erro ao buscar alertas:", error);
      }
    }

    fetchAlert();
  }, []);

  return (
    <main className="">
      <HomeScreen />
      <LatestProperties />

      {showModal && alert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
          <img
            src={alert.image_path}
            alt="Alerta Ativo"
            className="w-full max-w-md h-auto max-h-[50vh] object-contain rounded-lg mb-4 mx-auto"
          />
          <button
            className="w-full flex justify-center items-center px-4 py-2 bg-white dark:bg-gray-800 border border-red-300 dark:border-red-500 rounded-md font-semibold text-xs text-red-700 dark:text-red-500 uppercase tracking-widest shadow-sm hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 disabled:opacity-25 transition ease-in-out duration-150"
            onClick={() => setShowModal(false)}
          >
            &times; Fechar
          </button>

          </div>
        </div>
      )}
    </main>
  );
}
