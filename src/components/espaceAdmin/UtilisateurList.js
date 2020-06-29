
import React, {Component} from 'react';

import './Style.css';
import {Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import MyToast from './MyToast';
import axios from 'axios';

export default class UtilisateurList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            utilisateurs : [],

        };
    }


    componentDidMount() {
      this.getUsers(this.state);
  }


    getUsers=()=>{
      fetch('http://localhost:8080/auth/admin/realms/FinancementProjet/users',{
        method: 'GET',
              headers: {
                  Authorization: "Bearer "+localStorage.getItem("react-token")
              }
          }).then(res => res.json())
          .then((data) => {
             this.setState({ utilisateurs: data })
         })
          .catch(console.log)  
     }
 
    render() {
        const {utilisateurs} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"domaine supprimé avec succès."} type = {"danger"}/>
                </div>
                <Card className={"border "}>
                    <Card.Header>
                        <div className="title" style={{"float":"left"}}>
                            <FontAwesomeIcon icon={faList} /> Liste des Utilisateurs
                        </div>
                        <div style={{"float":"right"}}>
                             <InputGroup size="sm">
                                <FormControl placeholder="Search" name="search" 
                                    className={"info-border"}
                                    />
                                <InputGroup.Append>
                                    <Button size="sm" variant="outline-info" type="button" >
                                        <FontAwesomeIcon icon={faSearch}/>
                                    </Button>
                                    <Button size="sm" variant="outline-danger" type="button" >
                                        <FontAwesomeIcon icon={faTimes} />
                                    </Button>
                                </InputGroup.Append>
                             </InputGroup>
                        </div>
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped >
                            <thead>
                                <tr>
                                 <th >Id </th>
                                  <th>UserName</th>
                                  <th>FirstName</th>
                                  <th>LastName</th>
                                  <th>Email</th>

            
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                    utilisateurs.map((utilisateur) => (
                                    <tr key={utilisateur.id}>
                                        <td>{utilisateur.id}</td>
                                        <td>
                                             {utilisateur.username}
                                        </td>
                                        <td>{utilisateur.firstName}</td>
                                        <td>{utilisateur.lastName}</td>
                                        <td>{utilisateur.email}</td>
                                        
                                        <td>
                                            <ButtonGroup>
                                                <Link className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                                                <Button size="sm" variant="outline-danger" ><FontAwesomeIcon icon={faTrash} /></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                    ))
                                }
                              </tbody>
                        </Table>
                    </Card.Body>
                   
                        <Card.Footer>
                            
                        </Card.Footer> 
                </Card>
            </div>
        );
    }
}