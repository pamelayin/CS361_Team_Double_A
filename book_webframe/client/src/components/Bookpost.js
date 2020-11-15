import React, { Component, useState } from 'react';
import {Jumbotron, Container, Form, Row, Col, Button} from 'react-bootstrap';
import {Modal, ModalHeader, ModalBody, ModalFooter} from 'reactstrap'
import axios from 'axios';

export class Bookpost extends Component
{
    JumboStyle = {
        bannerUrl: "",
        padding: "30px 30px",

      };

    state={
        googleApi: 'AIzaSyBQfQo2qfxzIoUcw6fE6ShJdZFJDGBgwFU',
        
        button: '',
        isbnModal: false,
        book: false,
        getIsbn:'',
        bookTitle:'',
        bookAuthor:'',
        bookPublish:'',
        bookcondition:'',
        bookPrice:'',
        bookAvail:'',
        bookImg:'',
        swap: {
            requested:'',
            accepted:'',
            shipped:'',
            received:'',
            request_date:'',
            requesting_user:''
        } 
        
    };
       
    toggleisbnModal() {
        this.setState({
            isbnModal: !this.state.isbnModal,
        });
    }

    async getbook(){
        axios.get("https://www.googleapis.com/books/v1/volumes?q=isbn:"+this.state.getIsbn + "&key=" + this.state.googleApi).then((response) => {
            //console.log(response.data.items[0]);
            //console.log(response.data.items[0].volumeInfo.title);
            //console.log(response.data.items[0].volumeInfo.authors[0]);
            //console.log(response.data.items[0].volumeInfo.publishedDate);
            //console.log(!response.data.items[0].volumeInfo.imageLinks.smallThumbnail.isEmpty);
           // console.log(response.data.items[0].volumeInfo.imageLinks.smallThumbnail.isEmpty));

            if(response.data.items[0].volumeInfo.imageLinks !== undefined)
            {
                this.setState({
                    bookTitle: response.data.items[0].volumeInfo.title,
                    bookAuthor: response.data.items[0].volumeInfo.authors[0],
                    bookPublish: response.data.items[0].volumeInfo.publishedDate,
                    bookImg: response.data.items[0].volumeInfo.imageLinks.smallThumbnail,
                    button: true,
                })
            } else{
                this.setState({
                    bookTitle: response.data.items[0].volumeInfo.title,
                    bookAuthor: response.data.items[0].volumeInfo.authors[0],
                    bookPublish: response.data.items[0].volumeInfo.publishedDate,
                    bookImg: "http://zldzksk1.dothome.co.kr/image/noimage.jpg",
                    button: true,
                })                
            }

        }).catch(error => {
            this.setState({
                bookTitle: "Something went wrong, please check your ISBN#. If you are continuously getting this error, please contact us",
                bookImg: "http://zldzksk1.dothome.co.kr/image/noimage.jpg",
            })
        })
    }

    fillForm(){
        this.setState({
            isbnModal:false,
            book:true,
            button: ''
        })        
    }


    render(){
        if(!this.state.book){
            return (
                <div>
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
                    <div>
                        <div style={{float:"left", width:"45%"}}>
                            <Form>
                                <Form.Group controlId="formBasicEmail">
                                    <Row>
                                    <Col>
                                        <Form.Control type="text" placeholder="Please enter ISBN#" value={this.state.getIsbn} onChange={(e) => {
    
                                            let {getIsbn} = this.state;
                                            getIsbn = e.target.value;
                                            this.setState({getIsbn});
                                        }}/>
                                        <Form.Text className="text-muted">
                                        Please enter your ISBN# without '-'. 
                                        </Form.Text>
                                    </Col>
                                    <Col>
                                    <div>
                                        <Button color="primary" onClick={()=> {this.toggleisbnModal(); this.getbook();}}>Get book data</Button>
                                        <Modal isOpen={this.state.isbnModal} toggle={this.toggleisbnModal.bind(this)}>
                                            <ModalHeader toggle={this.toggleisbnModal.bind(this)}>Your Book</ModalHeader>
                                            <ModalBody>
                                                <div style={{float:"left", width:"40%", paddingLeft:"20px"}}>
                                                    <img src={this.state.bookImg}></img>
                                                </div>
                                                <div style={{float:"right", width:"60%"}}>
                                                    <p><strong>[Book Info]</strong></p>
                                                    <p>{this.state.bookTitle}</p>
                                                    <p>{this.state.bookAuthor}</p>
                                                    <p>{this.state.bookPublish}</p>
                                                </div>
                                            </ModalBody>
                                            <ModalFooter>
                                                <Button style={{backgroundColor:"#dc3545"}} onClick={this.toggleisbnModal.bind(this)}>Cancel</Button>
                                                <Button color="primary" onClick={this.fillForm.bind(this)} disabled={!this.state.button}>Confirm</Button>{' '}
                                            </ModalFooter>
                                        </Modal>
                                    </div>
                                    </Col>
                                    </Row>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>    
                </div>
            )}
            else if(this.state.book){
                return(
                    <div>  
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
                        <div style={{float:"left", width:"45%", paddingLeft:"15px"}}> 
                            <h2>Post Form</h2>
                            <Form>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={2}> Title </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" name="bookTitle" value={this.state.bookTitle} disabled={!this.state.button}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={2}> Author </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" name="bookTitle" value={this.state.bookAuthor} disabled={!this.state.button}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={2}> Year </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" name="bookPublish" value={this.state.bookPublish} disabled={!this.state.button}/>
                                    </Col>
                                </Form.Group>
                                <Form.Group as={Row}>
                                    <Form.Label column sm={2}> ISBN# </Form.Label>
                                    <Col sm={10}>
                                        <Form.Control type="text" name="getIsbn" value={this.state.getIsbn} disabled={!this.state.button}/>
                                    </Col>
                                </Form.Group>
                                <fieldset>
                                <Form.Group as={Row}>
                                    <Form.Label as="legend" column sm={2}>Book Condition</Form.Label>
                                    <Col sm={10}>
                                        <Form.Check
                                        type="radio"
                                        label="Great"
                                        name="condition"
                                        id="condition1"
                                        />
                                        <Form.Check
                                        type="radio"
                                        label="Good"
                                        name="condition"
                                        id="condition2"
                                        />
                                        <Form.Check
                                        type="radio"
                                        label="Acceptable"
                                        name="condition"
                                        id="condition3"
                                        />
                                    </Col>
                                    </Form.Group>
                                </fieldset>
                                <Form.Group as={Row}>
                                    <Col sm={{ span: 10, offset: 2 }}>
                                    <Button type="submit" style={{marginRight:"15px", backgroundColor:"#dc3545"}}>Cancel</Button>
                                    <Button type="submit">Post</Button>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                    </div>   
                )
            }
        }
}
