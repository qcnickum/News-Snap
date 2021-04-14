import React from "react";
import {Link} from 'react-router-dom';

import Footer from "./Footer";
import Header from "./Header";

class Bubbles extends React.Component {
  render() {
    return (
      <div>
        <Header />
          <Link style={this.props.styles.bubble1Style} to="/Sources1Table">
            <p className="topic">{this.props.bubbles.bubble1.topic}</p>
          </Link>
          <Link style={this.props.styles.bubble2Style} to="/Sources2Table">
            <p className="topic">{this.props.bubbles.bubble2.topic}</p>
          </Link>
          <Link style={this.props.styles.bubble3Style} to="/Sources3Table">
            <p className="topic">{this.props.bubbles.bubble3.topic}</p>
          </Link>
          <Link style={this.props.styles.bubble4Style} to="/Sources4Table">
            <p className="topic">{this.props.bubbles.bubble4.topic}</p>
          </Link>
          <Link style={this.props.styles.bubble5Style} to="/Sources5Table">
            <p className="topic">{this.props.bubbles.bubble5.topic}</p>
          </Link>
        <Footer />
      </div>
    );
  }
}

export default Bubbles;
