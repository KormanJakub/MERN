import { Card } from 'primereact/card';
import { useEffect, useState } from "react";

const ArticleBrowserPage = ({ onSelect }) => {
    const [articleDatas, setArtData] = useState([]);

    useEffect(() => {
      const load = async() => {
      try {
        const response = await fetch("http://localhost:3000/articles/getAllArticles");
        if (response.ok) {
          const responseData = await response.json();
          setArtData(
            responseData.map((item) => {
              return {
                ...item
              };
            })
          )
        }
      } catch (error) {
        alert("Error loding articles!");
      }
    };
    load();
    }, []);

    return (
        <div className="flex flex-wrap gap-8 mt-8 mr-8 ml-8 ">
          <Card
            title= "Add article"
            footer={
              <p class="pi pi-plus"></p>
            }
            onClick={() => onSelect("add-article")}
            className='cursor-pointer fadeinright animation-duration-500'
          >
          </Card>

            {articleDatas.map((item) => (
                <div className="w-17rem md:w-1/3">
                    <Card
                        title={item.name} 
                        subTitle={item.userName} 
                        footer={item.publicationTime}
                        onClick={() => onSelect("articleDetail", item._id)}
                        className='cursor-pointer fadeinright animation-duration-500'>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default ArticleBrowserPage;