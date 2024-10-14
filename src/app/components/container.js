import Card from "./card";
import Footer from "./footer";
import Tendina from "./tendinaHome";
import React, { useState, useEffect } from "react";
import { FiArrowDown } from "react-icons/fi";

export default function Container() {
  const [posts, setPosts] = useState([]);
  const [tags, setTags] = useState("HOME");
  const [visible, setVisible] = useState(true);
  const [dec, setDec] = useState(false);
  const [asc, setAsc] = useState(false);
  const [visiblePosts, setVisiblePosts] = useState(10);

  const taggleClick = () => {
    setVisible(!visible);
  };

  const handleTagChange = (newTag) => {
    setTags(newTag);
  };

  const handleLikeDec = () => {
    setDec(true);
    setAsc(false);
  };

  const handleLikeAsc = () => {
    setAsc(true);
    setDec(false);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      let url;
      if (!dec || !asc) {
        url = "http://localhost:8080/posts/card";
      }
      if (asc) {
        url = "http://localhost:8080/posts/likeCrescenti";
      }
      if (dec) {
        url = "http://localhost:8080/posts/likeDecrescenti";
      }

      const response = await fetch(url);
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, [dec, asc]);

  const handleLoadMore = () => {
    setVisiblePosts(visiblePosts + 10);
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
        <div className="grid grid-cols-1 justify-items-center md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          <p className="text-purple-400 text-6xl font-bold mb-10 md:mb-0">
            #{tags}
          </p>
          {posts.slice(0, visiblePosts).map((post) => (
            <Card key={post.id} cardId={post.id} />
          ))}
        </div>
        {visiblePosts < posts.length && (
          <div className="flex justify-center">
            <button
              onClick={handleLoadMore}
              className="mt-4 bg-purple-400 text-white p-6 rounded-lg"
            >
              <FiArrowDown />
            </button>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}
