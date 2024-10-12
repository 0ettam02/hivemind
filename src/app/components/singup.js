import React, { useState } from "react";
import { Button } from "@nextui-org/button";

export default function Registrazione() {
  const [username, setUserame] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");

  const handleButtonClick = async () => {
    try {
      const response = await fetch("http://localhost:8080/posts/registrazione", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
          nome: nome,
          cognome: cognome,
          email: email
        }),
      });
      const newPost = await response.json();
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col justify-center w-full max-w-md p-6 rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Create an Account
        </h2>
        <p className="mt-2 text-center text-gray-600">
          Enter your info below to create an account
        </p>
        <form className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                id="nome"
                name="nome"
                type="name"
                className="block w-full px-4 py-2 mt-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your name"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Surname
              </label>
              <input
                id="cognome"
                name="cognome"
                type="surname"
                className="block w-full px-4 py-2 mt-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your surname"
                value={cognome}
                onChange={(e) => setCognome(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="username"
                className="block w-full px-4 py-2 mt-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUserame(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                className="block w-full px-4 py-2 mt-2 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
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
          <Button className="w-full py-2 mt-5 text-white bg-gradient-to-r from-purple-400 to-green-200 rounded-lg hover:bg-red-500" onClick={handleButtonClick}>
            SignUp
          </Button>
        </form>
      </div>
    </div>
  );
}
