export const getPopularMovies=async ()=>{
    const headers = {
        "trakt-api-version": "2",
        "trakt-api-key": api_key
      };
    const res=await fetch(`${base_url}/movies/popular`,{headers});
    const data= await res.json();
    return data;
}