import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.css";
//import MainPage2 from './components/MainPage'
import { BrowserRouter as Router } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";

// const domain = process.env.REACT_APP_AUTH0_DOMAIN;
// const clientId = process.env.REACT_APP_AUTh0_CLIENTID;

ReactDOM.render(
	<Router>
		<Auth0ProviderWithHistory
		// domain="dev-cd29zu3y.us.auth0.com"
		// clientId="n28Biun64j5BsM2EDTAUB2ZaJvh96M1k"
		// domain={domain}
		// clientId={clientId}
		// redirectUri={window.location.origin}
		>
			<App />
		</Auth0ProviderWithHistory>
	</Router>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
