import { CardType } from './types';

const baseApi = 'https://api.themoviedb.org/3/';
const apiKey = 'b71dbf8e06b30640b90e72b784955927';

export const imgBase = 'https://image.tmdb.org/t/p/original';

type Rate = {
  id: number;
  value: number;
};

let guestSessionId = '';

localStorage.setItem('rated', JSON.stringify([]));

const storageToArray = () => {
  const storage = localStorage.getItem('rated');
  return typeof storage === 'string' ? JSON.parse(storage) : [];
};

const optionsGet = {
  method: 'GET',
  headers: {
    accept: 'application/json',
  },
};

const optionsPost = {
  method: 'POST',
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json;charset=utf-8',
  },
  body: '',
};

const getResourse = async (url: string) => {
  const result = await fetch(url, optionsGet);
  return result;
};

const postResourse = async (url: string) => {
  const result = await fetch(url, optionsPost);
  return result;
};

export const getMovies = async (term: string, page: number) => {
  let result = await getResourse(
    `${baseApi}search/movie?api_key=${apiKey}&query=${term}&include_adult=false&language=en-US&page=${page}`
  );

  if (!result.ok) return Promise.reject(result.status);

  result = await result.json();
  const res = await Object.assign(result);

  const Srated = storageToArray();
  if (Srated.length) {
    Srated.forEach((item: Rate) => {
      res.results = res.results.map((itemCard: CardType) => {
        if (item.id === itemCard.id) {
          return { ...itemCard, rating: item.value };
        }
        return itemCard;
      });
    });
    console.log(res.results);
  }

  return res;
};

export const getGenre = async () => {
  let result = await getResourse(`${baseApi}genre/movie/list?api_key=${apiKey}&language=en`);

  if (!result.ok) return Promise.reject(result.status);

  result = await result.json();

  return result;
};

export const createGuestSession = async () => {
  let result = await getResourse(`${baseApi}authentication/guest_session/new?api_key=${apiKey}`);
  if (!result.ok) return Promise.reject(result.status);

  result = await result.json();
  guestSessionId = Object.assign(result).guest_session_id;
};

export const movieRate = async (movieId: number, value: number) => {
  optionsPost.body = JSON.stringify({ value: value });
  let result = await postResourse(
    `${baseApi}movie/${movieId}/rating?api_key=${apiKey}&guest_session_id=${guestSessionId}`
  );
  if (!result.ok) return Promise.reject(result.status);
  result = await result.json();

  const newRate: Rate = { id: movieId, value: value };
  let SRate = storageToArray();
  if (!SRate.length) {
    localStorage.setItem('rated', JSON.stringify([newRate]));
  } else {
    const hasRate = SRate.find((item: Rate) => item.id === newRate.id);
    if (hasRate) {
      SRate = SRate.map((item: Rate) => {
        if (item.id === newRate.id) {
          return newRate;
        }
        return item;
      });
    } else {
      SRate.push(newRate);
    }
    localStorage.setItem('rated', JSON.stringify(SRate));
  }

  return Object.assign(result).status_code;
};

export const getRatedMovies = async (page: number) => {
  let result = await getResourse(
    `${baseApi}guest_session/${guestSessionId}/rated/movies?api_key=${apiKey}&language=en-US&page=${page}&sort_by=created_at.desc`
  );
  if (!result.ok) return Promise.reject(result.status);
  result = await result.json();

  return result;
};
