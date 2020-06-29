import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import NavigationBar from "./NavigationBar";
import * as Keycloak from 'keycloak-js'
import SideBar from "./SideBar";
import Content from "./Content";
import Footer from "../Footer";
import {Container, Col} from "reactstrap"
import "./App.css";

const EspaceAdmin = () => {
  const [sidebarIsOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarIsOpen);

  return (
    <Router>
        <NavigationBar/>
      <div className="App wrapper">
        <SideBar toggle={toggleSidebar} isOpen={sidebarIsOpen} />
        <Content toggleSidebar={toggleSidebar} sidebarIsOpen={sidebarIsOpen} />
        
      </div>
     
    </Router>
    
  );
};

export default EspaceAdmin;
