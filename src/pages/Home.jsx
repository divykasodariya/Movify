import Moviecard from "../components/Moviecard";
import { useState, useEffect, useRef } from "react";
import {
  SearchMovies,
  getPopularMovies,
  getAdditionalInfo,
} from "../services/api";
import { useMovies } from './MoviesContext.jsx';
import { useFavmovies } from "./FavMoviesContext.jsx";

function Home() {
  const [searchQuerry, setsearchQuerry] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true); // Track if more movies are available
  const { movies, setmovies } = useMovies();
  const { favMovies, setfavMovies } = useFavmovies();
  const loaderRef = useRef(null);

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

  async function enhancemovies(movielist) {
    const updatedMovies = await Promise.all(
      movielist.map(async (movie) => {
        try {
          const additional = await getAdditionalInfo(movie.ids.imdb);
          return { ...movie, ...additional };
        } catch (err) {
          console.error(`Failed to enhance movie ${movie.title}:`, err);
          return movie;
        }
      })
    );
    return updatedMovies;
  }

  async function fetchMovies(isSearch = false) {
    if (!hasMore || loading) return; // Prevent fetching if no more data or already loading
    try {
      setloading(true);
      seterror(null); // Clear previous errors
      let movieData;
      if (isSearch && searchQuerry) {
        const searchresult = await SearchMovies(searchQuerry, page);
        console.log("Search result:", searchresult); // Debug raw API response
        movieData = searchresult.map((result) => result.movie);
      } else {
        movieData = await getPopularMovies(page);
        console.log("Popular movies:", movieData); // Debug raw API response
      }
      const updtdmovieData = await enhancemovies(movieData);
      console.log("Enhanced movies:", updtdmovieData); // Debug enhanced data
      setmovies((prevMovies) => [...prevMovies, ...updtdmovieData]);
      // Check if fewer movies than limit (20) were returned, indicating no more data
      if (movieData.length < 20) setHasMore(false);
    } catch (err) {
      seterror(err.message);
      console.error("Fetch error:", err);
    } finally {
      setloading(false);
    }
  }

  function handlesubmit(e) {
    e.preventDefault();
    if (!searchQuerry) return;
    setmovies([]);
    setPage(1);
    setHasMore(true); // Reset for new search
    fetchMovies(true);
    setsearchQuerry("");
  }

  useEffect(() => {
    fetchMovies(); // Initial load
  }, []);

  useEffect(() => {
    if (page > 1) fetchMovies(searchQuerry !== "");
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore && movies.length > 0) {
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 0.1, rootMargin: "100px" } // Trigger 100px before bottom
    );
    if (loaderRef.current) observer.observe(loaderRef.current);
    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loading, hasMore]);

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
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {Array.isArray(movies) && movies.length > 0 ? (
          movies.map((movie) =>
            movie && movie.title ? (
              <Moviecard
                movie={movie}
                onFav={onFav}
                isFav={favMovies.some(favMovie => favMovie.ids.imdb === movie.ids.imdb)}

                key={movie.id || Math.random()}
              />
            ) : null
          )
        ) : (
          !loading && <p>No movies to display</p>
        )}
        <div ref={loaderRef} style={{ height: "50px" }} />
      </div>
      {loading && <p>Loading {movies.length > 0 ? "more" : ""} movies...</p>}
    </>
  );
}

export default Home;