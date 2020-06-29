import React, { Component } from "react";
import Home from "./HomeComponent";
import Contact from "./ContactComponent";
import SignUp from "./SignUpComponent";
import About from "./AboutComponent";
import { AGENCES } from "./agences";
import { Switch, Route, Redirect } from "react-router-dom";
import EspaceCP from "./EspaceCP";
import EspaceCD from "./EspaceCD";
import Phase1 from "./Phase1";
import Phase2 from "./Phase2";
import Phase3 from "./Phase3";
import Phase4 from "./Phase4";
import UserInfo from "./UserInfo"
import EspaceClient from "./EspaceClient"
export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Switch>
        <Route path="/" component={() => <Home />} />
        <Route exact path="/projectsMenu" component={() => <Menu />} />
        <Route exact path="/contactus" component={Contact} />
        <Route exact path="/signUp" component={SignUp} />
        <Route exact path="/depot1" component={() => <Phase1 />} />
        <Route exact path="/depot2" component={() => <Phase2 />} />
        <Route exact path="/depot3" component={() => <Phase3 />} />
        <Route exact path="/depot4" component={() => <Phase4 />} />
        <Route path="/about" component={() => <About/>} />
        <Route exact path="/espaceChargéPrésélection" component={EspaceCP} />
        <Route exact path="/espacePersonnelCD" component={EspaceCD} />
        <Route exact path="/espaceClient" component={EspaceClient} />
        <Route exact path="/espacePersonnel" component={SignUp} />
        <Route exact path="/espaceAdmin" component={SignUp} />
        <Redirect to="/" />
      </Switch>
    );
  }
}
