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
import Login from "./Login";
import { Button } from "antd";
import { withKeycloak } from '@react-keycloak/web';
import AuthorizedFunction from './utilities/AuthorizedFunction';

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
      <Navbar light expand="md" className="navbar fixed-top">
        <NavbarToggler />
          <NavbarBrand className="mr-auto navbar-brand" href="/" id="log">
            <img src="assets/logo.png" height="60" width="170" alt="brand" />
          </NavbarBrand>

          <Collapse navbar>
            <Nav navbar>
              </NavItem>
              
              {AuthorizedFunction(['Admin']) && 
              <NavLink className="nav-link" to="/espaceAdmin">
              &nbsp; &nbsp; ESPACE ADMIN
              </NavLink>
              }
              </NavItem>
              <NavItem id="navPos">
                <NavLink className="nav-link" to="/home" >
                &nbsp; &nbsp; HOME
                </NavLink>
              
            </Nav>
            <Nav className="ml-auto " navbar>
              <Row>
                
                <Col span={11} offset={2}>   
                    
                    {keycloak && keycloak.authenticated &&
                        <NavItem className="js-scroll-trigger">
                        
                        <span></span> <Button outline="true" className="buttom " 
                         className="fa fa-sign-up fa-lg  "
                        type="primary" shape="round" size="large"  id="bot2"
                         onClick={() => keycloak.logout()}>Logout</Button>
                        
                    </NavItem>
                    }
                </Col>
                
            
              </Row>  
            </Nav>
          </Collapse>
            &nbsp; &nbsp;
      </Navbar>
        </div>
);    
}
export default withKeycloak( NavigationBar )