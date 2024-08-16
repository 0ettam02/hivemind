import React from "react";

export default function Tendina({ onTagChange, changeVisible, likeDec, likeAsc }) {

  return (
    <div className="flex flex-col items-center text-purple-400 md:items-start">
      <p className="text-lg">Ordina per</p>
      <div className="flex flex-col border-2 border-purple-400 max-w-60 overflow-y-auto max-h-8 rounded-l">
      <p>LIKE DECRESCENTE <input type="checkbox" onClick={likeDec}></input></p>
      <p>LIKE CRESCENTE <input type="checkbox" onClick={likeAsc}></input></p>
      </div>
    </div>
  );
}