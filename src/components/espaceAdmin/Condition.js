import React, {Component} from 'react';
import Keycloak from 'keycloak-js';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';
import axios from 'axios';

export default class Condition extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.conditionChange = this.conditionChange.bind(this);
        this.submitCondition = this.submitCondition.bind(this);
       
    }

    initialState = {
        id:'', titre:'', description:''
    };

    componentDidMount() {
        const conditionId = +this.props.match.params.id;
        if(conditionId) {
            this.findConditionById(conditionId);
        }
        
        
    }

    
    
    
    

    /*findBookById = (bookId) => {
        fetch("http://localhost:8081/rest/books/"+bookId)
            .then(response => response.json())
            .then((book) => {
                if(book) {
                    this.setState({
                        id: book.id,
                        title: book.title,
                        author: book.author,
                        coverPhotoURL: book.coverPhotoURL,
                        isbnNumber: book.isbnNumber,
                        price: book.price,
                        language: book.language,
                        genre: book.genre
                    });
                }
            }).catch((error) => {
                console.error("Error - "+error);
            });
    };*/

    findConditionById = (conditionId) => {
        axios.get("http://localhost:8082/api/conditions/"+conditionId)
            .then(response => {
                if(response.data != null) {
                    this.setState({
                        id: response.data.id,
                        titre: response.data.titre,
                        description: response.data.description,
                        
                    });
                }
            }).catch((error) => {
                console.error("Error - "+error);
            });
    };

    resetCondition = () => {
        this.setState(() => this.initialState);
    };

    /*submitBook = event => {
        event.preventDefault();

        const book = {
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language,
            genre: this.state.genre
        };

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        fetch("http://localhost:8081/rest/books", {
            method: 'POST',
            body: JSON.stringify(book),
            headers
        })
        .then(response => response.json())
        .then((book) => {
            if(book) {
                this.setState({"show":true, "method":"post"});
                setTimeout(() => this.setState({"show":false}), 3000);
            } else {
                this.setState({"show":false});
            }
        });
        this.setState(this.initialState);
    };*/

    submitCondition = event => {
        event.preventDefault();

        const condition = {
            titre: this.state.titre,
            description: this.state.description,
            
           
        };

        axios.post("http://localhost:8082/api/conditions", condition)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true, "method":"post"});
                    setTimeout(() => this.setState({"show":false}), 3000);
                } else {
                    this.setState({"show":false});
                }
            });

        this.setState(this.initialState);
    };

    /*updateBook = event => {
        event.preventDefault();

        const book = {
            id: this.state.id,
            title: this.state.title,
            author: this.state.author,
            coverPhotoURL: this.state.coverPhotoURL,
            isbnNumber: this.state.isbnNumber,
            price: this.state.price,
            language: this.state.language,
            genre: this.state.genre
        };

        const headers = new Headers();
        headers.append('Content-Type', 'application/json');

        fetch("http://localhost:8081/rest/books", {
            method: 'PUT',
            body: JSON.stringify(book),
            headers
        })
        .then(response => response.json())
        .then((book) => {
            if(book) {
                this.setState({"show":true, "method":"put"});
                setTimeout(() => this.setState({"show":false}), 3000);
                setTimeout(() => this.bookList(), 3000);
            } else {
                this.setState({"show":false});
            }
        });
        this.setState(this.initialState);
    };*/

    updateCondition = event => {
        event.preventDefault();

        const  condition= {
            id: this.state.id,
            titre: this.state.titre,
            description: this.state.description,
           
            
        };

        axios.put("http://localhost:8082/api/conditions", condition)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true, "method":"put"});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    setTimeout(() => this.conditionList(), 3000);
                } else {
                    this.setState({"show":false});
                }
            });

        this.setState(this.initialState);
    };

    conditionChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    conditionList = () => {
        return this.props.history.push("/conditionlist");
    };

    render() {
        const {titre, description} = this.state;
        
        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Condition mis-à-jour Avec succès." : "Condition enregistré Avec succès."} type = {"success"}/>
                </div>
                <Card className={"border "}>
                    <Card.Header className="title">
                        <FontAwesomeIcon  icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Mettre-à-jour Condition" : "Ajouter Nouveau Condition"}
                    </Card.Header>
                    <Form onReset={this.resetCondition} onSubmit={this.state.id ? this.updateCondition : this.submitCondition} id="conditionFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridTitre">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="titre"
                                        value={titre} onChange={this.conditionChange}
                                        placeholder="Entrer le nom du condition" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="description"
                                        value={description} onChange={this.conditionChange}
                                        placeholder="Entrer la description du condition" />
                                </Form.Group>
                            </Form.Row>
                            
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button className="ml-auto col-4 col-sm-3 col-md-2 col-lg-1" size="sm" variant="success" type="submit" id="bot2">
                                <FontAwesomeIcon icon={faSave} /> {this.state.id ? "Update" : "Save"}
                            </Button>{' '}
                            <Button className="ml-auto col-4 col-sm-3 col-md-2 col-lg-1" size="sm" variant="info" type="reset" id="bot2">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                            </Button>{' '}
                            <Button className="ml-auto col-6 col-sm-4 col-md-2 col-lg-2" id="bot1" size="sm" variant="info" type="button" onClick={this.conditionList.bind()}>
                                <FontAwesomeIcon icon={faList} /> condition List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
}
}