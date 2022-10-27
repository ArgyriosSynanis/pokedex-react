import { createContext } from 'react';

export default createContext({
  searchTerm: '',
  setSearchTerm: (string: any) => string,
});
