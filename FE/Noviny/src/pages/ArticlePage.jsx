import { Card } from 'primereact/card';

import { InputTextarea } from 'primereact/inputtextarea'; 

import { useCallback, useEffect, useState } from "react";
import { fetchGet, fetchPost } from "../util/api";

const ArticlePage = ({ selectedArticle }) => {
  const [article, setData] = useState({ comments: []});
  const [comment, setComment] = useState("");

  const load = useCallback(async () => {
    try {
      const artData = await fetchGet(
        "/articles/getArticleById/"+selectedArticle
      );

      setData({
        ...artData.record,
        comments: artData.comments,
      });
    } catch (error) {
      console.log(error.message);
    }
  }, [selectedArticle]);

  useEffect(() => {
    load();
  }, [load, selectedArticle]);

  const addComment = async (comment) => {
    try {
      const objData = {
        text: comment,
        art_id: article._id,
      };

      const service = await fetchPost("/comments/create", objData);

      if (service === 0) {
        console.log("Comment bol pridany!");
        load();
      }

    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  const updateComment = async (id, identifier, comment) => {
    try {
      const objData = {
        [identifier]: comment,
      };

      const service = await fetchPut("/comments/update/" + id, objData, "PUT");

      if (service == 0) {
        console.log("Comment bol zmeneny!");
        load();
      }
    } catch (error) {
      console.log("Error: " + error.message);
      load();
    }
  };

  return (
    <div>
        <div className=''>
            <h1>{article.name}</h1>

            <div className="creater-date flex gap-8">
              <p>{article.userName}</p>
              <p>{article.publicationTime}</p>
            </div>

            <div className="text w-6">
              <p>{article.text}</p>
            </div>

            {article.comments.length == 0 && (
              <p>Tvoj názor nás zaujíma, napíš prvý komentár.</p>
            )}

            {article.comments.length == 1 && (
              <p>{article.comments.length} komentár</p>
            )}

            {article.comments.length > 1 && article.comments.length  < 5 && (
              <p>{article.comments.length} komentáre</p>
            )}

            {article.comments.length > 4 && (
              <p>{article.comments.length} komentárov</p>
            )}

            <div className="add-comment">
              <InputTextarea value={comment} onChange={(e) => setComment(e.target.value)} rows={1} cols={100} />
              <button onClick={() => addComment(comment)}>Add Comment</button>
            </div>

            <div className="comments">
              {article.comments.map((comment, index) => {
                return (
                  <div key={index}>
                  <Card
                    title={comment.commentatorName}
                    footer={
                      <div className="comment-text">
                        {comment.text}
                      </div>
                    }
                  />
                </div>
                )})}
            </div>
        </div>
    </div>
  )  
}

export default ArticlePage;