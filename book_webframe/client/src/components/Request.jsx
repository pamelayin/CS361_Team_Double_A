import React, { Component } from "react";
import { Jumbotron, Container, Table, Row, Col, Button } from "reactstrap";
import { Link } from "react-router-dom";

export class Request extends Component {

	JumboStyle = {
		bannerUrl: "",
		padding: "30px 30px",
		background: "white",
		textAlign: "center",
	};
	
	render() {
		const { image, isbn, title, author, publishing_date, posting_user, condition, book_points } = this.props.location.state.book; 
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
							<img src={image} onError={(e)=>{e.target.src="http://zldzksk1.dothome.co.kr/image/noimage.jpg"}}className="py-5" />
						</Col>
						<Col>
							<Table className="table-borderless">
								<tbody>
								<tr>
									<th>ISBN</th>
									<td>{isbn}</td>
								</tr>
								<tr>
									<th>Title</th>
									<td>{title}</td>
								</tr>
								<tr>
									<th>Author</th>
									<td>{author}</td>
								</tr>
								<tr>
									<th>Year</th>
									<td>{publishing_date.substring(0, 4)}</td>
								</tr>
								<tr>
									<th>Posting User</th>
									<td>{posting_user}</td>
								</tr>
								<tr>
									<th>Condition</th>
									<td>{condition}</td>
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
										- <span className="text-danger">{book_points}</span>
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
