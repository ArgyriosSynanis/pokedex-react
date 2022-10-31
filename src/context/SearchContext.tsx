import { createContext } from 'react';

export default createContext({
  searchTerm: '',
  setSearchTerm: (searchTerm: string) => {},
});
