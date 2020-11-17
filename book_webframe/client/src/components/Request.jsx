import React, { Component } from "react";
import { Jumbotron, Container, Table, Row, Col, Button } from "reactstrap";
import catch22Img from "./asset/catch-22.jpg";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";

// const bookInfo = (props) => {
// 	const { state } = useLocation();
// 	return (
// 		<tr>
// 			<th>ISBN</th>
// 			<td>(state.books.isbn)</td>
// 		</tr>
// 	);
// };
{
	/* <tr>
	<th>Title</th>
	<td>Catch-22</td>
</tr>
<tr>
	<th>Author</th>
	<td>Joseph Heller</td>
</tr>
<tr>
	<th>Year</th>
	<td>2011</td>
</tr>
<tr>
	<th>Posting User</th>
	<td>pam</td>
</tr>
<tr>
	<th>Condition</th>
	<td>Acceptable</td>
</tr> */
}

export class Request extends Component {
	// constructor(props) {
	// 	super(props);

	// 	this.state = { books: [] };
	// }

	// componentDidMount() {
	// 	axios
	// 		.get("http://localhost:5000/request/" + id)
	// 		.then((response) => {
	// 			this.setState({ exercises: response.data });
	// 		})
	// 		.catch((error) => {
	// 			console.log(error);
	// 		});
	// }

	JumboStyle = {
		bannerUrl: "",
		padding: "30px 30px",
		background: "white",
		textAlign: "center",
	};

	render() {
		console.log(this.props.location.state.book, 'this.props')
		return (
			<div>
				<Jumbotron style={this.JumboStyle} fluid>
					<Container>
						<h1>Book Request</h1>
						<p>Please confirm your book request.</p>
					</Container>
				</Jumbotron>

				<Container>
					<Row>
						<Col xs={2}>
							<img src={this.props.location.state.book.image} className="py-5" />
						</Col>
						<Col>
							<Table className="table-borderless">
								<tbody>
								<tr>
									<th>ISBN</th>
									<td>{this.props.location.state.book.isbn}</td>
								</tr>
								<tr>
									<th>Title</th>
									<td>{this.props.location.state.book.title}</td>
								</tr>
								<tr>
									<th>Author</th>
									<td>{this.props.location.state.book.author}</td>
								</tr>
								<tr>
									<th>Year</th>
									<td>{this.props.location.state.book.publishing_date.substring(0, 4)}</td>
								</tr>
								<tr>
									<th>Posting User</th>
									<td>{this.props.location.state.book.posting_user}</td>
								</tr>
								<tr>
									<th>Condition</th>
									<td>{this.props.location.state.book.condition}</td>
								</tr>
								</tbody>
							</Table>
						</Col>
						<Col>
							<Table className="table-borderless">
								<tr>
									<th>50</th>
									<td>Points Available</td>
								</tr>
								<tr>
									<th>
										- <span className="text-danger">5</span>
									</th>
									<td>Points for Request</td>
								</tr>
							</Table>
							<div className="divider bg-dark">
								<hr />
							</div>
							<Table className="table-borderless">
								<tr>
									<th className="text-success">45</th>
									<td>Points Remain</td>
								</tr>
							</Table>
						</Col>
					</Row>
				</Container>

				<div className="d-flex justify-content-center pt-5">
					<Link to="/RequestConfirmation">
						<Button
							className="btn btn-lg btn-success mx-5"
							style={{ width: "200px" }}
						>
							Confirm Request
						</Button>
					</Link>
					<Link to="/Booklist">
						<Button
							className="btn btn-lg btn-danger mx-5 "
							style={{ width: "200px" }}
						>
							Cancel Request
						</Button>
					</Link>
				</div>
			</div>
		);
	}
}
