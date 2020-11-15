import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Table, Tabs, Tab, TabBar, TabContainer, Nav, Row, Col} from 'react-bootstrap';
import './ManageRequests.css';
import axios from 'axios';

const Request = props => (
  <tr>
    <td>{props.book._id.substring(props.book._id.length - 3, props.book._id.length)}</td>
    <td>{props.book.swap.request_date.substring(0,10)}</td>
    <td>{props.book.swap.requesting_user}</td>
    <td>{props.book.title}</td>
    <td>

      <Button id="accept-button" color="success" onClick={()=> { props.acceptRequest(props.book._id) }}>Accept</Button>
      <Button id="reject-button" color="danger" onClick={()=> { props.rejectRequest(props.book._id) }}>Reject</Button>
    </td>
  </tr>
)

const AReceived = props => (
  <tr>
    <td>{props.book._id.substring(props.book._id.length - 3, props.book._id.length)}</td>
    <td>{props.book.swap.request_date.substring(0,10)}</td>
    <td>{"Name: " + props.book.swap.requesting_user} <br/> {"Book Title:" + props.book.title}</td>
    <td>
      <Button id="shipped-button" color="warning" onClick={()=> { props.shipped() }}>Shipped</Button>
      <Button id="cancel-button" color="danger" onClick={()=> { props.cancel(props.book._id) }}>Cancel</Button>
    </td>
  </tr>
)

export class ManageRequests extends Component
{

