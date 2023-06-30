import React, { useEffect, useState } from 'react';

import { getMovies } from '../service';

import './App.css';
import Search from './search/Search';
import Page from './page/page';
import ErrorNotice from './notice/ErrorNotice';
import Preload from './preload/preload';

const App: React.FC = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [term, setTerm] = useState('');

  const getdata = () => {
    setIsLoading(true);
    getMovies(term, page)
      .then((res) => Object.assign(res))
      .then((res) => {
        setMovies(res.results);
        setTotalPage(res.total_pages);
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
        setError(true);
      });
    scroll(0, 0);
  };

  useEffect(() => {
    getdata();
  }, [page]);

  useEffect(() => {
    setPage(1);
    getdata();
  }, [term]);

  const hasData = !(isLoading || error);

  const errorMessage = error ? <ErrorNotice /> : null;
  const preload = isLoading ? <Preload /> : null;
  const content =
    !isLoading && hasData ? <Page movies={movies} page={page} setPage={setPage} totalPage={totalPage} /> : null;

  return (
    <div className="page">
      <Search term={term} setTerm={setTerm} />
      {preload}
      {errorMessage}
      {content}
    </div>
  );
};

export default App;
