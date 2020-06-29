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

const NavBar = ({ keycloak, keycloakInitialized }) => { 

  return (
    <div>
      <Navbar light expand="md" className="navbar fixed-top">
        <NavbarToggler />
          <NavbarBrand className="mr-auto navbar-brand" href="/" id="log">
            <img src="assets/logo.png" height="60" width="170" alt="BCP" />
          </NavbarBrand>

          <Collapse navbar>
            <Nav navbar>
              <NavItem id="navPos">
                <NavLink className="nav-link" to="/" >
                &nbsp; &nbsp; HOME
                </NavLink>
              </NavItem>
              <NavItem id="navPos">
                <NavLink className="nav-link" to="/about">
                &nbsp; &nbsp; NOUS CONNAÎTRE
                </NavLink>
              </NavItem>
              <NavItem id="navPos">
                <NavLink className="nav-link" to="/projectsMenu">
                &nbsp; &nbsp; NOS PROJETS
                </NavLink>
              </NavItem>
              <NavItem id="navPos">
                <NavLink className="nav-link" to="/contactus">
                &nbsp; &nbsp;  ESPACE COMMUNICATION
                </NavLink>
              </NavItem>
              <NavItem id="navPos">
              {AuthorizedFunction(['PorteurProjet']) && 
              <NavLink className="nav-link" to="/depot1">
              &nbsp; &nbsp; DEPOSER MA DAMANDE
              </NavLink>
              }
              </NavItem>
              <NavItem id="navPos">
              {AuthorizedFunction(['Admin']) && 
              <NavLink className="nav-link" to="/espaceAdmin">
              &nbsp; &nbsp; ESPACE ADMIN
              </NavLink>
              }
              </NavItem>
              <NavItem id="navPos">
              {AuthorizedFunction(['PorteurProjet']) && 
              <NavLink className="nav-link" to="/espaceClient">
              &nbsp; &nbsp; ESPACE CLIENT
              </NavLink>
              }
              </NavItem>
              <NavItem id="navPos">
              {AuthorizedFunction(['ChargeDecision']) && 
              <NavLink className="nav-link" to="/espacePersonnelCD">
              &nbsp; &nbsp; ESPACE CHARGE DECISION
              </NavLink>
              }
              </NavItem>
              <NavItem id="navPos">
              {AuthorizedFunction(['ChargePreselection']) && 
              <NavLink className="nav-link" to="/espaceChargéPrésélection">
              &nbsp; &nbsp; ESPACE CHARGE PRESELECTION
              </NavLink>
              }
              </NavItem>
            </Nav>
            <Nav className="ml-auto " navbar>
              <Row>
                <Col span={11}>
                    {keycloak && !keycloak.authenticated &&
                    <NavItem className="js-scroll-trigger">
                    
                    <Button outline="true" className="fa fa-sign-up fa-lg  "
                    className="buttom" type="primary" 
                    shape="round" size="large" id="bot1" 
                    onClick={() => keycloak.login()}>Login</Button>
                    
                </NavItem>
                }
                {keycloak && keycloak.authenticated &&
                    <NavItem className="js-scroll-trigger">
                    <NavLink className="fa fa-sign-up fa-lg  "  to="/profile">
                    <Button outline="true"  className="buttom" 
                    type="primary" shape="round" size="large" id="bot1">
                      <span ></span>Profile
                    </Button>                   
                    </NavLink>
                </NavItem>
                }
                </Col>
                
                <Col span={11} offset={2}>   
                    {keycloak && !keycloak.authenticated &&
                    <NavItem className="js-scroll-trigger">
                    <span></span> <Button className="fa fa-sign-up fa-lg  "
                     outline="true" className="buttom " 
                    type="primary" shape="round" size="large"  id="bot2" 
                    onClick={() => keycloak.register()}>Sign up</Button>
                    </NavItem>
                    }
                    {keycloak && keycloak.authenticated &&
                        <NavItem className="js-scroll-trigger">
                        <span></span> <Button outline="true" className="buttom " 
                         className="fa fa-sign-up fa-lg  "
                        type="primary" shape="round" size="large"  id="bot2"
                         onClick={() => keycloak.logout()}>Logout</Button>
                    </NavItem>}
                </Col>
              </Row>  
            </Nav>
          </Collapse>
            &nbsp; &nbsp;
      </Navbar>
        </div>
);    
}
export default withKeycloak(NavBar)