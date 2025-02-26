const api_key = "3e3fc871a13b47992c234b9bf10313e51eed7035be92ccf3154c626629dea727";
const base_url = "https://api.trakt.tv";
const base_url_omdb = "https://www.omdbapi.com/?";
const api_key_omdb = "e0d02d31";

export const getPopularMovies = async (page = 1) => {
  const headers = {
    "Content-type": "application/json",
    "trakt-api-key": api_key,
    "trakt-api-version": "2",
  };
  const res = await fetch(`${base_url}/movies/popular?page=${page}&limit=12`, { headers });
  if (!res.ok) throw new Error("Failed to fetch popular movies");
  const data = await res.json();
  return data;
};

export const SearchMovies = async (searchQuerry, page = 1) => {
  const headers = {
    "Content-type": "application/json",
    "trakt-api-key": api_key,
    "trakt-api-version": "2",
  };
  const res = await fetch(`${base_url}/search/movie?page=${page}&query=${encodeURIComponent(searchQuerry)}`, { headers });
  if (!res.ok) throw new Error("Failed to search movies");
  const data = await res.json();
  return data;
};

export const getAdditionalInfo = async (id) => {
  const res = await fetch(`${base_url_omdb}apikey=${api_key_omdb}&i=${id}`);
  if (!res.ok) throw new Error("Failed to fetch additional info");
  const data = await res.json();
  return {
    poster: data.Poster,
    plot: data.Plot,
  };
};