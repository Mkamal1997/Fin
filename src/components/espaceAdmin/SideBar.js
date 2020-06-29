/*import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faQuestion,
  faImage,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import "./Style.css";


import SubMenu from "./SubMenu";

const SideBar = ({ isOpen, toggle }) => (
  <div className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: "#d85f0f" }}>
        &times;
      </span>
    </div>
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-3">
        <p></p>
        <NavItem>
          <NavLink tag={Link} to={"/"}>
            <FontAwesomeIcon icon={faHome} className="mr-2" />
            Welcome
          </NavLink>
        </NavItem>
        <SubMenu title="Domaine" icon={faBriefcase} items={submenus[0]} />
        
        <SubMenu title="Utilisateur" icon={faCopy} items={submenus[1]} />
        <NavItem>
          <NavLink tag={Link} to={"/pages"}>
            <FontAwesomeIcon icon={faImage} className="mr-2" />
            Utisateur
          </NavLink>
        </NavItem>
        <SubMenu title="Pages" icon={faCopy} items={submenus[2]} />

        <NavItem>
          <NavLink tag={Link} to={"/faq"}>
            <FontAwesomeIcon icon={faQuestion} className="mr-2" />
            FAQ
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink tag={Link} to={"/contact"}>
            <FontAwesomeIcon icon={faPaperPlane} className="mr-2" />
            Contact
          </NavLink>
        </NavItem>
      </Nav>
    </div>
  </div>
);

const submenus = [
  [
    {
      title: "Ajouter",
      target: "add",
    },
    {
      title: "Liste",
      target: "list",
    },
    
  ],
  [
    {
      title: "Ajouter",
      target: "addUser",
    },
    {
      title: "Liste",
      target: "users",
    },
  ],
  [
    {
      title: "Page 1",
      target: "Page-1",
    },
    {
      title: "Page 2",
      target: "Page-2",
    },
  ],
];

export default SideBar;*/

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBriefcase,
  faPaperPlane,
  faUsers,
  faImage,
  faCopy,
} from "@fortawesome/free-solid-svg-icons";
import { NavItem, NavLink, Nav } from "reactstrap";
import classNames from "classnames";
import { Link } from "react-router-dom";
import "./Style.css";
import SubMenu from "./SubMenu";

const SideBar = ({ isOpen, toggle }) => (
  <div id="sidebar" className={classNames("sidebar", { "is-open": isOpen })}>
    <div className="sidebar-header">
      <span color="info" onClick={toggle} style={{ color: "#fff" }}>
        &times;
      </span>
      <h3></h3>
    </div>
    <div className="side-menu">
      <Nav vertical className="list-unstyled pb-3">
      <NavItem>
          <NavLink tag={Link} to={"/"}>
            <FontAwesomeIcon icon={faHome} className="mr-2" />
           Acceuil
          </NavLink>
        </NavItem>
        <SubMenu title="Domaine" icon={faBriefcase} items={submenus[0]} />
        
        <SubMenu title="Utilisateur" icon={faUsers} items={submenus[1]} />

        <SubMenu title="Eligibilité" icon={faCopy} items={submenus[2]} />
        
      </Nav>
    </div>
  </div>
);

const submenus = [
  [
    {
      title: "Ajouter Domaine",
      target: "add",
    },
    {
      title: "Liste Domaine",
      target: "list",
    },
    
  ],
  [
    {
      title: "Ajouter Utilisateur",
      target: "addUser",
    },
    {
      title: "Liste Utilisateur",
      target: "userList",
    },
  ],
  [
    {
      title: "Ajouter Condition",
      target: "addcondition",
    },
    {
      title: "Liste Condition",
      target: "conditionlist",
    },
  ],
];

export default SideBar;

