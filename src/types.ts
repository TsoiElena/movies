export type CardType = {
  title: string;
  id: number;
  release_date: string;
  vote_average?: number | undefined | null;
  overview?: string | undefined | null;
  backdrop_path?: string;
};

export type Movies = Array<CardType> | [];
