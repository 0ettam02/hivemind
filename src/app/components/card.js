import React, { useState, useEffect, useRef } from "react";
import Commenti from "./commenti";
import { Button } from "@nextui-org/button";
import { FiThumbsUp, FiThumbsDown } from "react-icons/fi";
import { MdOutlineInsertComment, MdOutlineCommentsDisabled } from "react-icons/md";
import ReactMarkdown from 'react-markdown';

export default function Card({ cardId }) {
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const [posts, setPosts] = useState({});
  const [showDescription, setShowDescription] = useState(false);
  const [visible, setVisible] = useState(false);
  const [commenti, setCommenti] = useState([]);
  const [showLike, setShowLike] = useState(0);
  const [showDislike, setShowDislike] = useState(0); 
  const cardRef = useRef(null);

  useEffect(() => {
    fetch(`http://localhost:8080/posts/whitepage/${cardId}`)
      .then((response) => response.json())
      .then((data) => {
        setPosts(data[0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [cardId]);

  useEffect(() => {
    const fetchLike = async () => {
      const response = await fetch(
        `http://localhost:8080/posts/showLike/${cardId}`
      );
      const data = await response.json();
      setShowLike(data.mipiace);
    };
    fetchLike();
  }, [cardId, like]);

  useEffect(() => {
    const fetchDislike = async () => {
      const response = await fetch(
        `http://localhost:8080/posts/showDislike/${cardId}`
      );
      const data = await response.json();
      setShowDislike(data.nonmipiace); 
    };
    fetchDislike();
  }, [cardId, dislike]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`http://localhost:8080/posts/reqComment/${cardId}`);
      const data = await response.json();
      if (Array.isArray(data)) {
        setCommenti(data.map((commento) => commento.testo));
      } else {
        setCommenti([data.commento]);
      }
    };
    fetchComments();
  }, [cardId]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          } else {
            entry.target.classList.remove("active");
          }
        });
      },
      { threshold: 0.5 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const handleButtonLike = async () => {
    try {
      const token = localStorage.getItem('token');
      if(!token) return null;
      const response = await fetch(
        `http://localhost:8080/posts/like/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `${token}`
          },
          body: JSON.stringify({
            postId : cardId
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setLike(like + 1);
      setActiveButton("like");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleButtonDislike = async () => {
    try {
      const token = localStorage.getItem('token');
      if(!token) return null;
      const response = await fetch(
        `http://localhost:8080/posts/dislike/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `${token}`
          },
          body: JSON.stringify({
            postId : cardId
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setDislike(dislike + 1);
      setActiveButton("dislike");
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const toggleDescription = () => {
    setShowDescription(!showDescription);
  };

  const handleVisible = () => {
    setVisible(!visible);
  };

  const handleCommentAdded = (newComment) => {
    setCommenti([...commenti, newComment]);
  };

  return (
    <div className="mx-auto">
      <div ref={cardRef} className="fade-in">
        <div className="grid md:grid-cols-1">
          {!visible ? (
            <button
              id="Card"
              onClick={toggleDescription}
              className={`flex justify-center font-bold rounded-xl bg-gradient-to-r from-purple-400 to-green-200 text-white border-2 border-purple-400 w-80 h-80 overflow-y-auto overflow-x-auto duration-300 md:w-[28em] md:h-[28em] focus:animate-rotate-y ${
                showDescription ? "" : "items-center"
              }`}
            >
              <div className="w-60 break-words">
                <h2>{showDescription ? <ReactMarkdown>{posts.descrizione}</ReactMarkdown> : posts.title}</h2>
              </div>
            </button>
          ) : (
            <Commenti cardId={cardId} commenti={commenti} CommentAdded={handleCommentAdded} />
          )}
        </div>

        <div className="mt-2">
          <Button
            isIconOnly
            color="danger"
            aria-label="Like"
            className="text-purple-400"
            onClick={handleButtonLike}
          >
            <FiThumbsUp />
            {showLike}
          </Button>

          <Button
            isIconOnly
            color="danger"
            aria-label="DisLike"
            className="text-purple-400"
            onClick={handleButtonDislike}
          >
            <FiThumbsDown />
            {showDislike}
          </Button>

          <Button
            isIconOnly
            color="danger"
            aria-label="Comment"
            className="text-purple-400"
            onClick={handleVisible}
          >
            {visible ? <MdOutlineCommentsDisabled /> : <MdOutlineInsertComment />}
            {commenti.length}
          </Button>
        </div>
      </div>
    </div>
  );
}