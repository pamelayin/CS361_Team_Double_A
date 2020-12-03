import React, { Component } from "react";
import { Table, Tabs, Tab} from "react-bootstrap";
import axios from "axios";
import UserStore from '../userStore/userStore';
import DatePicker from 'react-datepicker';


export class EditProfile extends Component {
	constructor(props) {
		super(props);
		this.changeInfo = this.changeInfo.bind(this);
		this.onChangeFirstName = this.onChangeFirstName.bind(this);
		this.onChangeLastName = this.onChangeLastName.bind(this);
		this.onChangeDate = this.onChangeDate.bind(this);
		this.onSubmit = this.onSubmit.bind(this)
		this.state = {
			//user: UserStore.username,
			users: [],
			user: [],
			first_name: '',
			last_name: '',
			dob: new Date()
		};
	}

	// async componentWillMount() {
	// 	await this.setState({ username: UserStore.username});
	// }

	componentDidMount() {
		axios
			.get("http://localhost:5000/users/"+ this.props.match.params._id)
			.then((response) => {
				this.setState({ 
					first_name: response.data.first_name,
					last_name: response.data.last_name,
					dob: new Date(response.data.date)
				})
			}).catch((error) => {
				console.log(error);
			});
	}
	changeInfo() {
		<div>
		  <h3>Edit Profile</h3>
		  <form onSubmit={this.onSubmit}>
			<div className="form-group"> 
			  <label>Username: </label>
			  <select ref="userInput"
				  disabled
				  className="form-control"
				  value={this.state.username}
				>  
			  </select>
			</div>
			<div className="form-group"> 
			  <label>Email: </label>
			  <select ref="userInput"
				  disabled
				  className="form-control"
				  value={this.state.email}
				>  
			  </select>
			</div>
			<div className="form-group"> 
			  <label>First Name: </label>
			  <input  type="text"
				  required
				  className="form-control"
				  value={this.state.first_name}
				  onChange={this.onChangeFirstName}
				  />
			</div>
			<div className="form-group"> 
			  <label>Last Name: </label>
			  <input  type="text"
				  required
				  className="form-control"
				  value={this.state.last_name}
				  onChange={this.onChangeLastName}
				  />
			</div>
			<div className="form-group">
			  <label>Date of Birth: </label>
			  <div>
				<DatePicker
				  selected={this.state.dob}
				  onChange={this.onChangeDate}
				/>
			  </div>
			</div>
	
			<div className="form-group">
			  <input type="submit" value="Edit Profile" className="btn btn-dark" />
			</div>
		  </form>
		</div>
	}
	onChangeFirstName(e) {
		this.setState({
			firstname: e.target.value
		})
	}
	onChangeLastName(e) {
		this.setState({
			lastname: e.target.value
		})
	}
	onChangeDate(date) {
		this.setState({
			dob: date
		})
	}

	onSubmit(e) {
		e.preventDefault();

		const user = {
			first_name: this.state.first_name,
			last_name: this.state.last_name,
			dob: this.state.date
		}

		console.log(user);

		axios.post('http://localhost:5000/users/update/' + this.props.match.params.id, user)
      	.then(res => console.log(res.data));

    	window.location = '/';
	}
	render() {
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
										<tr>{ this.changeInfo() }</tr>
									</thead>
								</Table>
							</Tab.Content>
						</Tab.Container>
					</Tab>{" "}
				</Tabs>{" "}
			</div>
		);
	}
}
