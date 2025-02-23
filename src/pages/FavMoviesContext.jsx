// FavMoviesContext.jsx
import React, { createContext, useContext, useState } from 'react';

const FavMoviesContext = createContext();

export function FavMoviesprovider({ children }) {
  const [favMovies, setfavMovies] = useState([]);  // Consider using camelCase: `favMovies`, `setFavMovies`
  
  return (
    <FavMoviesContext.Provider value={{ favMovies, setfavMovies }}>
      {children}
    </FavMoviesContext.Provider>
  );
}

export const useFavmovies = () => useContext(FavMoviesContext);  // Or rename to `useFavMovies`