import React, { Component } from 'react';
import {Jumbotron, Container, Accordion, Card, Button} from 'react-bootstrap';
import "./Cservice.css";

export class Cservice extends Component
{
    JumboStyle = {
		padding: "30px 30px",
		background: "linear-gradient(to right, #57d073, #0054d6)",
		color: "white",
    };
    
    render(){
        return(
            <div>
                <div fluid="true">
                    <Jumbotron style={this.JumboStyle} >
                        <Container>
                            <h1>Frequently Asked Question</h1>
                            <p>
                                If you have a question, please check the FNA section below. You will get the answer you are looking for
                            </p>
                        </Container>
                    </Jumbotron>
                </div>
                <div style={{float:"left", width:"30%"}} id="cominfo">
                <Card style={{ width: '19rem' }}>
                    <Card.Img variant="top" src="http://zldzksk1.dothome.co.kr/image/support2.png" fluid="true" />
                    <Card.Body fluid="true">
                        <Card.Title>BINDER</Card.Title>
                        <Card.Text>
                            BINDER team will strive to provide you our best service.<br/><br/>
                            ADDRESS: Corvallis, Oregon <br/>
                            HOURS: 10AM-5PM / Mon to Fri<br/>
                            CONTACT: support@binder.com<br/>
                        </Card.Text>
                    </Card.Body>
                </Card>
                </div>
                <div style={{float:"left", width:"70%"}} fluid="true">
                <Accordion defaultActiveKey="0" fluid="true">
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="Dark" eventKey="0">
                            What is the BINDER?
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body>
                            BINDER is a web-based application that allows people to share their old books with other users. 
                            If you share your old books, you will get points. And you can get new books with the points.
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="Dark" eventKey="1">
                            How it works?
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="1">
                        <Card.Body>
                            BINDER is the trust-based application among people. If you post your book on BINDER, your book will be listed on BINDER.
                            Then, ohter users can see your book, and they will send you a swap request. If you want to send your book to the user,
                            you can accept the request. If you don't want to swap your book with the user, then simple reject the request and wait another request.
                            If you accepted the request, ship out your book. Once the user receive your book, you will earn points. 
                            Now you can get your book with the points!
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="Dark" eventKey="2">
                            How can I send a book?
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="2">
                        <Card.Body>
                            You can send your book with major carriers such as FedEx, USPS or USP at your cost. 
                            If you become a Loyal User, we supports your shipping cost!
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="Dark" eventKey="3">
                            How do I know a user received my book?
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="3">
                        <Card.Body>
                            Once user received your book, the user will confirm that he/she got the book.
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="Dark" eventKey="4">
                            How should I do it recipient does not confirm it?  
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="4">
                        <Card.Body>No worries, It will be automatically confirmed after 30 days!</Card.Body>
                        </Accordion.Collapse>
                    </Card>
                    <Card>
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="Dark" eventKey="5">
                            Can't you solve your problem?
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey="5">
                        <Card.Body>
                            I am sorry about we are not able to help on your question. Please contact us by email at support@binder.com
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
                </div>
            </div>
        )
    }
}
