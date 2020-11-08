import React, { Component } from 'react';
import {Jumbotron, Container} from 'react-bootstrap';

export class Bookpost extends Component
{
    JumboStyle = {
        bannerUrl: "",
        padding: "30px 30px",

      };

    render(){
        return(
            <div>
                <Jumbotron style={this.JumboStyle} fluid>
                <Container>
                    <h1>Post your book</h1>
                    <p>
                    This is a modified jumbotron that occupies the entire horizontal space of
                    its parent.
                    </p>
                </Container>
                </Jumbotron>
            </div>
        )
    }
}
