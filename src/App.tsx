import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PokemonList from './components/PokemonList';
import PokemonDescription from './components/PokemonDescription';
import NotFound from './components/NotFound';

function App() {
  return (
    <Routes>
      <Route path="/" element={<PokemonList />} />
      <Route path="/pokemondescription/:id" element={<PokemonDescription />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
