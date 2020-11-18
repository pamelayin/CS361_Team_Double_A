import React, { Component, useState } from 'react';
import {Jumbotron, Container, Form, Row, Col, Button, Tab, Tabs} from 'react-bootstrap';
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
        bookCondition:'Fair',
        bookPrice:'10',
        bookAvail:true,
        bookImg:'',
        swap: {
            requested:false,
            accepted:false,
            shipped:false,
            received:false,
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

    onChangeCondition(e){
        if(e.target.value === 'As New'){
            this.setState({
                bookCondition: e.target.value,
                bookPrice: "30"
            })    
        };
        
        if(e.target.value === 'Very Good'){
            this.setState({
                bookCondition: e.target.value,
                bookPrice: "25"
            })    
        };

        if(e.target.value === 'Good'){
            this.setState({
                bookCondition: e.target.value,
                bookPrice: "20"
            })    
        };

        if(e.target.value === 'Fair'){
            this.setState({
                bookCondition: e.target.value,
            })    
        };
        //console.log(this.state.bookcondition);
    }

    onSubmit(e) {
        e.preventDefault();

        const book = {
        isbn : this.state.getIsbn,
		title : this.state.bookTitle,
		author : this.state.bookAuthor,
		publishing_date : this.state.bookPublish,
		posting_user : "testUser",
		condition : this.state.bookCondition,
		book_points : this.state.bookPrice,
		available : this.state.bookAvail,
		image : this.state.bookImg,
		swap: {
			requested: this.state.swap.requested,
			accepted: this.state.swap.accepted,
			shipped: this.state.swap.requested,
			received: this.state.swap.requested,
			request_date: this.state.swap.requested,
			requesting_user: this.state.swap.requested,
		},
        }
        //console.log(book);

        axios.post('http://localhost:5000/books/add', book)
        .then(res => console.log(res.data));
        //window.location = '/';
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
                        <div style={{float:"left", width:"50%", paddingLeft:"30px", marginTop:"-10px"}}>
                            <Tabs className="top-accountpage" defaultActiveKey="question">
                                {/*my books tab*/}
                                <Tab eventKey="question" title="How it works?">
                                    <Tab.Container id="question-tab" defaultActiveKey="question">
                                        <p>Test 2</p>
                                    </Tab.Container>
                                </Tab> {/*my books tab END*/}

                                {/*history tab*/}
                                <Tab eventKey="faq" title="FAQ">
                                    <Tab.Container id="faq-tab" defaultActiveKey="question">
                                        <Tab.Content>
                                            <p>Test</p>
                                        </Tab.Content>
                                    </Tab.Container>
                                </Tab> 
                            </Tabs> 
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
                            <Form onSubmit={this.onSubmit.bind(this)}>
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
                                        label="As New"
                                        name="condition"
                                        id="condition1"
                                        value="As New"
                                        checked = {this.state.bookCondition === 'As New'}
                                        onChange={this.onChangeCondition.bind(this)}
                                        />
                                        <Form.Check 
                                        type="radio"
                                        label="Very Good"
                                        name="condition"
                                        id="condition2"
                                        value="Very Good"
                                        checked = {this.state.bookCondition === 'Very Good'}
                                        onChange={this.onChangeCondition.bind(this)}
                                        />
                                        <Form.Check 
                                        type="radio"
                                        label="Good"
                                        name="condition"
                                        id="condition3"
                                        value="Good"
                                        checked = {this.state.bookCondition === 'Good'}
                                        onChange={this.onChangeCondition.bind(this)}
                                        />
                                        <Form.Check 
                                        type="radio"
                                        label="Fair"
                                        name="condition"
                                        id="condition3"
                                        value="Fair"
                                        checked = {this.state.bookCondition === 'Fair'}
                                        onChange={this.onChangeCondition.bind(this)}
                                        />
                                    </Col>
                                    </Form.Group>
                                </fieldset>
                                <Form.Group as={Row}>
                                    <Col sm={{ span: 10, offset: 2 }}>
                                    <Button type="cancel" style={{marginRight:"15px", backgroundColor:"#dc3545"}}>Cancel</Button>
                                    <Button type="submit">Post</Button>
                                    </Col>
                                </Form.Group>
                            </Form>
                        </div>
                        <div style={{float:"left", width:"50%", paddingLeft:"30px", marginTop:"-10px"}}>

                            <Tabs className="top-accountpage" defaultActiveKey="question">
                                {/*my books tab*/}
                                <Tab eventKey="question" title="How it works?">
                                    <Tab.Container id="question-tab" defaultActiveKey="question">
                                        <p>Test 2</p>
                                    </Tab.Container>
                                </Tab> {/*my books tab END*/}

                                {/*history tab*/}
                                <Tab eventKey="faq" title="FAQ">
                                    <Tab.Container id="faq-tab" defaultActiveKey="question">
                                        <Tab.Content>
                                            <p>Test</p>
                                        </Tab.Content>
                                    </Tab.Container>
                                </Tab> 
                            </Tabs> 
                        </div>
                    </div>   
                )
            }
        }
}
