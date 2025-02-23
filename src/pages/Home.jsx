import Moviecard from "../components/Moviecard";
import { useState, useEffect} from "react";
import {
  SearchMovies,
  getPopularMovies,
  getAdditionalInfo,
} from "../services/api";

import { useMovies } from './MoviesContext.jsx';
import { useFavmovies } from "./FavMoviesContext.jsx";
function Home() {
  const [searchQuerry, setsearchQuerry] = useState("");
  // const [movies, setmovies] = useState([]);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);
  const { movies, setmovies } = useMovies();
   const {favMovies, setfavMovies} = useFavmovies();
  async function onFav(id) {
    const newfav = await movies.find((movie) => movie.ids.imdb == id);
    console.log("new fav", newfav);
    setfavMovies([...favMovies, newfav]);
    console.log(favMovies,"fav movies");
  }
  async function enhancemovies(movielist) {
    const updatedMovies = await Promise.all(
      movielist.map((movie) => {
        const getAdditional = async () => {
          const additional = await getAdditionalInfo(movie.ids.imdb);
          return { ...movie, ...additional };
        };

        return getAdditional();
      })
    );

    return updatedMovies;
  }

  function handlesubmit(e) {
    e.preventDefault();
    const loadsmovie = async () => {
      try {
        console.log("loading for searched movies");
        const searchresult = await SearchMovies(searchQuerry);

        const movieData = searchresult.map((result) => result.movie);
        const updtdmovieData = await enhancemovies(movieData);
        setmovies(updtdmovieData);
        setsearchQuerry("");
      } catch (err) {
        seterror(err);
        console.log("failed to search for movies");
      } finally {
        setloading(false);
      }
    };
    loadsmovie();
  }

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log("Fetching popular movies...");
        const popularmovies = await getPopularMovies();
        const updtedpopularmovies = await enhancemovies(popularmovies);
        setmovies(updtedpopularmovies);
      } catch (err) {
        console.log(err);
        seterror("Failed to fetch movies");
      } finally {
        setloading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <>
      <div className="search">
        <form onSubmit={handlesubmit}>
          <input
            className="search-box"
            type="text"
            placeholder="Search for a Movie"
            value={searchQuerry}
            onChange={(e) => setsearchQuerry(e.target.value)}
          />
          <button type="submit" className="submit-button">
            Search
          </button>
        </form>
      </div>
      <div className="movie-box">
        {Array.isArray(movies) && movies.length > 0 ? (
          movies.map(
            (movie) =>
              movie &&
              movie.title
                .toLowerCase()
                .startsWith(searchQuerry.toLowerCase()) && (
                <Moviecard
                  movie={movie}
                  onFav={onFav}
                  key={movie.id || movie.ids?.trakt || Math.random()}
                 
                />
              )
          )
        ) : (
          <p>No movies to display</p>
        )}
      </div>
    </>
  );
}

export default Home;
