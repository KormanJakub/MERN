import { InputTextarea } from "primereact/inputtextarea";
import { useRef, useState } from "react";
import { Toast } from "primereact/toast";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { FileUpload } from "primereact/fileupload";
import { Card } from "primereact/card";

const AddArticlePage = () => {
  const [header, setHeader] = useState("");
  const [text, setText] = useState("");
  const toast = useRef(null);
  const [image, setImage] = useState();

  const onUpload = () => {
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
  };

  const addArticle = async (pHeader, pText) => {
    try {
      const token = localStorage.getItem("uiAppToken");

      const formData = new FormData();
      formData.append("image", image);
      formData.append("name", pHeader);
      formData.append("text", pText);

      const response = await fetch(
        "http://localhost:3000/articles/createArticle",
        {
          method: "POST",
          headers: {
            "x-access-token": token,
          },
          body: formData,
        }
      );

      console.log(response);

      if (response.ok) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Article added successfully",
        });
        setHeader("");
        setText("");
      } else {
        console.log("Failed to add article. Response status:", response.status);
        toast.current.show({
          severity: "error",
          summary: "Error",
          detail: "Failed to add article",
        });
      }
    } catch (error) {
      console.log("Error: " + error.message);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "An error occurred while adding the article",
      });
    }
  };

  return (
    <div className="flex flex-column align-items-center justify-content-center p-4">
      <Toast ref={toast} />
      <Card title="Add New Article" className="w-full md:w-3/4 xl:w-2/3">
        <div className="flex flex-column gap-3">
          <div className="p-field">
            <label htmlFor="header">Header</label>
            <InputText
              id="header"
              value={header}
              onChange={(e) => setHeader(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="p-field">
            <label htmlFor="text">Text</label>
            <InputTextarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={10}
              cols={40}
              className="w-full"
            />
          </div>

          <div className="p-field">
            <label htmlFor="file-upload">Upload Image</label>
            <FileUpload
              imode={'basic'}
              id="image"
              customUpload
              onSelect={(e) => setImage(e.files[0])}
              accept={'image/*'}
              chooseLabel={'Upload image'}
            />
          </div>

          <Button
            label="Add Article"
            icon="pi pi-check"
            onClick={() => addArticle(header, text)}
            className="w-full"
          />
        </div>
      </Card>
    </div>
  );
};

export default AddArticlePage;
