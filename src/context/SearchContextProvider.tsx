import React, { useCallback, useState } from 'react';
import SearchContext from './SearchContext';

interface SearchContextProviderProps {
  children: React.ReactNode;
}

const SearchContextProvider = ({ children }: SearchContextProviderProps) => {
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
