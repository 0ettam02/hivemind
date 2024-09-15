"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleAuthAction = () => {
    if (isAuthenticated) {
      localStorage.removeItem("token");
      setIsAuthenticated(false);
      router.push('/login'); 
    } else {
      router.push('/login'); 
    }
  };

  return (
    <div className="grid grid-cols-2 place-items-center gap-10 text-white bg-gradient-to-r from-purple-400 to-green-200 md:gap-0">
      <Link
        className="font-bold text-4xl md:ml-5 md:justify-self-start"
        href="/"
      >
        HiveMind
      </Link>
      <button
        onClick={handleAuthAction}
        className="justify-self-end mr-5 font-bold bg-purple-400 rounded-lg border-2 border-white p-1"
      >
        {isAuthenticated ? "Logout" : "Login"}
      </button>
    </div>
  );
}
