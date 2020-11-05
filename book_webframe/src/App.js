import './App.css';
import { Component } from 'react';
import {BrowserRouter, Route, Router, Switch} from 'react-router-dom'
import {Navigation} from './components/Navigation'
import {Home} from './components/Home'
import {Bookswap} from './components/Bookswap'
import {Myaccount} from './components/Myaccount'
import {Cservice} from './components/Cservice'
import {Booklist} from './components/Booklist'
import {Nomatch} from './components/Nomatch'
import {ManageRequests} from './components/ManageRequests'
import { render } from 'react-dom';

class App extends Component {
  state = {
    logoUrl: "http://zldzksk1.dothome.co.kr/image/binder_log_resize.png",
    bannerUrl: ""
  };

  imgStyle = {
    marginLeft: "auto",
    marginRight: "auto",
    display: "block"
  };

  render(){
    return (
      <BrowserRouter>
      <div className="container">
        <div id = "head">
          <img src={this.state.logoUrl} style={this.imgStyle} alt="" className="img-fluid"/>
        </div>
        <Navigation />
        <Switch>
          <Route path='/Home' component={Home} exact />
          <Route path='/bookswap' component={Bookswap} exact />
          <Route path='/Myaccount' component={Myaccount} exact />
          <Route path='/Cservice' component={Cservice} exact />
          <Route path='/Booklist' component={Booklist} exact />
          <Route path='/ManageRequests' component={ManageRequests} exact />
          <Route component={Nomatch} />
        </Switch>
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
