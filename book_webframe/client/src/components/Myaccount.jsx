import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { Table, Tabs, Tab, TabContainer, Row, Col } from "react-bootstrap";
import axios from "axios";
import "./Myaccount.css";
import UserStore from '../userStore/userStore';

const PersonalInfo = props => (
	<div className="user-info">
  	<h5 id="lname-account">{"First Name: " + props.user.first_name}</h5>
		<h5 id="lname-account">{"Last Name: " + props.user.last_name}</h5>
		<h5 id="username-account">{"Username: " + props.user.username}</h5>
		<h5 id="dob-account">{"Date of Birth: " + props.user.dob.substring(0, 10)}</h5>
		<h5 id="email-account">{"Email: " + props.user.email}</h5>
		<h5 id="pendingpoints-account">{"Pending Points: " + props.user.pending_points}</h5>
		<h5 id="points-account">{"Points: " + props.user.points}</h5>
	</div>
)

const History = props => (
	<tr id="history-table">
		<td>{props.book._id.substring(props.book._id.length - 3, props.book._id.length)}</td>
		<td>{props.book.swap.request_date.substring(0,10)}</td>
		<td>
      {"Posting User: " + props.book.posting_user} <br/>
      {"Requesting User: " + props.book.swap.requesting_user} <br/>
    </td>
		<td>{props.book.title}</td>
		<div id="conditional">
			{(() => {
            if (props.book.swap.requested == true &&
							props.book.swap.accepted == true &&
							props.book.swap.received == true) {
              return (
                <td>Swapped</td>
              )
            } else if (props.book.swap.requested == true &&
							props.book.swap.accepted == true &&
							props.book.swap.rejected == true) {
              return (
                <td>Canceled</td>
              )
            } else if (props.book.swap.requested == true &&
							props.book.swap.accepted == false &&
							props.book.swap.rejected == true) {
              return (
                <td>Rejected</td>
              )
            } else {
              return (
                <td>Pending</td>
              )
            }
        })()}
		</div>
	</tr>
)

export class Myaccount extends Component {
	constructor(props) {
		super(props);
		this.personalInfo = this.personalInfo.bind(this)
		this.historyList = this.historyList.bind(this)

		//this.onSubmit = this.onSubmit.bind(this)
		this.state = {
			//user: UserStore.username,
			users: [],
			books: [],
		};
	}

	componentDidMount() {
		axios
			.get("http://localhost:5000/users/")
			.then((response) => {
				this.setState({ users: response.data});
			})
			.catch((error) => {
				console.log(error);
			});
			axios
				.get("http://localhost:5000/books/")
				.then((response) => {
					this.setState({ books: response.data});
				})
				.catch((error) => {
					console.log(error);
				});
	}



	personalInfo() {
		return this.state.users.map(currentuser => {
      if(currentuser.username == UserStore.username)
        return <PersonalInfo user={currentuser} key={currentuser._id}/>;
    })
	}

	historyList() {
		return this.state.books.map(request => {
      if((request.posting_user == UserStore.username || request.swap.requesting_user == UserStore.username) && request.swap.requested == true)
        return <History book={request} key={request._id}/>;
    })
	}

	render() {
		const historyHeader = () => {
			let headerElement = ["id", "date", "name", "book", "status"];
			let hoverElement = [
				"Unique request number.",
				"Date the swap request was requested.",
				"Name of user 'posting' and 'requesting' the book.",
				"Book being requested.",
				"Status of swap.",
			];
			return headerElement.map((key, index) => {
				return (
					<th id={key + "-table"} key={index}>
						{key.toUpperCase()}
						<span id={key + "-text"}>{hoverElement[index]}</span>
					</th>
				);
			});
		};
		return (
			<div>
				<h1 id="accountTitle">My Account</h1>
				{/*TODO can't hard code date - need to populate*/}
				<Tabs className="top-accountpage" defaultActiveKey="my-info">
					{/*personal info tab*/}
					<Tab eventKey="my-info" title="Personal Info">
						<Tab.Container id="my-info-tab" defaultActiveKey="my-info">
							<Tab.Content>
								<Table className="my-info-table">
									<thead>
										<tr>{ this.personalInfo() }</tr>
									</thead>
								</Table>
							</Tab.Content>
						</Tab.Container>
					</Tab>{" "}
					{/*personal info tab END*/}
					{/*history tab*/}
					<Tab eventKey="history" title="History">
						<Tab.Container id="history-tab" defaultActiveKey="history">
							<Tab.Content>
								<Table className="history-table">
									<thead>
										<tr>{historyHeader()}</tr>
									</thead>
									<tbody>
										{ this.historyList() }
									</tbody>
								</Table>
							</Tab.Content>
						</Tab.Container>
					</Tab>{" "}
					{/*history tab END*/}
				</Tabs>{" "}
				{/*my books and history tab tag END*/}
			</div>
		);
	}
}
