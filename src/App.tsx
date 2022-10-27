import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDescription from './components/PokemonDescription';
import NotFound from './components/NotFound';

function App() {
  return (
    <div className="max-w-screen-xl mx-auto mt-4 md:px-4">
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route
          path="/pokemondescription/:id"
          element={<PokemonDescription />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
