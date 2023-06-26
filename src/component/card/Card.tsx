import React from 'react';
import { format } from 'date-fns';

import './card.css';

import { CardType } from '../../types';
import { imgBase } from '../../service';

type CardProps = {
  card: CardType;
};

const cutDescription = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  const newText = text.slice(0, maxLength);
  const index = newText.lastIndexOf(' ');
  return newText.slice(0, index) + '...';
};

const Card: React.FC<CardProps> = ({ card }) => {
  console.log(card);
  const photoPath = card.backdrop_path
    ? imgBase + card.backdrop_path
    : 'https://t-bike.ru/images/products/no-image.jpg';
  const date = card.release_date ? format(new Date(card.release_date), 'MMMM dd, yyyy') : 'Oops, we do not know';
  return (
    <div className="card">
      <img className="card_photo" src={photoPath} alt="" />
      <div className="card_info">
        <div className="card_title">
          <h5>{card.title}</h5>
        </div>
        <div className="card_date text">{date}</div>
        <div className="card_genre">
          <div className="card_genre--item">Action</div>
          <div className="card_genre--item">Drama</div>
        </div>
        <div className="card_description text">{card.overview && cutDescription(card.overview, 200)}</div>
      </div>
    </div>
  );
};
export default Card;
