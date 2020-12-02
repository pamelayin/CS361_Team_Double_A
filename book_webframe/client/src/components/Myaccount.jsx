import React, { Component, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardTitle, CardImg, CardSubtitle, CardText } from "reactstrap";
import { Table, Tabs, Tab, TabContainer, Row, Col} from "react-bootstrap";
import axios from "axios";
import "./Myaccount.css";
import UserStore from '../userStore/userStore';

const PersonalInfo = props => (
	<div className="user-info">
  	<h5 id="lname-account">{"First Name: " + props.user.first_name}</h5>
		<h5 id="lname-account">{"Last Name: " + props.user.last_name}</h5>
		<h5 id="username-account">{"Username: " + props.user.username}</h5>
		<h5 id="password-account">{"Password: " + props.user.password}</h5>
		<h5 id="dob-account">{"Date of Birth: " + props.user.dob.substring(0, 10)}</h5>
		<h5 id="email-account">{"Email: " + props.user.email}</h5>
		<h5 id="mailing-address-account">{"Mailing Address: " + props.user.mailing_address}</h5>
		<h5 id="pendingpoints-account">{"Pending Points: " + props.user.pending_points}</h5>
		<h5 id="points-account">{"Points: " + props.user.points}</h5>
		<td>
			<Link style={{marginBottom: 20}} color="primary" to={"/EditMyaccount/" + props.user._id}>Edit</Link>
		</td>
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
			//available_books: [],
			user: [],
		};
	}

	async componentWillMount() {
		await this.setState({ username: UserStore.username});
	}

	componentDidMount() {
		axios
			.get("http://localhost:5000/users/")
			.then((response) => {
				this.setState({ users: response.data});
				this.setState({
					user: this.state.users.filter((user) => user.username === this.state.username)[0],
				});
			})
			.catch((error) => {
				console.log(error);
			});
			axios
				.get("http://localhost:5000/books/")
				.then((response) => {
					this.setState({ books: response.data});
					//this.setState({ available_books: this.state.books.filter(book => book.available === true)})
				})
				.catch((error) => {
					console.log(error);
				});
	}


// UserStore.username
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

// Copied from Booklist renderData()
	bookList() {
		return this.state.books.map((book, index) => {
			const {
				_id,
				title,
				author,
				book_points,
				image,
				available,
				posting_user
			} = book; //destructuring
			return (
				//show books that are posted by me
				available && (posting_user == this.state.username) && <Col lg={3} md={4} className="d-flex my-4">
					<Card key={_id} body className="text-center">
						<CardImg className="mx-auto" style={{width: "128px", height: "165px"}} src={image} alt="Not Available" onError={(e)=>{e.target.src="http://zldzksk1.dothome.co.kr/image/noimage.jpg"}}/>
						<CardBody className="d-flex flex-column flex-fill">
							<CardTitle tag="h5">{title}</CardTitle>
							<CardSubtitle tag="h6" className="mb-2">By {author}</CardSubtitle>
							<CardText>{book_points} Points</CardText>
							<Button
								className="btn btn-dark mt-auto algin-self-end"
								onClick={() => {
									this.deleteBook(_id);
								}}
								>
								Delete
							</Button>
						</CardBody>
					</Card>
				</Col>

			);
		});
	}

	deleteBook(id) {
		alert(
			"You have deleted the book. It will be removed from your account."
		);
		const book = {
			// Get book field for this id
			books: this.state.books.filter((x) => x._id === id)[0],
		};
		console.log("book", book.books.title);

		//const posting_user_book = book.books;
		//console.log("posting user", posting_user_book);

		const current_user = this.state.user;
		console.log("current user", current_user);

		current_user.points = current_user.points - 1;
		console.log("current user points", current_user.points);

		//book.books.posting_user = "false";
		//console.log("new posting user", posting_user_book.posting_user);

		// Update book's "accepted" field with true
		axios
			.all([
				//axios.post("http://localhost:5000/books/update/" + id, book.books),
				axios.post("http://localhost:5000/users/update/" + current_user._id, current_user),
			])
			.then(
				axios.spread((book_update, user_update) =>
					console.log(
						"book update:",
						book_update,
						"user update:",
						user_update
					)
				)
			)
			.catch((errors) => {
				console.log(errors);
			});

		axios.delete('http://localhost:5000/books/'+id)
	     .then(response => { console.log(response.data)});

		// Remove this specific request from pending table
		this.setState({
			books: this.state.books.filter((el) => el._id !== id),
		});

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
					{/*books tab*/}
					<Tab eventKey="my-books" title="My Books">
						<Tab.Container id="my-books-tab" defaultActiveKey="my-books">
							<Tab.Content>
								<Row className="my-4">
									{this.bookList()}
								</Row>
							</Tab.Content>
						</Tab.Container>
					</Tab>{" "}
				</Tabs>{" "}
				{/*books tab END*/}
				{/*my books and history tab tag END*/}
			</div>
		);
	}
}
