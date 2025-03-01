function Moviecard({ movie ,onFav , isFav}) {
function OpenImdb(){
  window.open(`https://www.imdb.com/title/${movie.ids.imdb}/`)
}

console.log(`Movie ${movie.title} isFav:`, isFav);
  return (
    <>
      <div className="movie-card" >
        <div className="image" onClick={OpenImdb}>
          <img
            src={movie.poster}
            alt={`${movie.title} poster`}
            className="movie-image"
          />
        </div>
        <p className="movie-name">{movie.title}</p>

        <div className="movie-overlay">
          <button className="like-button" onClick={() => onFav(movie.ids.imdb)} 
          style={isFav ? {background : "#ff4d4d" ,color : "#1e1e1e"} : {}}>
            &#x2764;
          </button>
        </div>
        <div className="movie-description">
          <h3>{movie.plot}</h3>
          <p>{movie.year}</p>
        </div>
      </div>
    </>
  );
}

export default Moviecard;
