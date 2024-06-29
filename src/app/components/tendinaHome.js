// Tendina.js
import React from "react";

export default function Tendina({ onTagChange, changeVisible }) {
  const tags = [
    { label: "TECH", value: "TECH" },
    { label: "ECONOMIA", value: "ECONOMIA" },
    { label: "BIOLOGIA", value: "BIOLOGIA" },
    { label: "VIDEOGAME", value: "VIDEOGAME" },
    { label: "INFORMATICA", value: "INFORMATICA" },
  ];

  return (
    <div className="flex flex-col items-center text-purple-400 md:items-start">
      <p className="text-lg">Ordina per</p>
      <div className="flex flex-col border-2 border-purple-400 max-w-60 overflow-y-auto max-h-8 rounded-l">
      <p>LIKE CRESCENTE <input type="checkbox"></input></p>
      <p>LIKE DECRESCENTE <input type="checkbox"></input></p>
        <form>
          {tags.map((tag) => (
            <p key={tag.value}>
              {tag.label} <input type="checkbox" onChange={() => onTagChange(tag.value)} onClick={changeVisible}/>
            </p>
          ))}
        </form>
      </div>
    </div>
  );
}