import Moviecard from "../components/Moviecard";
// import { useState } from "react";
import { useMovies } from "./MoviesContext.jsx";
import { useFavmovies } from "./FavMoviesContext.jsx";
function Fav() {
  const { favMovies, setfavMovies } = useFavmovies();
  const { movies } = useMovies();
  function onFav(id) {
    const isFavorite = favMovies.some(movie => movie.ids.imdb === id);
  
    if (isFavorite) {
      // Remove movie from favorites
      setfavMovies(prev => prev.filter(movie => movie.ids.imdb !== id));
    } else {
      // Add movie to favorites
      const newFav = movies.find(movie => movie.ids.imdb === id);
      if (newFav) {
        setfavMovies(prev => [...prev, newFav]);
        console.log("Added new fav:", newFav);
      } else {
        console.log("Movie not found for id:", id);
      }
    }
  }
  return (
    <>
      {Array.isArray(favMovies) && favMovies.length > 0 ? (
        <div className="Favorites">
          {favMovies.map((movie) => {
            return (
              <Moviecard
                movie={movie}
                onFav={onFav}
                isFav={favMovies.some(favMovie => favMovie.ids.imdb === movie.ids.imdb)}
                key={movie.ids.imdb || movie.ids?.trakt || Math.random()}
              />
            );
          })}
        </div>
      ) : (
        <div className="Favorites">
          <h2>No Favorite Movies</h2>
          <p>Start Adding movies for better experience</p>
        </div>
      )}
    </>
  );
}
export default Fav;
