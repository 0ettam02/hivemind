"use client"
import React, { useState } from "react";
import { Button } from "@nextui-org/button";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function SingIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter(); 

  const handleLoginClick = async () => {
    try {
      const response = await fetch("http://localhost:8080/posts/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        setError("Invalid username or password");
        return;
      }

      const data = await response.json();
      localStorage.setItem("token", data.token);
      setError("");
      router.push('/'); 
    } catch (error) {
      console.error(error);
      setError("An error occurred during login");
    }
  };

  return (
    <>
      <div className="flex items-center h-screen text-black rounded-lg shadow-md p-6">
        <div className="flex justify-center rounded-[4em] md:rounded-[9em]">
          <div className="max-w-[24em] text-center">
            <p className="text-2xl font-bold">Welcome Back</p>
            <p>Enter your email and password below to SignIn</p>
            <form>
              <div className="text-black">
                <div className="space-y-6">
                  <div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      className="block w-full px-4 py-2 mt-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="block w-full px-4 py-2 mt-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </form>
            {error && <p className="text-red-500">{error}</p>}
            <Button className="mt-5 w-full p-2 rounded-lg bg-gradient-to-r from-green-200 to-purple-400 text-white border border-white hover:bg-[#EA4335] hover:text-white duration-500" onClick={handleLoginClick}>
              Sign In
            </Button>
            <div className="flex items-center justify-center mt-10 mb-10">
              <div className="border-t border-black w-full" />
              <div className="px-4 font-medium">OR CONTINUE WITH</div>
              <div className="border-t border-black w-full" />
            </div>
            <Button className="w-full p-2 rounded-lg border border-gray-300 hover:bg-black hover:text-white duration-500">
              GitHub
            </Button>
            <Button className="mt-5 w-full p-2 rounded-lg border border-gray-300 hover:bg-red-600 hover:text-white duration-500">
              Google
            </Button>
            <Button className="mt-5 w-full p-2 rounded-lg border border-gray-300 hover:bg-blue-500 hover:text-white duration-500">
              Facebook
            </Button>
            <p className="mt-5">
              If you don't have an account yet, create a new one
              <strong>
                <Link href={"/registrazione"}> here.</Link>
              </strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}