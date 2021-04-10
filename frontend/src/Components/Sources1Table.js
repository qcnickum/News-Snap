import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import "../styles.css";

import Footer from "./Footer";
import Header from "./Header";

async function createLL1 () {
  const res = await axios.get('https://api.cryptonator.com/api/ticker/btc-usd')
  if (res != null) {
    console.log(`${res.base}`);
    data.left = res.base;
  }
  else {
      throw 'res not defined';
    }
  }
// add headers if needed 
//data.left = getLL1(res) || data.left = {res.X} (depending on what I'm obtaining)
// else throw error
//
// function getLL1 (response) {
//  return <a href={res.X}>Filler</a>
//} Component didMount

// 
const data = [
   {left: 'link', center: 'link', right: 'link'},
   {left: 'link', center: 'link', right: 'link'},
   {left: 'link', center: 'link', right: 'link'},
   {left: 'link', center: 'link', right: 'link'},
   {left: 'link', center: 'link', right: 'link'}
 ];
 const columns = [{
   dataField: 'left',
   text: 'Left-Leaning',
   headerStyle: { backgroundColor: '#1167b1', color: 'antiquewhite' },
   style: { backgroundColor: '#090911'}
 }, {
   dataField: 'center',
   text: 'Center',
   headerStyle: { backgroundColor: '#7a52aa', color: 'antiquewhite' },
   style: { backgroundColor: '#090911'}
 }, {
   dataField: 'right',
   text: 'Right-Leaning',
   headerStyle: { backgroundColor: '#ff4d4d', color: 'antiquewhite' },
   style: { backgroundColor: '#090911'}
 }];

 class Sources1Table extends React.Component {
   // component didMount (pass 'getUser')
   render() {
     return (
       <div>
         <Header />

        <p className="Table-header"></p>
        <BootstrapTable keyField='left' data={ data } columns={ columns } />

        <Footer />
       </div>
     );
   }
 }

// <Link to="/Bubbles">
//<p>Homepage</p>

 export default Sources1Table;