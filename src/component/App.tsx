import React, { useEffect, useState } from 'react';
import { Pagination } from 'antd';

import { getMovies } from '../service';

import './App.css';
import CardList from './CardList/CardList';

const App: React.FC = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);

  useEffect(() => {
    getMovies('return', page)
      .then((res) => Object.assign(res))
      .then((res) => {
        setMovies(res.results);
        setTotalPage(res.total_pages);
        console.log(movies);
      });
    scroll(0, 0);
  }, [page]);
  return (
    <div className="page">
      <CardList movies={movies} />
      <div className="page_pagination">
        <Pagination
          current={page}
          onChange={(p) => setPage(p)}
          total={totalPage}
          showSizeChanger={false}
          className="center"
          defaultPageSize={1}
        />
      </div>
    </div>
  );
};

export default App;
