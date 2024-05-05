import { Card } from "primereact/card";
import { useParams } from "react-router-dom";
import { InputTextarea } from "primereact/inputtextarea";
import { useCallback, useEffect, useState } from "react";
import { fetchGet, fetchPost } from "../util/api";

const ArticlePage = () => {
  const [article, setData] = useState({ comments: [] });
  const [updating, setUpdate] = useState(false);
  const [comment, setComment] = useState("");

  const { art_id } = useParams();

  const load = useCallback(async () => {
    try {
      const artData = await fetchGet("/articles/getArticleById/" + art_id);
      setData({
        ...artData.record,
        comments: artData.comments,
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [art_id]);

  useEffect(() => {
    load();
  }, [load]);

  const addComment = async (comment) => {
    try {
      const token = localStorage.getItem("uiAppToken");
      const objData = {
        text: comment,
        art_id: article._id,
      };

      const response = await fetch("http://localhost:3000/comments/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-access-token": token,
        },
        body: JSON.stringify(objData),
      });

      if (response.ok) {
        console.log("Comment bol pridany!");
        load();
      } else {
        console.log("Failed to add comment. Response status:", response.status);
      }
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  return (
    <div className="flex justify-content-center align-items-center min-h-screen">
      <div className="flex flex-column align-items-center gap-4 w-6">
        <h1>{article.name}</h1>

        <div className="flex gap-8">
          <p>{article.userName}</p>
          <p>{article.publicationTime}</p>
        </div>

        <div className="text">
          <p>{article.text}</p>
        </div>

        {article.comments.length === 0 && (
          <p>Tvoj názor nás zaujíma, napíš prvý komentár.</p>
        )}

        {article.comments.length === 1 && <p>{article.comments.length} komentár</p>}

        {article.comments.length > 1 && article.comments.length < 5 && (
          <p>{article.comments.length} komentáre</p>
        )}

        {article.comments.length >= 5 && (
          <p>{article.comments.length} komentárov</p>
        )}

        <div className="flex flex-column align-items-center w-full">
          <InputTextarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={1}
            cols={50}
          />
          <button className="p-button p-component" onClick={() => addComment(comment)}>
            Add Comment
          </button>
        </div>

        <div className="w-full">
          {article.comments.map((comment, index) => {
            return (
              <Card
                key={index}
                title={comment.commentatorName}
                footer={comment.text}
                className="mb-4"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;
