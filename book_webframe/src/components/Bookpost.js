import React, { Component } from 'react';
import {Jumbotron, Container, Form, Row, Col, Button} from 'react-bootstrap';

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
                <div>
                <Form>
                <Form.Group as={Row} controlId="formHorizontalEmail">
                    <Form.Label column sm={2}>
                    Title
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" placeholder="title" />
                    </Col>
                </Form.Group>

                <Form.Group as={Row} controlId="formHorizontalPassword">
                    <Form.Label column sm={2}>
                    Author
                    </Form.Label>
                    <Col sm={10}>
                    <Form.Control type="text" placeholder="Author" />
                    </Col>
                </Form.Group>
                    <div>
                    <Form.Group as={Row} controlId="formHorizontalPassword">
                        <Form.Label column sm={2}>
                        ISBN#
                        </Form.Label>
                        <Col sm={10}>
                        <Form.Control type="text" placeholder="ISBN#" />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col sm={{ span: 10, offset: 2 }}>
                        <Button>Verify</Button>
                        </Col>
                    </Form.Group>
                    </div>
                <fieldset>
                    <Form.Group as={Row}>
                    <Form.Label as="legend" column sm={2}>
                        Radios
                    </Form.Label>
                    <Col sm={10}>
                        <Form.Check
                        type="radio"
                        label="first radio"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios1"
                        />
                        <Form.Check
                        type="radio"
                        label="second radio"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios2"
                        />
                        <Form.Check
                        type="radio"
                        label="third radio"
                        name="formHorizontalRadios"
                        id="formHorizontalRadios3"
                        />
                    </Col>
                    </Form.Group>
                </fieldset>

                <Form.Group as={Row}>
                    <Col sm={{ span: 10, offset: 2 }}>
                    <Button>Cancel</Button>
                    <Button>Post</Button>
                    </Col>
                </Form.Group>
                </Form>
                </div>
            </div>
        )
    }
}
