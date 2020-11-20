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
import axios from "axios";
import "../App.css";


export class Booklist extends Component {
	constructor(props) {
		super(props);
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
					<td><img src={image} onError={(e)=>{e.target.src="http://zldzksk1.dothome.co.kr/image/noimage.jpg"}}/></td>
					<td>{isbn}</td>
					<td>{title}</td>
					<td>{author}</td>
					<td>{publishing_date.substring(0, 4)}</td>
					<td>{posting_user}</td>
					<td>{condition}</td>
					<td>{book_points}</td>
					<td>
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

						{this.renderTableData()}
					</tbody>
				</table>
			</div>
		);
	}
}
