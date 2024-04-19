import { Card } from 'primereact/card';
import { Image } from 'primereact/image'

const datas = [
    {
        imgae: "src/assets/main-page-1.jpg",
        name: "Lorem Ipsum 1",
        userName: "Jožo Ráž",
        dateOfUpload: "19.4.2024",
        text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        imgae: "src/assets/main-page-2.jpg",
        name: "Lorem Ipsum 2",
        userName: "Peter Marcin",
        dateOfUpload: "18.4.2024",
        text:"Donec gravida eu mauris vel dictum. Phasellus eros neque, pretium sit amet nulla eget, interdum hendrerit mauris. Vivamus eleifend, orci a ornare pretium, justo libero pellentesque ex, vel hendrerit ante urna id lacus. Nunc mi tortor, mattis in urna sit amet, mattis suscipit purus. Aenean id augue at lacus vulputate tempor. Proin vehicula at nibh quis euismod. Proin eget euismod ex. Sed id tortor ac sapien semper accumsan. Donec venenatis nibh et sollicitudin malesuada."
    },
    {
        imgae: "src/assets/main-page-3.jpg",
        name: "Lorem Ipsum 3",
        userName: "Adrian Ihring",
        dateOfUpload: "17.4.2024",
        text:"Maecenas finibus lorem sed lacus maximus vehicula. Maecenas non nunc tellus. Phasellus a mauris tristique, accumsan dui non, semper turpis. Donec at blandit arcu, eu ultricies nunc. Morbi non finibus velit, eu dapibus orci. Pellentesque in nisl in est ornare mollis. Fusce vel facilisis metus. Curabitur ornare quis odio accumsan tempor. Aenean non commodo eros. Nam lobortis fringilla augue sed vehicula. In pharetra iaculis justo, vitae pellentesque ante consequat et. Aliquam vitae purus ut libero volutpat facilisis. Morbi lobortis pellentesque mi et egestas."
    },
    {
        imgae: "src/assets/main-page-4.jpg",
        name: "Lorem Ipsum 4",
        userName: "Peter Veľky",
        dateOfUpload: "15.4.2024",
        text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget blandit magna, vel egestas sapien. Etiam placerat dictum nisl vitae hendrerit. Donec eleifend dolor sed dignissim tristique. Aenean sed mauris fermentum, dapibus dolor nec, ultricies nulla. Integer nec est euismod, ullamcorper nisi et, tincidunt dolor. Nulla gravida ullamcorper pretium. Nam sed maximus libero. Maecenas feugiat euismod quam eget aliquet. Pellentesque consequat purus pretium, gravida turpis a, tincidunt massa. Sed in porta nisi. Donec commodo maximus purus eu semper. Integer eu elit sed tortor varius convallis. Fusce non risus vehicula erat sagittis malesuada. Vivamus in gravida metus, in maximus lacus. Cras malesuada dignissim lobortis."
    },
    {
        imgae: "src/assets/main-page-1.jpg",
        name: "Lorem Ipsum 5",
        userName: "Jožo Ráž",
        dateOfUpload: "14.4.2024",
        text:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    },
    {
        imgae: "src/assets/main-page-2.jpg",
        name: "Lorem Ipsum 6",
        userName: "Peter Marcin",
        dateOfUpload: "13.4.2024",
        text:"Donec gravida eu mauris vel dictum. Phasellus eros neque, pretium sit amet nulla eget, interdum hendrerit mauris. Vivamus eleifend, orci a ornare pretium, justo libero pellentesque ex, vel hendrerit ante urna id lacus. Nunc mi tortor, mattis in urna sit amet, mattis suscipit purus. Aenean id augue at lacus vulputate tempor. Proin vehicula at nibh quis euismod. Proin eget euismod ex. Sed id tortor ac sapien semper accumsan. Donec venenatis nibh et sollicitudin malesuada."
    },
    {
        imgae: "src/assets/main-page-3.jpg",
        name: "Lorem Ipsum 7",
        userName: "Adrian Ihring",
        dateOfUpload: "12.4.2024",
        text:"Maecenas finibus lorem sed lacus maximus vehicula. Maecenas non nunc tellus. Phasellus a mauris tristique, accumsan dui non, semper turpis. Donec at blandit arcu, eu ultricies nunc. Morbi non finibus velit, eu dapibus orci. Pellentesque in nisl in est ornare mollis. Fusce vel facilisis metus. Curabitur ornare quis odio accumsan tempor. Aenean non commodo eros. Nam lobortis fringilla augue sed vehicula. In pharetra iaculis justo, vitae pellentesque ante consequat et. Aliquam vitae purus ut libero volutpat facilisis. Morbi lobortis pellentesque mi et egestas."
    },
    {
        imgae: "src/assets/main-page-4.jpg",
        name: "Lorem Ipsum 8",
        userName: "Peter Veľky",
        dateOfUpload: "11.4.2024",
        text:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla eget blandit magna, vel egestas sapien. Etiam placerat dictum nisl vitae hendrerit. Donec eleifend dolor sed dignissim tristique. Aenean sed mauris fermentum, dapibus dolor nec, ultricies nulla. Integer nec est euismod, ullamcorper nisi et, tincidunt dolor. Nulla gravida ullamcorper pretium. Nam sed maximus libero. Maecenas feugiat euismod quam eget aliquet. Pellentesque consequat purus pretium, gravida turpis a, tincidunt massa. Sed in porta nisi. Donec commodo maximus purus eu semper. Integer eu elit sed tortor varius convallis. Fusce non risus vehicula erat sagittis malesuada. Vivamus in gravida metus, in maximus lacus. Cras malesuada dignissim lobortis."
    },
];

const ArticleBrowserPage = ({ onSelect }) => {
    return (
        <div className="flex flex-wrap gap-8 mt-8 mr-8 ml-8 ">
            {datas.map((data, index) => (
                <div className="w-17rem md:w-1/3" key={index}>
                    <Card
                        title={data.name} 
                        subTitle={data.userName} 
                        footer={data.dateOfUpload}
                        onClick={() => onSelect("articleDetail")}
                        className='cursor-pointer fadeinright animation-duration-500'>
                    </Card>
                </div>
            ))}
        </div>
    );
};

export default ArticleBrowserPage;