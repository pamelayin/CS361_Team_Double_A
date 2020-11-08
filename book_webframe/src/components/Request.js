import React, { Component } from "react";
import { Jumbotron, Container, Table, Row, Col, Button } from "reactstrap";
import Button from "react-bootstrap/Button";
import catch22Img from "./asset/catch-22.jpg";
import { Link } from "react-router-dom";

export class Request extends Component {
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
						<h1>Book Request</h1>
						<p>Please confirm your book request.</p>
					</Container>
				</Jumbotron>

				<Container>
					<Row>
						<Col xs={2}>
							<img src={catch22Img} alt="bookimage" className="py-5" />
						</Col>
						<Col>
							<Table className="table-borderless">
								<tr>
									<th>ISBN</th>
									<td>978-0-09952-912-5</td>
								</tr>
								<tr>
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
								</tr>
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
