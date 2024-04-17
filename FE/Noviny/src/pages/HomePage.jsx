import HomePageButton from "../components/HomePageButton";
import MainSection from "../components/MainSection";

const HomePage = ({ onSelect }) => {
  return (
    <div className="background-image">
      <div className="container">
      <MainSection title="Find out your information now" className="mainSection">
      <p>
        For reading you will need to be log in!
      </p>
      <ul id="actions">
        <HomePageButton onClick={() => onSelect("articles")}>
          Browse Articles
        </HomePageButton>
      </ul>
    </MainSection>
    </div>
    </div>
  );
};

export default HomePage;
