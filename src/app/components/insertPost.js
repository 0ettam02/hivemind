"use client";
import React, { useState } from "react";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';

export default function InsertPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const handleDescriptionChange = (e) => {
    const value = e.target.value;
    if (value.length <= 400) {
      setDescription(value);
    }
  };

  const handleButtonClick = async () => {
    try {
      const token = localStorage.getItem('token');
      if(!token) return null;
      const response = await fetch("http://localhost:8080/posts/insertPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'Authorization': `${token}` 
        },
        body: JSON.stringify({
          descrizione: description,
          title: title,
          tag: selectedTags.join(","),
        }),
      });
      const newPost = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center bg-gradient-to-r from-purple-400 to-green-200 min-h-screen">
        <h1 className="font-bold text-4xl">
          Titolo<a className="text-red-700">*</a>
        </h1>

        <input
          type="text"
          className="text-black p-2 mt-5 border border-black border-2 rounded"
          placeholder="Paninari30"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>

        <h1 id="description" className="font-bold text-4xl mt-10 ">
          Contenuto post<a className="text-red-700">*</a>
        </h1>

        <div className="mt-5 text-black">
          <textarea
            className="text-black rounded border-black border-2"
            rows={10}
            cols={40}
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Scrivi qui la tua descrizione in Markdown..."
          ></textarea>
          <p className="mt-2 text-gray-600">
            Caratteri inseriti: {description.length} / 400
          </p>
        </div>

        <h2 className="font-bold text-2xl mt-5">Anteprima</h2>
        <div className="mt-2 p-4 border border-black rounded bg-white text-black max-w-full overflow-wrap break-words">
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>
      </div>

      <div className="flex justify-center bg-gradient-to-r from-purple-400 to-green-200">
        <Link
          href="/"
          className="bg-purple-400 hover:animate-bounce text-white rounded-lg p-6 border-2 hover:bg-white hover:text-purple-400 hover:border-purple-400 duration-500"
          onClick={handleButtonClick}
        >
          Posta ✓
        </Link>
      </div>
    </>
  );
}