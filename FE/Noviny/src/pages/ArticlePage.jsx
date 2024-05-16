import { Card } from "primereact/card";
import { useParams, useNavigate } from "react-router-dom";
import { InputTextarea } from "primereact/inputtextarea";
import { useCallback, useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { decodeJWT } from "../util/token";
import { Image } from 'primereact/image';
import { fetchGet, fetchPost } from "../util/api";

const ArticlePage = () => {
  const navigate = useNavigate();
  const [article, setArticle] = useState({ comments: [] });
  const [comment, setComment] = useState("");
  const [editArticleDialog, setEditArticleDialog] = useState(false);
  const [editCommentDialog, setEditCommentDialog] = useState(false);
  const [editComment, setEditComment] = useState({});
  const { art_id } = useParams();

  const token = localStorage.getItem("uiAppToken");
  const decodedToken = decodeJWT(token);
  const userId = decodedToken?.userId || "";

  const isAdmin = localStorage.getItem("uiAppRole") === "admin";

  const load = useCallback(async () => {
    try {
      const artData = await fetchGet("/articles/getArticleById/" + art_id);
      console.log(artData);
      setArticle({
        ...artData.record,
        comments: artData.comments.slice(0, 20),
      });

      let imagePath = article.imageLocation;
      let correctedPath = imagePath.replace("/\/g", "/");
      correctedPath = correctedPath.replace("public/", "");
    } catch (error) {
      console.log(error.message);
    }
  }, [art_id]);

  useEffect(() => {
    load();
  }, [load]);

  const addComment = async (comment) => {
    try {
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
        console.log("Comment added successfully!");
        load();
      } else {
        console.log("Failed to add comment. Response status:", response.status);
      }
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  const removeComment = async (commentId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/comments/delete/${commentId}`,
        {
          method: "DELETE",
          headers: {
            "x-access-token": token,
          },
        }
      );

      if (response.ok) {
        console.log("Comment removed successfully!");
        load();
      } else {
        console.log(
          "Failed to remove comment. Response status:",
          response.status
        );
      }
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  const removeArticle = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/articles/removeArticle/${art_id}`,
        {
          method: "DELETE",
          headers: {
            "x-access-token": token,
          },
        }
      );

      if (response.ok) {
        console.log("Article removed successfully!");
        navigate("/articles");
      } else {
        console.log(
          "Failed to remove article. Response status:",
          response.status
        );
      }
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  const updateArticle = async () => {
    try {
      const objData = {
        name: article.name,
        text: article.text,
      };

      const response = await fetch(
        `http://localhost:3000/articles/updateArticle/${art_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify(objData),
        }
      );

      if (response.ok) {
        console.log("Article updated successfully!");
        setEditArticleDialog(false);
        load();
      } else {
        console.log(
          "Failed to update article. Response status:",
          response.status
        );
      }
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  const updateComment = async () => {
    try {
      const commentData = {
        text: editComment.text,
      };

      const response = await fetch(
        `http://localhost:3000/comments/update/${editComment._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "x-access-token": token,
          },
          body: JSON.stringify(commentData),
        }
      );

      if (response.ok) {
        console.log("Comment updated successfully!");
        setEditCommentDialog(false);
        load();
      } else {
        console.log(
          "Failed to update comment. Response status:",
          response.status
        );
      }
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  const getDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const buttonStyles = "p-button-rounded p-button-text p-button-outlined";

  const canEditOrDeleteArticle = isAdmin || article.userId === userId;

  return (
    <div className="flex flex-column align-items-center justify-content-center min-h-screen">
      <Card
        title={article.name}
        subTitle={`by ${article.userName}`}
        className="mb-4 w-10"
      >
        <Image src={`http://localhost:3000/${article.imageLocation}`} alt="Image" width="250" />
        <div className="text-lg">{article.text}</div>
        <div className="mt-2 text-gray-500">
          {getDate(article.publicationTime)}
        </div>
      </Card>
      {canEditOrDeleteArticle && (
        <div className="flex justify-content-center mb-4 gap-2">
          <Button
            label="Update Article"
            className={`p-button-primary ${buttonStyles}`}
            onClick={() => setEditArticleDialog(true)}
          />
          <Button
            label="Remove Article"
            className={`p-button-danger ${buttonStyles}`}
            onClick={removeArticle}
          />
        </div>
      )}

      <div className="mt-6 w-10">
        <h2 className="text-2xl mb-4 text-center">Comments</h2>
        <div className="mb-4">
          <InputTextarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            cols={50}
            placeholder="Write your comment..."
            className="w-full"
          />
          <Button
            label="Add Comment"
            className={`mt-2 ${buttonStyles}`}
            onClick={() => addComment(comment)}
          />
        </div>

        {article.comments.length === 0 && (
          <p className="text-center">
            No comments yet. Be the first to comment!
          </p>
        )}

        {article.comments.map((comment, index) => {
          const canEditOrDeleteComment =
            isAdmin || comment.commentatorId === userId;
          return (
            <div key={index} className="flex flex-column align-items-center">
              <Card
                key={index}
                title={comment.commentatorName}
                className="mb-4 w-10"
              >
                <p>{comment.text}</p>
              </Card>

              {canEditOrDeleteComment && (
                <div className="flex justify-content-center mb-4 gap-2">
                  <Button
                    label="Update Comment"
                    className={`p-button-primary ${buttonStyles}`}
                    onClick={() => {
                      setEditCommentDialog(true);
                      setEditComment(comment);
                    }}
                  />
                  <Button
                    label="Remove Comment"
                    className={`p-button-danger ${buttonStyles}`}
                    onClick={() => removeComment(comment._id)}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <Dialog
        header="Update Article"
        visible={editArticleDialog}
        style={{ width: "50vw" }}
        modal
        onHide={() => setEditArticleDialog(false)}
      >
        <div className="p-field">
          <label htmlFor="articleName">Name</label>
          <InputText
            id="articleName"
            value={article.name}
            onChange={(e) => setArticle({ ...article, name: e.target.value })}
            className="w-full"
          />
        </div>
        <div class="p-field">
          <label htmlFor="articleText">Text</label>
          <InputTextarea
            id="articleText"
            value={article.text}
            onChange={(e) => setArticle({ ...article, text: e.target.value })}
            rows={5}
            className="w-full"
          />
        </div>
        <Button label="Update" className="mt-2" onClick={updateArticle} />
      </Dialog>

      <Dialog
        header="Update Comment"
        visible={editCommentDialog}
        style={{ width: "50vw" }}
        modal
        onHide={() => setEditCommentDialog(false)}
      >
        <div className="p-field">
          <label htmlFor="commentText">Text</label>
          <InputTextarea
            id="commentText"
            value={editComment.text}
            onChange={(e) =>
              setEditComment({ ...editComment, text: e.target.value })
            }
            rows={3}
            className="w-full"
          />
        </div>
        <Button label="Update" className="mt-2" onClick={updateComment} />
      </Dialog>
    </div>
  );
};

export default ArticlePage;
