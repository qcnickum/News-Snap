import React from "react";
import {Table} from "react-bootstrap"; 



class Sources extends React.Component {
  constructor(props) {
    super(props) //since we are extending class Table so we have to use super in order to override Component class constructor
    this.state = { //state is by default an object
       Links: [
          { Spectrum: Left, Article: 'Apple' },
          { Center: 2, Article: 'Storm' },
          { Right: 3, Article: 'Wasif' },
       ]
    }
 }
 renderTableData() {
  return this.state.students.map((student, index) => {
     const { id, name, age, email } = student //destructuring
     return (
        <tr key={id}>
           <td>{id}</td>
           <td>{name}</td>
           <td>{age}</td>
           <td>{email}</td>
        </tr>
     )
  })
}

render() {
  return (
     <div>
        <h1 id='title'>React Dynamic Table</h1>
        <table id='students'>
           <tbody>
              {this.renderTableData()}
           </tbody>
        </table>
     </div>
  )
}

/* export default Sources; */

https://dev.to/abdulbasit313/an-easy-way-to-create-a-customize-dynamic-table-in-react-js-3igg
https://www.valentinog.com/blog/html-table/
document.querySelector("a[href*="wsj"]");