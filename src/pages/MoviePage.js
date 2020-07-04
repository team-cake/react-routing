import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function MoviePage() {
  // ...
  const params = useParams();
  const [movieData, set_movieData] = useState();

  useEffect(() => {
    async function fetchData() {
      const queryParam = params.imdb_id;
      const url = `https://omdbapi.com/?i=${queryParam}&apikey=d7ccd6b9`;

      const data = await axios.get(url);

      set_movieData(data.data);
    }
    fetchData();
  }, [params.imdb_id]);
  const data = getMovieData(movieData);

  function getMovieData(data) {
    if (data) {
      return (
        <div>
          <h1>{data.Title}</h1>
          <p>Released in {data.Released}</p>
          <p>{data.Genre}</p>
          <img src={data.Poster} alt=""/>
          <p>Directed by:{data.Director}</p>
          <p>{data.Plot}</p>
        </div>
      );
    }
  }
  return <div>{data}</div>;
}