import React, { useEffect, useState } from 'react';

import { getMovies, getRatedMovies } from '../../service';
import Search from '../search/Search';
import ErrorNotice from '../notice/ErrorNotice';
import Preload from '../preload/preload';

import Page from './page';

type PageHocProps = {
  tab: string;
};

const PageHoc: React.FC<PageHocProps> = ({ tab }) => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [term, setTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

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

  const getRated = () => {
    setIsLoading(true);
    getRatedMovies(page)
      .then((res) => Object.assign(res))
      .then((res) => {
        console.log(res);
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
    if (tab === 'Rated') getRated();
    if (tab === 'Search') getdata();
  }, [page]);

  useEffect(() => {
    setPage(1);
    if (tab === 'Rated') getRated();
    if (tab === 'Search') getdata();
  }, [tab]);

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
    <>
      {tab === 'Search' && <Search term={term} setTerm={setTerm} />}
      {preload}
      {errorMessage}
      {content}
    </>
  );
};

export default PageHoc;
