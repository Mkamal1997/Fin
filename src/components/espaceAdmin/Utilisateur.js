import React, {Component} from 'react';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import Logout from './Logout';
import Keycloak from 'keycloak-js';
import MyToast from './MyToast';
import axios from 'axios';





export default class Utilisateur extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.handleChange = this.handleChange.bind(this);
        this.addUser = this.addUser.bind(this);
        
        //this.state = { keycloak: null, authenticated: false };

    }
    
    initialState = {
      username:'', firstName:'', lastName:'', email:''
    };

  addUser=()=>{
    fetch('http://localhost:8080/auth/admin/realms/FinancementProjet/users',{
      method: 'POST',
            body: JSON.stringify(
            {
                username: this.state.username,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                credentials:[
                    {
                      type:"password",
                      value:this.state.username
                    }
                ]
            }),
            headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer "+localStorage.getItem("react-token")
            }


        }).then(response => {
            if(response.data != null) {
                this.setState({"show":true});
                setTimeout(() => this.setState({"show":false}), 3000);
            } else {
                this.setState({"show":false});
            }
        })
        
        this.setState(this.initialState);

        window.location="/userList";
    };

    /*addUser(newUser) {
        const token=localStorage.getItem("react-token")
         
         return axios.post(`http://localhost:8080/auth/admin/realms/finance-app/users`,newUser, {
            body: JSON.stringify(
                {
                    username: this.state.username,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    email: this.state.email,
                    credentials:[
                        {
                          type:"password",
                          value:this.state.username
                        }
                    ]
                }),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: "Bearer "+token
                }
           }
        
         ).then((response) => response.json())
            .then((response)=> {
                if (response.data != null) { console.log(response.data);}})
            .catch(err => {
                 console.error(err)
         });
        
      }*/
    

    handleChange = event => {
        console.log("name= "+event.target.name);
        console.log("value= "+event.target.value);
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name] : value
        })
      };
  render() { 
    const {username, firstName, lastName, email} = this.state;
        
  return (
      <div>
          <div style={{"display":this.state.show ? "block" : "none"}}>
                <MyToast show = {this.state.show} message = {"Utilisateur enregistré Avec succès."} type = {"success"}/>
          </div>
          <Card className={"border "}>
              <Card.Header className="title">
                  <FontAwesomeIcon icon = {faPlusSquare} /> Ajouter un Utilisateur
              </Card.Header>
              <Form id="domaineFormId">
                  <Card.Body>
                      <Form.Row>
                          <Form.Group as={Col} controlId="formGridUserName">
                              <Form.Label>username</Form.Label>
                              <Form.Control required autoComplete="off"
                                  type="text" name="username" 
                                   onChange={this.handleChange}
                                  placeholder="Entrer le nom d'utilisateur" />
                          </Form.Group>
                          <Form.Group as={Col} controlId="formGridfirstName">
                              <Form.Label>firstName</Form.Label>
                              <Form.Control required autoComplete="off"
                                  type="text" name="firstName" 
                                   onChange={this.handleChange}
                                  placeholder="Entrer le prénom d'utilisateur" />
                          </Form.Group>
                      </Form.Row>
                      <Form.Row>
                          <Form.Group as={Col} controlId="formGridlastName">
                              <Form.Label>lastName</Form.Label>
                              <Form.Control required autoComplete="off"
                                  type="text" name="lastName" 
                                   onChange={this.handleChange}
                                  placeholder="Entrer l'identifiant d'utilisateur" />
                          </Form.Group>
                          <Form.Group as={Col} controlId="formGridEmail">
                              <Form.Label>Email</Form.Label>
                              <Form.Control required autoComplete="off"
                                  type="text" name="email" 
                                   onChange={this.handleChange}
                                  placeholder="Entrer l'email' d'utilisateur" />
                          </Form.Group>
                      </Form.Row>
                  </Card.Body>
                  <Card.Footer style={{"textAlign":"right"}}>
                      <Button className="ml-auto col-6 col-sm-4 col-md-2 col-lg-2" size="sm" variant="success" type="submit" id="bot2" onClick={() => this.addUser()}>register
                      </Button>{' '}
                  </Card.Footer>
              </Form>
          </Card>
      </div>
  );
}
}


