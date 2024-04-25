import { Fragment, useCallback, useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import AboutPage from './pages/AboutPage';
import ArticleBrowserPage from './pages/ArticleBrowserPage';
import AdminPage from './pages/AdminPage';
import ArticlePage from './pages/ArticlePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AddArticlePage from './pages/AddArticlePage';

function App() {
  const [pagePositon, setPagePosition] = useState(0);
  const [selectedArticle, setSelectedArticle] = useState(1);

  const handleSelect = useCallback((selectedValue, art_id) => {
    if (selectedValue === "home") {
      setPagePosition(0);
    }

    if (selectedValue === "about") {
      setPagePosition(1);
    }

    if (selectedValue === "articles") {
      setPagePosition(2);
    }

    if (selectedValue === "articleDetail") {
      setPagePosition(3);
      setSelectedArticle(art_id);
    }

    if (selectedValue === "admin") {
      setPagePosition(4);
    }

    if (selectedValue === "login") {
      setPagePosition(5);
    }

    if (selectedValue === "register") {
      setPagePosition(6);
    }

    if (selectedValue === "add-article") {
      setPagePosition(7);
    }
  });
  

  const pages = [
    <HomePage key={0} onSelect={handleSelect} />,
    <AboutPage key={1}/>,
    <ArticleBrowserPage key={2} onSelect={handleSelect} />,
    <ArticlePage key={3} selectedArticle={selectedArticle}/>,
    <AdminPage key={4} onSelect={handleSelect} />,
    <LoginPage key={5}/>,
    <RegisterPage key={6}/>,
    <AddArticlePage key={7}/>
  ];

  let content = pages[pagePositon];

  return (
      <Fragment>
        <NavBar onSelect={handleSelect} />
          {content}
      </Fragment>
  );
}

export default App;
