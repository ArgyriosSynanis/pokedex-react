import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PokemonDescription = () => {
  const location = useLocation();
  useEffect(() => {
    console.log(location.state);
  }, [location]);

  return <>{location.state}</>;
};

export default PokemonDescription;
