"use client";
import Card from "./card";
import Footer from "./footer";
import Tendina from "./tendinaHome";
import React, { useState, useEffect } from "react";

export default function Container() {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState("HOME");
  const [visible, setVisible] = useState(true);
  const [dec, setDec] = useState(false);
  const [asc, setAsc] = useState(false);

  const taggleClick = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      let url;
      if (!dec || !asc) {
        url = "http://localhost:8080/posts/card";
      }if (asc) {
        url = "http://localhost:8080/posts/likeCrescenti";
      }if (dec) {
        url = "http://localhost:8080/posts/likeDecrescenti";
      }

      console.log(url);
      const response = await fetch(url);
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, [dec, asc]);

  useEffect(() => {
    if (visible) {
      setTags("HOME");
    }
  });

  const handleTagChange = (tag) => {
    setTags(tag);
  };

  const handleLikeDec = () => {
    setDec(!dec);
    setAsc(false);
  };

  const handleLikeAsc = () => {
    setAsc(!asc);
    setDec(false);
  };

  return (
    <>
      <div className="mt-10 md:ml-10">
        {visible ? (
          <Tendina
            onTagChange={handleTagChange}
            changeVisible={taggleClick}
            likeDec={handleLikeDec}
            likeAsc={handleLikeAsc}
          />
        ) : (
          <Tendina onTagChange={handleTagChange} changeVisible={taggleClick} />
        )}
      </div>
      <div className="text-wrap mx-auto rounded-xl md:rounded-[4em] md:mt-20">
        <div className="grid grid-cols-1 justify-items-center justify-space-between mt-10 md:grid-cols-3">
          <p className="text-purple-400 text-6xl font-bold mb-10 md:mb-0">
            #{tags}
          </p>
          {posts.map((post) => (
            <Card key={post.id} cardId={post.id} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
