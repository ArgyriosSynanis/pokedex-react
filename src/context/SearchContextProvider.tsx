import React, { useCallback, useState } from 'react';
import SearchContext from './SearchContext';

const SearchContextProvider = ({ children }: any) => {
  const [searchTerm, setSearchedTerm] = useState('');

  const setSearchTerm = useCallback((string: string) => {
    setSearchedTerm(string);
  }, []);

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContextProvider;
