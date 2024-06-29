"use client";
import Card from "./card";
import Footer from "./footer";
import Tendina from "./tendinaHome";
import React, { useState, useEffect } from "react";

export default function Container() {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState("HOME");
  const [visible, setVisible] = useState(true);

  const taggleClick = () => {
    setVisible(!visible);
  };

  useEffect(() => {
    fetch("http://localhost:8080/posts/card")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  useEffect(() => {
    if (visible) {
      setTags("HOME");
    }
  });

  const handleTagChange = (tag) => {
    setTags(tag);
  };

  return (
    <>
      <div className="mt-10 md:ml-10">
        {visible ? (
          <Tendina onTagChange={handleTagChange} changeVisible={taggleClick} />
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