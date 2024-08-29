"use client";
import React, { useEffect, useState } from "react";

export default function WhitePage({ cardId, onClick }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/posts/whitepage/${cardId}`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [cardId]);

  return (
    <>
      <div
        id="container_whitePage"
        className="inset-0 bg-white text-black rounded-xl border-2 border-[#EA4335] md:min-h-screen md:absolute"
      >
        <div className="flex flex-col items-center">
          <h1 id="titolo" className="font-bold text-4xl">
            <div className="text-black">
              {posts.map((post) => (
                <div key={post.id}>
                  <h2>{post.title}</h2>
                </div>
              ))}
            </div>
          </h1>
        </div>

        <p className="mt-5 break-words">
          <div className="text-black">
            {posts.map((post) => (
              <div key={post.id}>
                <h2>{post.descrizione}</h2>
              </div>
            ))}
          </div>
        </p>
        <button
          className="bg-[#EA4335] text-white p-2 absolute top-4 right-4 rounded-lg font-bold hover:bg-white hover:text-[#EA4335] hover:border-2 hover:border-[#EA4335] hover:scale-125 hover:duration-300"
          onClick={onClick}
        >
          X
        </button>
      </div>
    </>
  );
}
