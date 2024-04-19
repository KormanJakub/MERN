import { Fragment, useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage';
import NavBar from './components/NavBar';
import AboutPage from './pages/AboutPage';
import ArticleBrowserPage from './pages/ArticleBrowserPage';
import AdminPage from './pages/AdminPage';
import ArticlePage from './pages/ArticlePage';

function App() {
  const [pagePositon, setPagePosition] = useState(0);

  const handleSelect = (selectedValue) => {
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
    }

    if (selectedValue === "admin") {
      setPagePosition(4);
    }
  };

  const pages = [
    <HomePage key={0} onSelect={handleSelect} />,
    <AboutPage key={1}/>,
    <ArticleBrowserPage key={2} onSelect={handleSelect} />,
    <ArticlePage key={3}/>,
    <AdminPage key={4} onSelect={handleSelect} />,
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
