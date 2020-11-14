import React, { Component, useState } from 'react';
import{NavLink} from 'react-router-dom';
import {Navbar, Nav, Form, FormControl, Button, NavDropdown, Dropdown} from 'react-bootstrap';


function  Navigation () {
    const [show, setShow] = useState(false);
    const showDropdown = (e)=>{
        setShow(!show);
    }
    const hideDropdown = e => {
        setShow(false);
    }
    
        return(
            <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="">BINDER</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto" >
                    <Nav.Link href="/Home">HOME</Nav.Link>
                    <NavDropdown title="BOOK SWAP" id="collasible-nav-dropdown"
                    show={show}
                    onMouseEnter={showDropdown}
                    onMouseLeave={hideDropdown}
                    >
                        <NavDropdown.Item href="/Bookpost">Post Books</NavDropdown.Item>
                        <NavDropdown.Item href="/Booklist">Search Books</NavDropdown.Item>
                        <NavDropdown.Item href="/ManageRequests">Manage Requests</NavDropdown.Item>
                    </NavDropdown>
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

export default Navigation;
