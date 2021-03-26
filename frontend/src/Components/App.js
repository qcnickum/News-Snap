import "../styles.css";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Bubbles from "./Bubbles";
/* import Sources from "./Sources"; */

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Bubbles />
        <Footer />
      </div>
    );
  }
}

export default App;
