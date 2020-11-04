import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, ButtonGroup } from 'reactstrap';
import { Tabs, Tab, TabContainer } from 'react-bootstrap';


export class ManageRequests extends Component
{
    render(){
        return(
            <div>
                <p id="note">Note: Hover over each feature/action to get
                  quick description of what it does or shows.</p>
                <h1 id="requestTitle">Manage Requests</h1>
                <Tabs className="top" defaultActiveKey="pending" transition={false}>
                  <Tab eventKey="pending" title="Pending">
                    
                  </Tab>
                  <Tab eventKey="accepted" title="Accepted">

                  </Tab>
                </Tabs>
            </div>
        )
    }
}
