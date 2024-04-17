const HomePageButton = ({ children, ...props }) => {
    return (
      <li className="mainPageButton" {...props}>
        {children}
        <div className="homePageButtonUnderline"></div>
      </li>
    );
  };
  
  export default HomePageButton;
  