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
import "../App.css";

export class Booklist extends Component {
	// https://dev.to/abdulbasit313/an-easy-way-to-create-a-customize-dynamic-table-in-react-js-3igg
	// renderTableHeader() {
	// 	let header = Object.keys(this.state.books[0]);
	// 	return header.map((key, index) => {
	// 		return <th key={index}>{key.toUpperCase()}</th>;
	// 	});
	// }
	// renderTableData() {
	// 	return this.state.books.map((books, index) => {
	// 		const {
	// 			id,
	// 			isbn,
	// 			title,
	// 			author,
	// 			year,
	// 			postUser,
	// 			condition,
	// 			points,
	// 		} = books; //destructuring
	// 		return (
	// 			<tr key={id}>
	// 				<td>{isbn}</td>
	// 				<td>{title}</td>
	// 				<td>{author}</td>
	// 				<td>{year}</td>
	// 				<td>{postUser}</td>
	// 				<td>{condition}</td>
	// 				<td>{points}</td>
	// 				<td>{action}</td>
	// 			</tr>
	// 		);
	// 	});
	// }

	JumboStyle = {
		bannerUrl: "",
		padding: "30px 30px",
		background: "white",
		textAlign: "center",
	};
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
						{/* <tr>{this.renderTableHeader()}</tr> 
						 {this.renderTableData()}  */}
						<tr>
							<th>Image</th>
							<th>ISBN</th>
							<th>Title</th>
							<th>Author</th>
							<th>Year</th>
							<th>Posting User</th>
							<th>Condition</th>
							<th>Points</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						<tr>
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
						</tr>
						{/* <tr>
							<td>{isbn}</td>
							<td>{title}</td>
							<td>{author}</td>
							<td>{year}</td>
							<td>{postUser}</td>
							<td>{condition}</td>
							<td>{points}</td>
							<td>{action}</td>
						</tr> */}
					</tbody>
				</table>
			</div>
		);
	}
}
