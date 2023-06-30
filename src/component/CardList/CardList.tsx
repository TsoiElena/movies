import React from 'react';

import './cardList.css';
import Card from '../card/Card';
import CantFound from '../notice/CantFound';
import { Movies } from '../../types';

type CardListProps = {
  movies: Movies;
};

const CardList: React.FC<CardListProps> = ({ movies }: CardListProps) => {
  return (
    <div className="page_list">
      {movies.length ? (
        movies.map((item) => {
          return <Card key={item.id} card={item} />;
        })
      ) : (
        <CantFound />
      )}
    </div>
  );
};

export default CardList;
