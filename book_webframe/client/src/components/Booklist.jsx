import React, { Component } from "react";
import {
	Jumbotron,
	Container,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
} from "reactstrap";
import catch22Img from "./asset/catch-22.jpg";
import ctciImg from "./asset/ctci.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
import "../App.css";

// const Book = props => (
// 	<tr>
// 	  <td>{props.exercise.username}</td>
// 	  <td>{props.exercise.description}</td>
// 	  <td>{props.exercise.duration}</td>
// 	  <td>{props.exercise.date.substring(0,10)}</td>
// 	  <td>
// 		<Link to={"/edit/"+props.exercise._id}>edit</Link> | <a href="#" onClick={() => { props.deleteExercise(props.exercise._id) }}>delete</a>
// 	  </td>
// 	</tr>
//   )

export class Booklist extends Component {
	constructor(props) {
		super(props);

		// this.requestBook = this.requestBook.bind(this);

		this.state = { books: [], available_books: [] };
	}

	componentDidMount() {
		axios
			.get("http://localhost:5000/books/")
			.then((response) => {
				this.setState({ books: response.data });
				this.setState({ available_books: this.state.books.filter(book => book.available === true)})
			})
			.catch((error) => {
				console.log(error);
			});
	}
	// https://dev.to/abdulbasit313/an-easy-way-to-create-a-customize-dynamic-table-in-react-js-3igg
	// renderTableHeader() {
	// 	let header = Object.keys(this.state.books[0]);
	// 	return header.map((key, index) => {
	// 		return <th key={index}>{key.toUpperCase()}</th>;
	// 	});
	// }
	renderTableData() {
		return this.state.books.map((book, index) => {
			const {
				_id,
				isbn,
				title,
				author,
				publishing_date,
				posting_user,
				condition,
				book_points,
				image,
				available
			} = book; //destructuring
			return (
				available && <tr key={_id}>
					<td><img src={image} /></td>
					<td>{isbn}</td>
					<td>{title}</td>
					<td>{author}</td>
					<td>{publishing_date.substring(0, 4)}</td>
					<td>{posting_user}</td>
					<td>{condition}</td>
					<td>{book_points}</td>
					<td>
						{/* <Link
						to={{
						pathname: `/Request/{_id}`,
						state: { key: book },
						}}
						> */}
							<Button
								className="btn btn-dark"
								onClick={() => {
									this.props.history.push({
										pathname: `/Request`,
										state: { book },
						
									});
								}}
							>
								Request
							</Button>
						{/* </Link> */}
					</td>
				</tr>
			);
		});
	}

	JumboStyle = {
		bannerUrl: "",
		padding: "30px 30px",
		background: "white",
		textAlign: "center",
	};

	// requestBook(id) {
	// 	this.props.history.push({
	// 		state: {
	// 			key: id
	// 		}
	// 	})
	// }
	render() {
		return (
			<div>
				<Jumbotron style={this.JumboStyle} fluid>
					<Container>
						<h1>Book List</h1>
						<br />
						<p>Please select book you would like to request.</p>
						{/* <SearchBar
							filterText={this.state.filterText}
							onUserInput={this.handleUserInput.bind(this)}
						/> */}
					</Container>
				</Jumbotron>

				<Form>
					<FormGroup>
						<Label for="exampleSearch">Search</Label>
						<Input
							type="search"
							name="search"
							id="exampleSearch"
							placeholder="Search by ISBN, title, author, year, posting user, condition, or points"
						/>
					</FormGroup>
				</Form>

				<table className="table table-bordered table-hover">
					<thead className="table-success">
						<tr>
							<th>Image</th>
							<th>ISBN</th>
							<th>Title</th>
							<th>Author</th>
							<th>Publishing Year</th>
							<th>Posting User</th>
							<th>Condition</th>
							<th>Points</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{/*<tr>
							<td>
								<img src={catch22Img} />
							</td>
							<td>978-0-09952-912-5</td>
							<td>Catch-22</td>
							<td>Joseph Heller</td>
							<td>2011</td>
							<td>pam</td>
							<td>Acceptable</td>
							<td>5</td>
							<td>
								<Link to="/Request">
									<Button className="btn btn-success btn-sm">Request</Button>
								</Link>
							</td>
						</tr>
						<tr>
							<td>
								<img src={ctciImg} />
							</td>
							<td>978-0-98478-285-7</td>
							<td>Cracking the Coding Interview</td>
							<td>Gayle Laakmann McDowell</td>
							<td>2015</td>
							<td>codingPam</td>
							<td>Like New</td>
							<td>20</td>
							<td>
								<Button className="btn btn-dark btn-sm disabled">
									Request
								</Button>
							</td>
						</tr>{" "}
						*/}
						{this.renderTableData()}
					</tbody>
				</table>
			</div>
		);
	}
}
