import { Card } from "primereact/card";
import { useEffect, useState } from "react";
import { Link, useNavigate, useRouteLoaderData } from "react-router-dom";

const ArticleBrowserPage = () => {
  const [articleDatas, setArtData] = useState([]);

  const getDate = (date) => {
    return new Date(date).toDateString();
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
          setArtData(
            responseData.map((item) => {
              return {
                ...item,
              };
            })
          );
        }
      } catch (error) {
        alert("Error loding articles!");
      }
    };
    load();
  }, []);

  return (
    <div className="flex flex-wrap gap-8 mt-8 mr-8 ml-8">
      <Card
        title="Add article"
        footer={
          <>
            <Link to="/add-article">
              <p className="ml-6  pi pi-plus"></p>
            </Link>
          </>
        }
        className="cursor-pointer fadeinright animation-duration-500"
      ></Card>

      {articleDatas.map((item, key) => (
        <div className="w-17rem md:w-1/3" key={key}>
          <Card
            title={
              <>
                <Link to={item._id}>{item.name}</Link>
              </>
            }
            subTitle={item.userName}
            footer={getDate(item.publicationTime)}
            className="cursor-pointer fadeinright animation-duration-500"
          ></Card>
        </div>
      ))}
    </div>
  );
};

export default ArticleBrowserPage;
