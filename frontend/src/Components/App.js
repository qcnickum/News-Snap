import "../styles.css";
import React from "react";
import axios from 'axios';
import { Route } from 'react-router-dom';
import Bubbles from "./Bubbles";
import Sources1Table from "./SourcesTable";
import Sources2Table from "./SourcesTable";
import Sources3Table from "./SourcesTable";
import Sources4Table from "./SourcesTable";
import Sources5Table from "./SourcesTable";

let bubble1 = {
  color: '#F44854',
  width: '100px',
  height: '100px',
  topic: '',
}
let bubble2 = {
  color: '#629ED4',
  width: '100px',
  height: '100px',
  topic: '',
}
let bubble3 = {
  color: '#F88034',
  width: '100px',
  height: '100px',
  topic: '',
}
let bubble4 = {
  color: '#A473B5',
  width: '100px',
  height: '100px',
  topic: '',
}
let bubble5 = {
  color: '#77C77E',
  width: '100px',
  height: '100px',
  topic: '',
}

const bubbles = {
  bubble1,
  bubble2,
  bubble3,
  bubble4,
  bubble5
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bubble1Style: {
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
      },
      bubble2Style: {
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

      },
      bubble3Style: {
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
      },
      bubble4Style: {
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
      },
      bubble5Style: {
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
      },
      articles: new Array(5)
    }
  }

  setSize(numMentions) {
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
    this.setState({
      bubble1Style: {
        backgroundColor: bubble1.color,
        width: String(percentages[0]) + "vmin",
        height: String(percentages[0]) + "vmin",
        borderRadius: "50%",
        position: "absolute",
        top: "25%",
        left: "25%",
        transform: `translate(-50%, -50%)`,
        cursor: "pointer",
        textAlign: "center",
        lineHeight: String(percentages[0]) + "vmin",
        fontSize: String(percentages[0]) + "vmin",
        textDecoration: "none"
      },
      bubble2Style: {
        backgroundColor: bubble2.color,
        width: String(percentages[1]) + "vmin",
        height: String(percentages[1]) + "vmin",
        borderRadius: "50%",
        position: "absolute",
        top: "65%",
        left: "25%",
        transform: `translate(-50%, -50%)`,
        cursor: "pointer",
        textAlign: "center",
        lineHeight: String(percentages[1]) + "vmin",
        fontSize: String(percentages[1]) + "vmin",
        textDecoration: "none"

      },
      bubble3Style: {
        backgroundColor: bubble3.color,
        width: String(percentages[2]) + "vmin",
        height: String(percentages[2]) + "vmin",
        borderRadius: "50%",
        position: "absolute",
        top: "45%",
        left: "50%",
        transform: `translate(-50%, -50%)`,
        cursor: "pointer",
        textAlign: "center",
        lineHeight: String(percentages[2]) + "vmin",
        fontSize: String(percentages[2]) + "vmin",
        textDecoration: "none"
      },
      bubble4Style: {
        backgroundColor: bubble4.color,
        width: String(percentages[3]) + "vmin",
        height: String(percentages[3]) + "vmin",
        borderRadius: "50%",
        position: "absolute",
        top: "65%",
        left: "75%",
        transform: `translate(-50%, -50%)`,
        cursor: "pointer",
        textAlign: "center",
        lineHeight: String(percentages[3]) + "vmin",
        fontSize: String(percentages[3]) + "vmin",
        textDecoration: "none"
      },
      bubble5Style: {
        backgroundColor: bubble5.color,
        width: String(percentages[4]) + "vmin",
        height: String(percentages[4]) + "vmin",
        borderRadius: "50%",
        position: "absolute",
        top: "25%",
        left: "75%",
        transform: `translate(-50%, -50%)`,
        cursor: "pointer",
        textAlign: "center",
        lineHeight: String(percentages[4]) + "vmin",
        fontSize: String(percentages[4]) + "vmin",
        textDecoration: "none"
      },
      articles: new Array(5)
    })
  }

  componentDidMount() {
    axios.get('http://localhost:3001/api/articles/top-articles')
      .then((res) => {
        let relativeSizes = []
        let articles = []
        for (let i = 0; i < 5; i++) {
          relativeSizes.push(res.data[i].popularity)
          articles.push(res.data[i].articles)
          switch (i) {
            case 0:
              bubble1.topic = res.data[i].topic
              break;
            case 1:
              bubble2.topic = res.data[i].topic
              break;
            case 2:
              bubble3.topic = res.data[i].topic
              break;
            case 3:
              bubble4.topic = res.data[i].topic
              break;
            case 4:
              bubble5.topic = res.data[i].topic
              break;
            default:
              console.error('you messed up')
          }
        }
        this.setSize(relativeSizes)
        this.setState((state, props) => ({
          bubble1Style: state.bubble1Style,
          bubble2Style: state.bubble2Style,
          bubble3Style: state.bubble3Style,
          bubble4Style: state.bubble4Style,
          bubble5Style: state.bubble5Style,
          articles: articles,
        }))
      })
  }

  render() {
    const styles = {
      bubble1Style: this.state.bubble1Style,
      bubble2Style: this.state.bubble2Style,
      bubble3Style: this.state.bubble3Style,
      bubble4Style: this.state.bubble4Style,
      bubble5Style: this.state.bubble5Style,
    }
    return (
      <div className="App">
        <Route exact path="/">
          <Bubbles styles={styles} bubbles={bubbles} />
        </Route>
        <Route exact path="/Sources1Table">
          <Sources1Table articles={this.state.articles[0]} />
        </Route>
        <Route exact path="/Sources2Table">
          <Sources2Table articles={this.state.articles[1]} />
        </Route>
        <Route exact path="/Sources3Table">
          <Sources3Table articles={this.state.articles[2]} />
        </Route>
        <Route exact path="/Sources4Table">
          <Sources4Table articles={this.state.articles[3]} />
        </Route>
        <Route exact path="/Sources5Table">
          <Sources5Table articles={this.state.articles[4]} />
        </Route>
      </div>
    );
  }
}

export default App;
