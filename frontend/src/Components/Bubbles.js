import React from "react";
import {Link} from 'react-router-dom';

import Footer from "./Footer";
import Header from "./Header";

//+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
// defines the color, width, and height of a bubble.
// NOTE: position controlled in styles.css
class bubble {
  constructor(color, width, height, topic) {
    this.color = color;
    this.width = width;
    this.height = height;
    this.topic = topic;
  }
}

function setSize(numMentions) {
  var mostMentions = 0;
  var i;
  for (i = 0; i < numMentions.length; i++) {
    if (numMentions[i] > mostMentions) {
      mostMentions = numMentions[i];
    }
  }

  var percentages = [];
  var j;
  for (j = 0; j < numMentions.length; j++) {
    percentages.push((numMentions[j] / mostMentions) * 100);
  }

  var z;
  for (z = 0; z < numMentions.length; z++) {
    percentages[z] = percentages[z] / 3;
  }

  // * 3 is currently a placeholder that seems to
  // get around the right size proportions.
  bubble1.width = String(percentages[0]) + "vmin";
  bubble1.height = String(percentages[0]) + "vmin";

  bubble2.width = String(percentages[1]) + "vmin";
  bubble2.height = String(percentages[1]) + "vmin";

  bubble3.width = String(percentages[2]) + "vmin";
  bubble3.height = String(percentages[2]) + "vmin";

  bubble4.width = String(percentages[3]) + "vmin";
  bubble4.height = String(percentages[3]) + "vmin";

  bubble5.width = String(percentages[4]) + "vmin";
  bubble5.height = String(percentages[4]) + "vmin";
}

let bubble1 = new bubble("#F44854", "100px", "100px", "Gamestop");
let bubble2 = new bubble("#629ED4", "100px", "100px", "Stocks");
let bubble3 = new bubble("#F88034", "100px", "100px", "Storms");
let bubble4 = new bubble("#A473B5", "100px", "100px", "Election");
let bubble5 = new bubble("#77C77E", "100px", "100px", "Apple");

var numMentions = [18, 17, 15, 10, 10];

setSize(numMentions);

// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

let bubble1Style = {
  backgroundColor: bubble1.color,
  width: bubble1.width,
  height: bubble1.height,
  borderRadius: "50%",
  position: "absolute",
  top: "25%",
  left: "25%",
  transform: `translate(-50%, -50%)`,
  cursor: "pointer",
  textAlign: "center",
  lineHeight: String(bubble1.height),
  fontSize: String(bubble1.height),
  textDecoration: "none"
};

let bubble2Style = {
  backgroundColor: bubble2.color,
  width: bubble2.width,
  height: bubble2.height,
  borderRadius: "50%",
  position: "absolute",
  top: "65%",
  left: "25%",
  transform: `translate(-50%, -50%)`,
  cursor: "pointer",
  textAlign: "center",
  lineHeight: String(bubble2.height),
  fontSize: String(bubble2.height),
  textDecoration: "none"
  
};

let bubble3Style = {
  backgroundColor: bubble3.color,
  width: bubble3.width,
  height: bubble3.height,
  borderRadius: "50%",
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: `translate(-50%, -50%)`,
  cursor: "pointer",
  textAlign: "center",
  lineHeight: String(bubble3.height),
  fontSize: String(bubble3.height),
  textDecoration: "none"
};

let bubble4Style = {
  backgroundColor: bubble4.color,
  width: bubble4.width,
  height: bubble4.height,
  borderRadius: "50%",
  position: "absolute",
  top: "65%",
  left: "75%",
  transform: `translate(-50%, -50%)`,
  cursor: "pointer",
  textAlign: "center",
  lineHeight: String(bubble4.height),
  fontSize: String(bubble4.height),
  textDecoration: "none"
};

let bubble5Style = {
  backgroundColor: bubble5.color,
  width: bubble5.width,
  height: bubble5.height,
  borderRadius: "50%",
  position: "absolute",
  top: "25%",
  left: "75%",
  transform: `translate(-50%, -50%)`,
  cursor: "pointer",
  textAlign: "center",
  lineHeight: String(bubble5.height),
  fontSize: String(bubble5.height),
  textDecoration: "none"
};

class Bubbles extends React.Component {
  render() {
    return (
      <div>
        <Header />
          <Link style={bubble1Style} to="/Sources1Table">
            <p className="topic">{bubble1.topic}</p>
          </Link>
          <Link style={bubble2Style} to="/Sources2Table">
            <p className="topic">{bubble2.topic}</p>
          </Link>
          <Link style={bubble3Style} to="/Sources3Table">
            <p className="topic">{bubble3.topic}</p>
          </Link>
          <Link style={bubble4Style} to="/Sources4Table">
            <p className="topic">{bubble4.topic}</p>
          </Link>
          <Link style={bubble5Style} to="/Sources5Table">
            <p className="topic">{bubble5.topic}</p>
          </Link>
        <Footer />
      </div>
    );
  }
}

export default Bubbles;
