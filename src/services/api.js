const api_key = "3e3fc871a13b47992c234b9bf10313e51eed7035be92ccf3154c626629dea727";
// const base_url="https://cors-anywhere.herokuapp.com/https://api.themoviedb.org/3";
const base_url = "https://api.trakt.tv";
const base_url_omdb = "http://www.omdbapi.com/?";
const api_key_omdb = "e0d02d31";
export const getPopularMovies = async () => {
  const headers = {
    "Content-type": "application/json",
    "trakt-api-key": api_key,
    "trakt-api-version": "2"
  };
  const res = await fetch(`${base_url}/movies/popular?page=1&limit=20?extended={images}`, { headers });
  const data = await res.json();
  return data;
}
export const SearchMovies = async (searchQuerry) => {
  const headers = {
    "Content-type": "application/json",
    "trakt-api-key": api_key,
    "trakt-api-version": "2"
  };
  const res = await fetch(`${base_url}/search/movie?&query=${encodeURIComponent(searchQuerry)}`, { headers });
  const data = await res.json();
  return data;
}
export const getAdditionalInfo = async (id) => {
  const res = await fetch(`${base_url_omdb}apikey=${api_key_omdb}&i=${id}`)
  const data = await res.json();

  return {
    "poster": data.Poster,
    "plot": data.Plot
  };
}