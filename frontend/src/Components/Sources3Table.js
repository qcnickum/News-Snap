import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';
import "../styles.css";

import Footer from "./Footer";
import Header from "./Header";

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
   headerStyle: { backgroundColor: '#1167b1', color: 'antiquewhite' }
 }, {
   dataField: 'center',
   text: 'Center',
   headerStyle: { backgroundColor: '#7a52aa', color: 'antiquewhite' }
 }, {
   dataField: 'right',
   text: 'Right-Leaning',
   headerStyle: { backgroundColor: '#ff4d4d', color: 'antiquewhite' }
 }];

 class Sources3Table extends React.Component {
   render() {
     return (
       <div>
         <Header />
         
        <p className="Table-header"></p>
        <BootstrapTable className="table" striped hover keyField='left' data={ data } columns={ columns }/>

        <Footer />
       </div>
     );
   }
 }

 export default Sources3Table;