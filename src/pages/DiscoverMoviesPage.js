import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { useHistory, useParams } from "react-router-dom";

export default function DiscoverMoviesPage() {
  const [searchText, set_searchText] = useState("");
  const [status, set_status] = useState({ status: "idle" });
  const params = useParams();
  const history = useHistory();

  const navigateToSearch = () => {
    const routeParam = encodeURIComponent(searchText);
    history.push(`/discover/${routeParam}`);
  };

  console.log("searchText", searchText);
  console.log("params.searchtext", params.searchtext);

  const search = async () => {
    set_status({ status: "searching" });

    const queryParam = encodeURIComponent(params.searchtext);

    const data = await axios.get(
      `https://omdbapi.com/?apikey=d7ccd6b9&s=${queryParam}`
    );

    set_status({ status: "done", data: data.data.Search });
  };

  useEffect(() => {
    search();
  }, [params.searchtext]);

  const message = getMessage(status);
  const data = getData(status);

  function getMessage(status) {
    if (status.status === "done") {
      return "Done:\n";
    } else if (status.status === "searching") {
      return "Searching for your data...";
    } else {
      return "";
    }
  }

  function getData(status) {
    if (status.data) {
      return status.data.map((movie, id) => {
        return (
          <div className="col-3" key={id + 1}>
            <MovieCard
              title={movie.Title}
              poster={movie.Poster}
              imdbID={movie.imdbID}
            />
          </div>
        );
      });
    }
  }

  return (
    <div>
      <h1>Discover some movies!</h1>
      <h2>{message}</h2>
      <p>
        <input
          value={searchText}
          onChange={(e) => set_searchText(e.target.value)}
        />
        <button className="btn btn-primary" onClick={navigateToSearch}>
          Search
        </button>
      </p>
      <div className="container">
        <div className="row">{data}</div>
      </div>
    </div>
  );
}