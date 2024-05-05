import { Editor } from "primereact/editor";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { fetchPost } from "../util/api";
import { useState } from "react";

const AddArticlePage = () => {
  const [header, setHeader] = useState("");
  const [text, setText] = useState("");

  const addArticle = async (pHeader, pText) => {
    try {
      const objData = {
        name: pHeader,
        text: pText,
      };

      const service = await fetchPost("/articles/createArticle", objData);

      if (service === 0) {
        console.log("Article bol pridany!");
      }
    } catch (error) {
      console.log("Error: " + error.message);
    }
  };

  return (
    <div>
      <div>
        <InputText value={header} onChange={(e) => setHeader(e.target.value)} />
      </div>
      <div>
        <Editor
          value={text}
          onTextChange={(e) => setText(e.htmlValue)}
          style={{ height: "320px" }}
        />
      </div>

      <Button label="Pridat" onClick={() => addArticle(header, text)} />
    </div>
  );
};

export default AddArticlePage;
