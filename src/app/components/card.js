import React, { useState, useEffect, useRef } from "react";
import Commenti from "./commenti";
import { Button } from "@nextui-org/button";
import { FiThumbsUp } from "react-icons/fi";
import { FiThumbsDown } from "react-icons/fi";
import { MdOutlineInsertComment } from "react-icons/md";
import { MdOutlineCommentsDisabled } from "react-icons/md";

export default function Card({ cardId }) {
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);
  const [activeButton, setActiveButton] = useState(null);
  const [posts, setPosts] = useState({});
  const [showDescription, setShowDescription] = useState(false);
  const [visible, setVisible] = useState(false);
  const [commenti, setCommenti] = useState(0);
  const [showLike, setShowLike] = useState(0);
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
      setShowLike(data[0].mipiace);
    };
    fetchLike();
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

  // const handleButtonLike = async () => {
  //   console.log(`Invio richiesta PUT per l'ID: ${cardId}`);
  //   try {
  //     const response = await fetch(
  //       `http://localhost:8080/posts/like/${cardId}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           miPiace: activeButton === "like" ? 0 : 1,
  //           nonMiPiace: 0,
  //         }),
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();
  //     console.log("Success:", data);

  //     if (activeButton === "like") {
  //       setLike(0);
  //       setActiveButton(null);
  //     } else {
  //       setLike(1);
  //       setDislike(0);
  //       setActiveButton("like");
  //     }
  //   } catch (error) {
  //     console.error("There was a problem with the fetch operation:", error);
  //   }
  // };

  // const handleButtonLike = async () => {
  //   console.log(`Invio richiesta PUT per l'ID: ${cardId}`);
  //   try {
  //     const response = await fetch(
  //       `http://localhost:8080/posts/like/${cardId}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         }
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }

  //     const data = await response.json();
  //     console.log("Success:", data);

  //     if (activeButton === "like") {
  //       setLike(0);
  //       setActiveButton(null);
  //     } else {
  //       setLike(like + 1);
  //       setActiveButton("like");
  //     }
  //   } catch (error) {
  //     console.error("There was a problem with the fetch operation:", error);
  //   }
  // };

  const handleButtonLike = async () => {
    console.log(`Invio richiesta PUT per l'ID: ${cardId}`);
    try {
      const response = await fetch(
        `http://localhost:8080/posts/dislike/${cardId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            miPiace: activeButton === "like" ? 0 : 1,
            nonMiPiace: 0,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);

      if (activeButton === "like") {
        setLike(0);
        setActiveButton(null);
      } else {
        setLike(like + 1);
        setActiveButton("like");
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
    }
  };

  const handleButtonDislike = async () => {
    console.log(`Invio richiesta PUT per l'ID: ${cardId}`);
    try {
      const response = await fetch(
        `http://localhost:8080/posts/dislike/${cardId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nonMiPiace: activeButton === "dislike" ? 0 : 1,
            miPiace: 0,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log("Success:", data);

      if (activeButton === "dislike") {
        setDislike(0);
        setActiveButton(null);
      } else {
        setDislike(dislike - 1);
        setLike(0);
        setActiveButton("dislike");
      }
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

  const handleCommentAdded = () => {
    setCommenti(commenti + 1);
  };

  return (
    <div className="mx-auto">
      <div ref={cardRef} className="fade-in">
        <div className="grid md:grid-cols-1">
          {!visible ? (
            <button
              id="Card"
              onClick={() => {
                toggleDescription();
              }}
              className={`flex justify-center font-bold rounded-xl bg-gradient-to-r from-purple-400 to-green-200 text-white border-2 border-purple-400 w-80 h-80 overflow-y-auto overflow-x-auto duration-300 md:w-[28em] md:h-[28em] focus:animate-rotate-y ${
                showDescription ? "" : "items-center"
              }`}
            >
              <div className="w-60 break-words">
                <h2>{showDescription ? posts.descrizione : posts.title}</h2>
              </div>
            </button>
          ) : (
            <Commenti cardId={cardId} CommentAdded={handleCommentAdded} />
          )}
        </div>

        <div className="mt-2">
          <Button
            isIconOnly
            color="danger"
            aria-label="Like"
            className="text-purple-400"
          >
            <FiThumbsUp onClick={handleButtonLike} />
            {showLike}
          </Button>

          <Button
            isIconOnly
            color="danger"
            aria-label="DisLike"
            className="text-purple-400"
          >
            <FiThumbsDown onClick={handleButtonDislike} />
            {dislike}
          </Button>

          {!visible ? (
            <Button
              isIconOnly
              color="danger"
              aria-label="Comment"
              className="text-purple-400"
              onClick={handleVisible}
            >
              <MdOutlineInsertComment />
              {commenti}
            </Button>
          ) : (
            <Button
              isIconOnly
              color="danger"
              aria-label="Comment"
              className="text-purple-400"
              onClick={handleVisible}
            >
              <MdOutlineCommentsDisabled />
              {commenti}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
