import Moviecard from "../components/Moviecard";
import { useState } from "react";
import { useMovies } from './MoviesContext.jsx';
import { useFavmovies } from "./FavMoviesContext.jsx";
function Fav() {
  const {favMovies,setfavMovies} = useFavmovies();
  const {movies}=useMovies();
   function onFav(id) {
    const newfav = movies.find((movie) => movie.ids.imdb == id);
    console.log("new fav", newfav);
    setfavMovies([...favMovies, newfav]);
    console.log(favMovies,"fav movies");
  }
  return (
    <>
      {Array.isArray(favMovies) && favMovies.length > 0 ? (
        <div className="Favorites">
          {favMovies.map((movie) => {
         return(  <Moviecard
              movie={movie}
             onFav={onFav}
              key={movie.id || movie.ids?.trakt || Math.random()}
              
            />)
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
