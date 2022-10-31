import React from 'react';
import { FaSearch } from 'react-icons/fa';

interface SearchProps {
  setSearch?: (searchedTerm: string) => void;
}

const Search = ({ setSearch }: SearchProps) => {
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (setSearch) {
      setSearch(e.target.value);
    }
  };

  return (
    <div className="relative">
      <input
        type="text"
        placeholder="Search Pokemon"
        className="px-5 py-3 border-gray-400 border rounded w-full"
        onChange={searchHandler}
      />

      <FaSearch
        className="absolute top-3.5 right-3.5 text-gray-400"
        size={20}
        data-testid="FaSearch"
      />
    </div>
  );
};

export default Search;
