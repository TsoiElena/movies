const baseApi = 'https://api.themoviedb.org/3/';

export const imgBase = 'https://image.tmdb.org/t/p/original';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiNzFkYmY4ZTA2YjMwNjQwYjkwZTcyYjc4NDk1NTkyNyIsInN1YiI6IjY0OTVhMWYzYTI4NGViMDBlMmI3MWFjNiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8ZkympB8zJamigw4_IOi2P9Z62xqX_9zceKJQ5lkxjA',
  },
};

const getResourse = async (url: string) => {
  let result = await fetch(url, options);

  if (!result.ok) throw new Error(`Oops! error ${result.status}`);

  result = await result.json();

  return result;
};

export const getMovies = async (term: string, page: number) => {
  const result = await getResourse(
    `${baseApi}search/movie?query=${term}&include_adult=false&language=en-US&page=${page}`
  );
  return result;
};
