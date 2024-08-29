"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';

export default function Idea() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verifica se l'utente è autenticato
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleClick = () => {
    if (isAuthenticated) {
      router.push("/post"); 
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="text-white font-bold text-6xl bg-gradient-to-r from-purple-400 to-green-200 h-screen mt">
      <div className="grid grid-rows-2 place-items-center md:place-items-start md:max-w-[10em] md:ml-20">
        <h1 className="mt-20 md:mt-20">Do you have an idea?</h1>
        <div>
          <p className="text-4xl md:mt-5">Start from here</p>
        </div>
        <button
          onClick={handleClick}
          className="bg-purple-400 text-white rounded-lg p-6 border-2 hover:animate-bounce hover:bg-white hover:text-purple-400 hover:border-purple-400 duration-500"
        >
          +
        </button>
        <img
          className="w-[5em] h-[5em] opacity-0 image-width-normal image-height-normal md:absolute md:opacity-100 your-image-class-normalMonitor your-image-class-bigMonitor"
          src="/persone.png"
          alt="Person"
        />
      </div>
    </div>
  );
}
