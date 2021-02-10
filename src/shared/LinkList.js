import React from "react";
import { Navbar } from "react-bulma-components";
import { Link } from "react-router-dom"; // Navbar.Link replaces this

export default function LinkList(props) {
  return (
    <>
      <Link className={props.className} to="/recipe/new">
        <Navbar.Link className={props.innerClassName} arrowless={true}>
          New Recipe
        </Navbar.Link>
      </Link>
      {/* <Link className={props.className} to="/dashboard">
        <Navbar.Link className={props.innerClassName} arrowless={true}>
          Dashboard
        </Navbar.Link>
      </Link>
      <Link className={props.className} to="/profile">
        <Navbar.Link className={props.innerClassName} arrowless={true}>
          Profile
        </Navbar.Link>
      </Link> */}
    </>
  );
}