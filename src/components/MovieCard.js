import React from "react";
import { NavLink } from "react-router-dom";

export default function MovieCard(props) {
  return (
    <div className="card-img-top">
      <NavLink to={`/movie/${props.imdbID}`}>{props.title} </NavLink>
      <img className="img-fluid" src={props.poster} alt="" />
      <div className="card-body">
        <p className="card-text">{props.imdbID}</p>
      </div>
    </div>
  );
}