import React, { Component } from 'react';
import{NavLink} from 'react-router-dom';
import {Navbar, Nav, Form, FormControl, Button, NavDropdown} from 'react-bootstrap';

export class Navigation extends Component{
    render(){
        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="">BINDER</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto" >
                    <Nav.Link href="/Home">HOME</Nav.Link>
                    <Nav.Link href="/Bookswap">BOOK SWAP</Nav.Link>
                    <Nav.Link href="/Myaccount">MY ACCOUNT</Nav.Link>
                    <Nav.Link href="/Cservice">Q&A</Nav.Link>
                </Nav>
                <Nav>
                    <Nav.Link href="/Login">Log in</Nav.Link>
                    <Nav.Link eventKey={2} href="/Signin">
                        Sign up
                    </Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        )
    }
}