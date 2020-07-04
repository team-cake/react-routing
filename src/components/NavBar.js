import React from "react";
import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="NavBar">
      <p><NavLink exact to="/">
      Home{" "}
      </NavLink></p>
      <p><NavLink to="/discover/searchtext">Discover Movies </NavLink></p>
      <p><NavLink to="/about">About </NavLink></p>
    </div>
  );
}