import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'reactstrap';
import { Table, Tabs, Tab, TabContainer, Row, Col} from 'react-bootstrap';
import './Myaccount.css';

export class Myaccount extends Component
{
    render(){
      const historyHeader = () => {
          let headerElement = ['id', 'date', 'name', 'book', 'status']
          let hoverElement = [
          'Unique request number.',
          'Date the swap request was requested.',
          'Name of person requesting book.',
          'Book being requested.',
          'Status of swap.']
          return headerElement.map((key, index) => {
              return <th id={key} key={index}>{key.toUpperCase()}
                <span id={key + "-text"}>{hoverElement[index]}</span>
              </th>
          })
      }
        return(
            <div>
              <h1 id="accountTitle">My Account</h1>
              {/*TODO can't hard code date - need to populate*/}
              <p>USER ID: test account</p>
              <p>USABLE POINTS: 10pt</p>

              <Tabs className="top-accountpage" defaultActiveKey="my-books">
                {/*my books tab*/}
                <Tab eventKey="my-books" title="My Books">
                  <Tab.Container id="my-books-tab" defaultActiveKey="my-books">
                    <Row>
                      <Col>
                        <div className="box1"></div>
                      </Col>
                      <Col>
                        <div className="box1"></div>
                      </Col>
                      <Col>
                        <div className="box1"></div>
                      </Col>
                    </Row>
                    <Row>
                      <Col> {/*TODO button functionality once clicked*/}
                        <Button id= "button1" size="sm">Delete</Button>
                      </Col>
                      <Col>
                        <Button id= "button1" size="sm">Delete</Button>
                      </Col>
                      <Col>
                        <Button id= "button1" size="sm">Delete</Button>
                      </Col>
                    </Row>
                  </Tab.Container>
                </Tab> {/*my books tab END*/}

                {/*history tab*/}
                <Tab eventKey="history" title="History">
                  <Tab.Container id="history-tab" defaultActiveKey="my-books">
                    <Tab.Content>
                      <Table className='history-table'>
                        <thead>
                          <tr>{historyHeader()}</tr>
                        </thead>
                      </Table>
                    </Tab.Content>
                  </Tab.Container>
                </Tab> {/*history tab END*/}

              </Tabs> {/*my books and history tab tag END*/}
            </div>
        )
    }
}
