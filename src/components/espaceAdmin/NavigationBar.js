/*import React from 'react';

import {Navbar, Nav} from 'react-bootstrap';
import {Link} from 'react-router-dom';

export default function NavigationBar() {
    return (
        <Navbar >
            <Link to={""} className="navbar-brand">
            <img src="assets/logo.png" height="60" width="170" alt="brand" /> Espace Admin
            </Link>
            
        </Navbar>
    );
}*/


import React, { Component } from "react";
import { Row, Col } from "antd";
import "./Style.css"
import { Button } from "antd";
import { withKeycloak } from '@react-keycloak/web';
import AuthorizedFunction from '../utilities/AuthorizedFunction';

import {
  Nav,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Collapse,
  NavItem,
  Jumbotron,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { NavLink, Link } from "react-router-dom";

const NavigationBar = ({ keycloak, keycloakInitialized }) => { 

  return (
    <div>
      <Navbar expand="md" className="navbar  navbar-custom fixed-top">
        <NavbarToggler />
          <NavbarBrand className="mr-auto navbar-brand" href="/" id="log">
            <img src="assets/logo.png" height="60" width="170" alt="brand" />
          </NavbarBrand>

          <Collapse navbar>
            <Nav navbar>
             
              <NavItem id="navPos">
              {AuthorizedFunction(['Admin']) && 
              <NavLink className="nav-link" to="/espaceAdmin">
              &nbsp; &nbsp; ESPACE ADMIN
              </NavLink>
              }
              </NavItem>
              <NavItem id="navPos">
                <NavLink className="nav-link" to="/" >
                &nbsp; &nbsp; HOME
                </NavLink>
               </NavItem>
            </Nav>
           <Nav className="ml-auto " navbar>
              
              {keycloak && keycloak.authenticated &&
               <Button shape="round" id="bot1" class="btn btn-outline-success my-2 my-sm-0" type="submit"  
               onClick={() => keycloak.logout()}>Deconnexion</Button>}
            </Nav>
          </Collapse>
            &nbsp; &nbsp;
      </Navbar>
        </div>
);    
}
export default withKeycloak( NavigationBar )
