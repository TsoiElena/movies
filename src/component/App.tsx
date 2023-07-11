import React, { createContext, useEffect, useState } from 'react';

import { createGuestSession, getGenre } from '../service';

import './App.css';
import Search from './search/Search';
import TabsMenu from './Tabs/Tabs';
import PageHoc from './page/PageHoc';
import ErrorNotice from './notice/ErrorNotice';

export const GenresContext = createContext([]);

const App: React.FC = () => {
  const [tabs, setTabs] = useState('Search');
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    createGuestSession().catch(() => setError(true));
    getGenre()
      .then((res) => Object.assign(res))
      .then((res) => {
        setGenres(res.genres);
      });
  }, []);

  if (error) return <ErrorNotice />;

  return (
    <div className="page">
      <TabsMenu setTabs={setTabs} />
      <GenresContext.Provider value={genres}>
        <PageHoc tab={tabs} />
      </GenresContext.Provider>
    </div>
  );
};

export default App;
