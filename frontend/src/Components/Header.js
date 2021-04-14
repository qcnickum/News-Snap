import { logRoles } from "@testing-library/dom";
import React from "react";
import {Link} from 'react-router-dom';
import logo from "../imgs/news-snap-logo.png";

class Header extends React.Component {
  render() {
    return (
      <header>
        <Link style={{ textDecoration: 'none' }} to="/">
          <img className="logo" src={logo} alt="News Snap"></img>
        </Link>
      </header>
    );
  }
}

export default Header;