  constructor(props) {
    super(props);

    this.acceptRequest = this.acceptRequest.bind(this)
    this.rejectRequest = this.rejectRequest.bind(this)
    this.shipped = this.shipped.bind(this)
    this.cancel = this.cancel.bind(this)

    this.state = {
      books: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/books/')
      .then(response => {
        this.setState({ books: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  acceptRequest(id) {

    const book = {
      // Get book field for this id
      books: this.state.books.filter(x => x._id === id)[0]
    }
    console.log(book.books); // prints field of current book

    book.books.swap.accepted = true; // Set accepted to true

    // Update book's "accepted" field with true
    axios.post('http://localhost:5000/books/update/'+ id, book.books)
      .then(response => { console.log(response.data)});

    // Remove this specific request from pending table
    this.setState({
      books: this.state.books.filter(el => el._id !== id)
    })

  }

  rejectRequest(id) {
    const book = {
      // Get book field for this id
      books: this.state.books.filter(x => x._id === id)[0]
    }
    console.log(book.books); // prints field of current book

    book.books.swap.rejected = true; // Set accepted to true

    // Update book's "accepted" field with true
    axios.post('http://localhost:5000/books/update/'+ id, book.books)
      .then(response => { console.log(response.data)});

    // Remove this specific request from pending table
    this.setState({
      books: this.state.books.filter(el => el._id !== id)
    })
  }

  shipped() {

  }

  cancel(id) {
    const book = {
      // Get book field for this id
      books: this.state.books.filter(x => x._id === id)[0]
    }
    console.log(book.books); // prints field of current book

    book.books.swap.rejected = true; // Set rejected to true
    book.books.swap.accepted = false; // Set accepted to false

    // Update book's "accepted" field with true
    axios.post('http://localhost:5000/books/update/'+ id, book.books)
      .then(response => { console.log(response.data)});

    // Remove this specific request from pending table
    this.setState({
      books: this.state.books.filter(el => el._id !== id)
    })
  }

  requestList() {
    return this.state.books.map(currentrequest => {
      if(currentrequest.swap.accepted == false && currentrequest.swap.rejected == false)
        return <Request book={currentrequest} acceptRequest={this.acceptRequest} rejectRequest={this.rejectRequest} key={currentrequest._id}/>;
    })
  }

  acceptedList() {
    return this.state.books.map(currentrequest => {
      if(currentrequest.swap.accepted == true)
        return <AReceived book={currentrequest} shipped={this.shipped} cancel={this.cancel} key={currentrequest._id}/>;
    })
  }

  render(){
    const pendingReceivedHeader = () => {
        let headerElement = ['id', 'date', 'name', 'book', 'action']
        let hoverElement = [
        'Unique request number.',
        'Date the swap request was requested.',
        'Name of person requesting book.',
        'Book being requested.',
        'Click "Accept" to accept swap. Click "Reject" to reject swap.']
        return headerElement.map((key, index) => {
            return <th id={key} key={index}>{key.toUpperCase()}
              <span id={key + "-text"}>{hoverElement[index]}</span>
            </th>
        })
    }

    const pendingSentHeader = () => {
        let headerElement = ['id', 'date', 'name', 'book', 'action']
        let hoverElement = [
        'Unique request number.',
        'Date the swap request was requested.',
        'Name of person you are requesting book from.',
        'Book being requested.',
        'Your request is currently pending.']
        return headerElement.map((key, index) => {
            return <th id={key} key={index}>{key.toUpperCase()}
              <span id={key + "-text"}>{hoverElement[index]}</span>
            </th>
        })
    }

    const acceptedReceivedHeader = () => {
        let headerElement = ['id', 'date', 'details', 'action']
        let hoverElement = [
        'Unique request number.',
        'Date the swap request was requested.',
        'Provides name of requester, book being requested, and mailing address to ship to.',
        'Click "Send" when you have shipped the book.\
        Click "Cancel request" if you want to cancel this request.']
        return headerElement.map((key, index) => {
            return <th id={key} key={index}>{key.toUpperCase()}
              <span id={key + "-text"}>{hoverElement[index]}</span>
            </th>
        })
    }

    const acceptedSentHeader = () => {
        let headerElement = ['id', 'date', 'details', 'action']
        let hoverElement = [
        'Unique request number.',
        'Date the swap request was requested.',
        'Provides book you requested.',
        'Click "Received" when you have received the book.']
        return headerElement.map((key, index) => {
            return <th id={key} key={index}>{key.toUpperCase()}
              <span id={key + "-text"}>{hoverElement[index]}</span>
            </th>
        })
    }

    return(
        <div>
          <p id="note">Note: Hover over each feature/action to get
            quick description of what it does or shows.</p>
          <h1 id="requestTitle">Manage Requests</h1>
          {/*pending and accepted tab*/}
          <Tabs className="top" defaultActiveKey="pending">
            {/*pending tab*/}
            <Tab eventKey="pending" title="Pending">
              <Tab.Container id="pendingRequest" defaultActiveKey="received">
                <Row>
                  <Col sm={2}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="received">Received</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={2}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="sent">Sent</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                </Row>
                <Tab.Content>
                  <Tab.Pane eventKey="received">
                    <Table className='pr-requests'>
                      <thead>
                        <tr>{pendingReceivedHeader()}</tr>
                      </thead>
                      <tbody>
                        { this.requestList() }
                      </tbody>
                    </Table>
                  </Tab.Pane>
                  <Tab.Pane eventKey="sent">
                    <Table className='ps-requests'>
                      <thead>
                        <tr>{pendingSentHeader()}</tr>
                      </thead>
                    </Table>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Tab> {/*pending tab END*/}

            {/*accepted tab*/}
            <Tab eventKey="accepted" title="Accepted">
              <Tab.Container id="acceptedRequest" defaultActiveKey="received">
                <Row>
                  <Col sm={2}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="received">Received</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                  <Col sm={2}>
                    <Nav variant="pills" className="flex-column">
                      <Nav.Item>
                        <Nav.Link eventKey="sent">Sent</Nav.Link>
                      </Nav.Item>
                    </Nav>
                  </Col>
                </Row>
                <Tab.Content>
                  <Tab.Pane eventKey="received">
                    <Table className='ar-requests'>
                      <thead>
                        <tr>{acceptedReceivedHeader()}</tr>
                      </thead>
                      <tbody>
                        { this.acceptedList() }
                      </tbody>
                    </Table>
                  </Tab.Pane>
                  <Tab.Pane eventKey="sent">
                    <Table className='as-requests'>
                      <thead>
                        <tr>{acceptedSentHeader()}</tr>
                      </thead>
                    </Table>
                  </Tab.Pane>
                </Tab.Content>
              </Tab.Container>
            </Tab> {/*accepted tab END*/}

          </Tabs> {/*pending and accepted tab tag END*/}

        </div>
    )
  }
}
