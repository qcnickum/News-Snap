import React from "react";
import {Link} from 'react-router-dom';

class Header extends React.Component {
  render() {
    return (
      <header>
        <Link style={{ textDecoration: 'none' }} to="/">
          <h1 className="headerStyle">News Snap</h1>
        </Link>
      </header>
    );
  }
}

export default Header;
