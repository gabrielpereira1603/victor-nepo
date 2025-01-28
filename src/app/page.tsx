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
        const response = await fetch(`http://localhost:8000/api/alerts/all`);
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
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-lg w-full">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-center">Alerta Ativo</h2>
            <img
              src={alert.image_path} 
              alt="Alerta Ativo"
              className="w-full h-64 object-cover rounded-lg mb-4"
            />
          </div>
        </div>
      )}
    </main>
  );
}
