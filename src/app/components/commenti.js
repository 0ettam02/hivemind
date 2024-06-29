import React, { useState, useEffect } from "react";

export default function Commenti({ cardId, CommentAdded }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    fetch(`http://localhost:8080/posts/reqComment/${cardId}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setComments(data.map((commento) => commento.testo));
        } else {
          setComments([data.commento]);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [cardId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      try {
        const response = await fetch(
          `http://localhost:8080/posts/comment/${cardId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ testo: newComment }),
          }
        );
        const newCommento = await response.json();
        setComments([...comments, newCommento.testo]);
        setNewComment("");
        CommentAdded();
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center py-12 px-4 rounded-xl">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Comment Section
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleCommentSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="comment" className="sr-only">
                Comment
              </label>
              <textarea
                id="comment"
                name="comment"
                rows="3"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Add a comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-400 hover:bg-purple-500"
            >
              Post Comment
            </button>
          </div>
        </form>

        {comments.length > 0 && (
          <div className="mt-8 space-y-6">
            <h3 className="text-lg font-medium text-gray-900">Comments</h3>
            <div className="max-h-64 overflow-y-auto">
              {comments.map((comment, index) => (
                <div
                  key={index}
                  className="bg-white p-4 rounded-md shadow mt-2"
                >
                  <p className="text-gray-700">{comment}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
