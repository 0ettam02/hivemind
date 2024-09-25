"use client";
import React, { useState } from "react";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';

export default function InsertPost() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const handleCheckboxChange = (tag) => {
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(tag)) {
        return prevSelectedTags.filter((t) => t !== tag);
      } else {
        return [...prevSelectedTags, tag];
      }
    });
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
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Scrivi qui la tua descrizione in Markdown..."
          ></textarea>
        </div>

        <h2 className="font-bold text-2xl mt-5">Anteprima</h2>
        <div className="mt-2 p-4 border border-black rounded bg-white text-black">
          <ReactMarkdown>{description}</ReactMarkdown>
        </div>

        {/*<h1 className="font-bold text-4xl mt-10">
          Tag<a className="text-red-700">*</a>
        </h1>

        <div className="flex flex-col bg-white mt-5 mb-10 text-black rounded-xl pr-6 border-2 border-black max-h-20 overflow-y-auto">
          <p>TECH<input type="checkbox" onChange={() => handleCheckboxChange("TECH")}></input></p>
          <p>ECONOMIA<input type="checkbox" onChange={() => handleCheckboxChange("ECONOMIA")}></input></p>
          <p>BIOLOGIA<input type="checkbox" onChange={() => handleCheckboxChange("BIOLOGIA")}></input></p>
          <p>VIDEOGAME<input type="checkbox" onChange={() => handleCheckboxChange("VIDEOGAME")}></input></p>
          <p>INFORMATICA<input type="checkbox" onChange={() => handleCheckboxChange("INFORMATICA")}></input></p>
        </div>*/}
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