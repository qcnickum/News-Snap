import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import "../styles.css";

import Footer from "./Footer";
import Header from "./Header";

const columns = [{
  dataField: 'left',
  text: 'Left-Leaning',
  formatter: (cell) => (
    <div>
      <a target="_blank" rel="noreferrer" href={cell}> {cell} </a>
    </div>),
  headerStyle: { backgroundColor: '#1167b1', color: 'antiquewhite' }
}, {
  dataField: 'center',
  text: 'Center',
  formatter: (cell) => (
    <div>
      <a target="_blank" rel="noreferrer" href={cell}> {cell} </a>
    </div>),
  headerStyle: { backgroundColor: '#7a52aa', color: 'antiquewhite' }
}, {
  dataField: 'right',
  text: 'Right-Leaning',
  formatter: (cell) => (
    <div>
      <a target="_blank" rel="noreferrer" href={cell}> {cell} </a>
    </div>),
  headerStyle: { backgroundColor: '#ff4d4d', color: 'antiquewhite' }
}];

// const linkFormatter = (value, url) => `<a href='${url}'>${value}</a>`

class Sources1Table extends React.Component {
  constructor(props) {
    super(props)
    let data = []
    for (let i = 0; i < Math.max(props.articles.left.length, props.articles.center.length, props.articles.right.length); i++) {
      data.push({ left: `${props.articles.left[i] ? props.articles.left[i].url : ''}`, center: `${props.articles.center[i] ? props.articles.center[i].url : ''}`, right: `${props.articles.right[i] ? props.articles.right[i].url : ''}` })
    }
    this.state = { data }
  }

  render() {
    return (
      <div>
        <Header />

        <p className="Table-header"></p>
        <BootstrapTable className="table" striped hover keyField='left' data={this.state.data} columns={columns} />

        <Footer />
      </div>
    );
  }
}

export default Sources1Table;
