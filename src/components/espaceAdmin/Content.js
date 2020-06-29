/*import React from "react";
import classNames from "classnames";

import {Provider} from 'react-redux';
import store from '../service/store';

import {Container, Row, Col} from 'react-bootstrap';
import {BrowserRouter as Route, Switch} from 'react-router-dom';

import Welcome from './Welcome';
import Domaine from './Domaine';
import Utilisateur from './Utilisateur';
import DomaineList from './DomaineList';
import UserList from './UserList';
import Topbar from "./Topbar";

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
   
  <Container
    fluid
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
    <Switch>
        <Route path="/" exact component={() => <Welcome />}/>
        <Route path="/add" exact component={Domaine}/>
        <Route path="/addUser" exact component={Utilisateur}/>
        <Route path="/edit/:id" exact component={Domaine}/>
        <Route path="/list" exact component={DomaineList}/> 
        <Route path="/users" exact component={() =>
            <Provider store={store}><UserList/></Provider>}/>

    </Switch>
  </Container>
);

export default Content;*/

import React from "react";
import classNames from "classnames";
import { Container } from "reactstrap";
import { Switch, Route, Redirect  } from "react-router-dom";
import Welcome from './Welcome'
import DomaineList from './DomaineList'
import Domaine from './Domaine';
import Utilisateur from './Utilisateur';
import UtilisateurList from './UtilisateurList';
import HomeComponent from '../HomeComponent'
import ConditionList from './ConditionList'
import Condition from './Condition';
import "./Style.css"

import Topbar from "./Topbar";

const Content = ({ sidebarIsOpen, toggleSidebar }) => (
  <Container
    fluid id="content"
    className={classNames("content", { "is-open": sidebarIsOpen })}
  >
    <Topbar toggleSidebar={toggleSidebar} />
    <Switch>
        <Route path="/welcome" exact component={() => <Welcome />}/>
        <Route path="/add" exact component={Domaine}/>
        <Route path="/edit/:id" exact component={Domaine}/>
        <Route path="/list" exact component={DomaineList}/>
        <Route path="/addcondition" exact component={Condition}/>
        <Route path="/editcondition/:id" exact component={Condition}/>
        <Route path="/conditionlist" exact component={ConditionList}/>  
        <Route path="/addUser" exact component={Utilisateur}/>
        <Route path="/userList" exact component={UtilisateurList}/>
        <Redirect to="/welcome" />
        <Route path="/" exact component={HomeComponent}/>
</Switch>
  </Container>
);

export default Content;

