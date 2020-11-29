import React, { Component } from "react";
import {
	Jumbotron,
	Container,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	Row,
	Col,
	Card, CardBody, CardTitle, CardImg, CardSubtitle, CardText
} from "reactstrap";
import axios from "axios";
import ReactDOM from "react-dom";
import "../App.css";
import UserStore from '../userStore/userStore';

//final db
// const user_id = "5fb885beded3a615b4f96aa9";
//test db
// const user_id = "5fac8ee81577ff48d4652a82";

export class Booklist extends Component {
	constructor(props) {
		super(props);
		this.state = { books: [], available_books: [], users: [], user: [] };
	}

	async componentWillMount() {
		await this.setState({ username: UserStore.username});
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
		axios
			.get("http://localhost:5000/users/")
			.then((response) => {
				this.setState({ users: response.data });
				this.setState({
					user: this.state.users.filter((user) => user.username === this.state.username)[0],
				});
				console.log(this.state.user)
			})
			.catch((error) => {
				console.log(error);
			});
	}
	// https://dev.to/abdulbasit313/an-easy-way-to-create-a-customize-dynamic-table-in-react-js-3igg
	renderData() {
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
				//show books that are available and not posted by me
				available && (posting_user !== this.state.username) && <Col lg={3} md={4} className="d-flex my-4">
					<Card key={_id} body className="text-center">
						<CardImg className="mx-auto" style={{width: "128px", height: "165px"}} src={image} alt="Not Available" onError={(e)=>{e.target.src="http://zldzksk1.dothome.co.kr/image/noimage.jpg"}}/>
						<CardBody className="d-flex flex-column flex-fill">
							<CardTitle tag="h5">{title}</CardTitle>
							<CardSubtitle tag="h6" className="mb-2">By {author}</CardSubtitle>
							<CardText>{book_points} Points</CardText>
							<Button
								className="btn btn-dark mt-auto algin-self-end"
								onClick={() => {
									this.props.history.push({
										pathname: `/Request`,
										state: { book },
										
									});
								}}
								>
								Request
							</Button>	
						</CardBody>
					</Card>
				</Col>

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
				<Container>
					<Row className="my-4">
						{this.renderData()}
					</Row>
				</Container> 
			</div>
		);
	}
}
