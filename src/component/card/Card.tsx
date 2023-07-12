import React, { useContext, useState } from 'react';
import { format } from 'date-fns';
import { Rate } from 'antd';

import './card.css';

import { CardType } from '../../types';
import { imgBase, movieRate } from '../../service';
import { GenresContext } from '../App';

type CardProps = {
  card: CardType;
};

type Genre = {
  id: number;
  name: string;
};

const cutDescription = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  const newText = text.slice(0, maxLength);
  const index = newText.lastIndexOf(' ');
  return newText.slice(0, index) + '...';
};

const Card: React.FC<CardProps> = ({ card }) => {
  const genres = useContext(GenresContext);
  const [rated, setRated] = useState(card.rating ? card.rating : 0);
  const [error, setError] = useState(false);
  const cardGenres: Array<Genre> | [] = [];
  const photoPath = card.backdrop_path
    ? imgBase + card.backdrop_path
    : 'https://t-bike.ru/images/products/no-image.jpg';
  const date = card.release_date ? format(new Date(card.release_date), 'MMMM dd, yyyy') : 'Oops, we do not know';
  const vote = card.vote_average ? card.vote_average.toFixed(1) : 0;
  let color = 'red';

  if (card.genre_ids?.length && genres.length)
    card.genre_ids.forEach((item) => {
      const genre = genres.filter((elem: { id: number }) => elem.id === item);
      cardGenres.push(genre[0]);
    });
  if (vote < 3) color = 'red';
  if (vote < 5 && vote >= 3) color = 'orange';
  if (vote < 7 && vote >= 5) color = 'yellow';
  if (vote >= 7) color = 'green';
  if (error) alert('Ooops. Try it again');

  const handleRated = (value: number) => {
    movieRate(card.id, value)
      .then(() => setRated(value))
      .catch(() => setError(true));
  };

  return (
    <div className="card">
      <div className="card_photo">
        <img src={photoPath} alt="" />
      </div>
      <div className="card_title">
        <h5>{cutDescription(card.title, 20)}</h5>
      </div>
      <div className={`card-voite ${color}`}>{vote}</div>
      <div className="card_date text">{date}</div>
      <div className="card_genre">
        {cardGenres.length ? (
          cardGenres.map((item) => (
            <div className="card_genre--item" key={item.id}>
              {item.name}
            </div>
          ))
        ) : (
          <div className="card_genre--item">We do not know</div>
        )}
      </div>
      <div className="card_description text">{card.overview && cutDescription(card.overview, 140)}</div>
      <Rate className="card-rated" allowHalf value={rated} onChange={handleRated} count={10} />
    </div>
  );
};
export default Card;
