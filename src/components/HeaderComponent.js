import React, { Component } from "react";
import { Row, Col } from "antd";
import Login from "./Login";
import NavBar from "./NavBar";
import {
  
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";


export default class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isNavOpen: false,
      isModalOpen: false,
    };
   
  }

  render() {

   
    return (
      <div >
        
        
        <NavBar/>

        <section className="page-section1">
          
          <div className="container" >
            <div className="row row-header">
              <div className="col-lg-6 col-12 col-sm-12 txt">
                <h1 className="txt1">La Banque Centrale Populaire</h1>
                <p className="txt2">
                  La Banque Centrale Populaire vous accompagne pour le
                  développement de vos idées innovantes.

                </p>
              </div>
            </div>
          </div>
        </section>

  

      </div>
      
    );
    
  }
}
