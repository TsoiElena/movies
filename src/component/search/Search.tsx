import React, { useState, useCallback } from 'react';
import { Input } from 'antd';
import debounce from 'lodash/debounce';

import './search.css';

type SearchProps = {
  term: string;
  setTerm: (t: string) => void;
};

const Search: React.FC<SearchProps> = ({ term, setTerm }) => {
  const [query, setQuery] = useState(term);

  const sendQuery = (q: string) => {
    setTerm(q);
    setQuery('');
  };

  const delayedSearch = useCallback(
    debounce((q: string) => sendQuery(q), 600),
    []
  );

  const onChange = (str: string) => {
    setQuery(str);
    delayedSearch(str);
  };

  return (
    <Input
      className="search"
      placeholder="Type to search..."
      value={query}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default Search;
