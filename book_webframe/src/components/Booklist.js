import React, { Component } from 'react';
import { Button } from 'reactstrap';
import ReactFlexyTable from 'react-flexy-table';
import 'react-flexy-table/dist/index.css';
// import '../App.css';
export class Booklist extends Component
{
    render(){
        return(
            <div class="jumbotron jumbotron-fluid booklist">
                <div class="container">
                    <h1 class="display-4"> Book List</h1>
				    <p class="lead">These are the books available on our platform available for request.</p>
                </div>
            </div>
        
        )
    }
}
