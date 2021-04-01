import "../styles.css";
import React from "react";
import { Route, Link } from 'react-router-dom';
import Bubbles from "./Bubbles";
import Sources1Table from "./Sources1Table";
import Sources2Table from "./Sources1Table";
import Sources3Table from "./Sources1Table";
import Sources4Table from "./Sources1Table";
import Sources5Table from "./Sources1Table";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Bubbles} />
        <Route exact path="/Sources1Table" component={Sources1Table} />
        <Route exact path="/Sources2Table" component={Sources2Table} />
        <Route exact path="/Sources3Table" component={Sources3Table} />
        <Route exact path="/Sources4Table" component={Sources4Table} />
        <Route exact path="/Sources5Table" component={Sources5Table} />
      </div>
    );
  }
}

export default App;
