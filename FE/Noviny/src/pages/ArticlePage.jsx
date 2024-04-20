import { Image } from 'primereact/image';
import { Card } from 'primereact/card';

const datas = [
    {
        image: "src/assets/main-page-1.jpg",
        name: "Lorem Ipsum 1",
        userName: "Jožo Ráž",
        dateOfUpload: "19.4.2024",
        text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        reviews: [
            {
              text: "Článok je dobrý",
              reviewerName: "Peter Stastny",
              id: "1234",
            },
            {
              text: "Prečo toto je tak otrasné",
              reviewerName: "Peter Velky",
              id: "1234",
            },
            {
              text: "Neklam",
              reviewerName: "Jožo Stastny",
              id: "1234",
            },
          ],
    }
]

const ArticlePage = () => {
    return (
      <div>
        {datas.map((data, index) => (
          <div className='' key={index}>
            
              <h1>{data.name}</h1>

              <div className="creater-date flex gap-8">
                <p>{data.userName}</p>
                <p>{data.dateOfUpload}</p>
              </div>

              <div className="image">
                <Image src={data.image} alt="Image" width="700" preview/>
              </div>

              <div className="text w-6">
                <p>{data.text}</p>
              </div>

            <div className="comments" key={index}>
              <div className="number-of-comments">
                {data.reviews.length} komentárov
              </div>

            {data.reviews.map((review, index) => (
              <div key={index}>
                <Card
                  title={review.reviewerName}
                  footer={
                    <div className="comment-text">
                      {review.text}
                    </div>
                  }
                />
              </div>
            ))}
          </div>
          </div>
        ))}
      </div>
    )
}

export default ArticlePage;