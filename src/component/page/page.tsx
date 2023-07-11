import React from 'react';
import { Pagination } from 'antd';

import { Movies } from '../../types';
import CardList from '../CardList/CardList';

type PageProps = {
  movies: Movies;
  page: number;
  totalPage: number;
  setPage: (e: number) => void;
};

const Page: React.FC<PageProps> = ({ movies, page, setPage, totalPage }) => {
  return (
    <>
      <CardList movies={movies} />
      <div className="page_pagination">
        <Pagination
          current={page}
          onChange={(p) => setPage(p)}
          total={totalPage}
          showSizeChanger={false}
          className="center"
          defaultPageSize={1}
          hideOnSinglePage={true}
        />
      </div>
    </>
  );
};

export default Page;
