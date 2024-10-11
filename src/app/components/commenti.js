import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function Commenti({ cardId, commenti, CommentAdded }) {
  const [newComment, setNewComment] = useState("");
  const router = useRouter();

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/login'); 
          return;
        }
        const response = await fetch(
          `http://localhost:8080/posts/comment/${cardId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `${token}`
            },
            body: JSON.stringify({ testo: newComment }),
          }
        );
        const newCommento = await response.json();
        CommentAdded(newCommento.testo);
        setNewComment("");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center py-12 px-4 rounded-xl">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 text-center">
            Comment Section
          </h2>
        </div>
        <form className="space-y-4" onSubmit={handleCommentSubmit}>
          <div className="rounded-md shadow-sm">
            <div>
              <label htmlFor="comment" className="sr-only">
                Comment
              </label>
              <textarea
                id="comment"
                name="comment"
                rows="3"
                className="block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                placeholder="Add a comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 border border-transparent text-base font-medium rounded-md text-white bg-purple-400 hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
          >
            Post Comment
          </button>
        </form>
        <div className="mt-6">
          {commenti.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Comments</h3>
              <div className="max-h-64 overflow-y-auto">
                {commenti.map((comment, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-md shadow-md mt-2"
                  >
                    <p className="text-gray-700">{comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
