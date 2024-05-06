import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";

const ArticleBrowserPage = () => {
  const [articleDatas, setArtData] = useState([]);

  const getDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  useEffect(() => {
    const load = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/articles/getAllArticles",
          {
            headers: {
              "x-access-token": localStorage.getItem("uiAppToken"),
            },
          }
        );
        if (response.ok) {
          const responseData = await response.json();
          setArtData(responseData.map((item) => ({ ...item })));
        }
      } catch (error) {
        alert("Error loading articles!");
      }
    };
    load();
  }, []);

  return (
    <div className="container mx-auto py-4 px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold mb-4">Articles</h1>
        <Link to="/add-article">
          <Button
            icon="pi pi-plus"
            className="p-button-rounded p-button-outlined"
            tooltip="Add Article"
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articleDatas.map((item, key) => (
          <Card
            key={key}
            title={
              <Link
                to={`/articles/${item._id}`}
                className="text-blue-500 hover:underline"
              >
                {item.name}
              </Link>
            }
            subTitle={`by ${item.userName}`}
            footer={
              <span className="text-gray-500 text-sm">
                {getDate(item.publicationTime)}
              </span>
            }
            className="fadeinright animation-duration-500 hover:shadow-lg transition-shadow"
          >
            <p className="m-0">
              {item.excerpt || item.text.substring(0, 100) + "..."}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ArticleBrowserPage;
