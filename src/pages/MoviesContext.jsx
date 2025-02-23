
import React, { createContext, useContext, useState } from 'react';

const MoviesContext = createContext();

export function MoviesProvider({ children }) {
  const [movies, setmovies] = useState([]);

  return (
    <MoviesContext.Provider value={{ movies, setmovies }}>
      {children}
    </MoviesContext.Provider>
  );
}

export const useMovies = () => useContext(MoviesContext);