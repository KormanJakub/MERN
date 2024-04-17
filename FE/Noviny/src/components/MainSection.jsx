const MainSection = ({ title = "Default title", children, ...props }) => {
    return (
      <main {...props}>
        <h1>{title}</h1>
        {children}
      </main>
    );
  };
  
  export default MainSection;
  