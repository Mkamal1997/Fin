import React, {Component} from 'react';
import Keycloak from 'keycloak-js';

import {Card, Form, Button, Col} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSave, faPlusSquare, faUndo, faList, faEdit} from '@fortawesome/free-solid-svg-icons';
import MyToast from './MyToast';
import axios from 'axios';

export default class Domaine extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.domaineChange = this.domaineChange.bind(this);
        this.submitDomaine = this.submitDomaine.bind(this);
        //this.state = { keycloak: null, authenticated: false };
    }

    initialState = {
        id:'', titre:'', description:'', imageURL:''
    };

    componentDidMount() {
        const domaineId = +this.props.match.params.id;
        if(domaineId) {
            this.findDomaineById(domaineId);
        }
        //const keycloak = Keycloak('/keycloak.json');
        //keycloak.init({onLoad: 'login-required'}).then(authenticated => {
          //this.setState({ keycloak: keycloak, authenticated: authenticated })
        //})
        
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

    findDomaineById = (domaineId) => {
        axios.get("http://localhost:8082/api/domaines/"+domaineId)
            .then(response => {
                if(response.data != null) {
                    this.setState({
                        id: response.data.id,
                        titre: response.data.titre,
                        description: response.data.description,
                        imageURL: response.data.imageURL,
                    });
                }
            }).catch((error) => {
                console.error("Error - "+error);
            });
    };

    resetDomaine = () => {
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

    submitDomaine = event => {
        event.preventDefault();

        const domaine = {
            titre: this.state.titre,
            description: this.state.description,
            imageURL: this.state.imageURL,
           
        };

        axios.post("http://localhost:8082/api/domaines", domaine)
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

    updateDomaine = event => {
        event.preventDefault();

        const domaine = {
            id: this.state.id,
            titre: this.state.titre,
            description: this.state.description,
            imageURL: this.state.imageURL,
            
        };

        axios.put("http://localhost:8082/api/domaines", domaine)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true, "method":"put"});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    setTimeout(() => this.domaineList(), 3000);
                } else {
                    this.setState({"show":false});
                }
            });

        this.setState(this.initialState);
    };

    domaineChange = event => {
        this.setState({
            [event.target.name]:event.target.value
        });
    };

    domaineList = () => {
        return this.props.history.push("/list");
    };

    render() {
        const {titre, description, imageURL} = this.state;
        
        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {this.state.method === "put" ? "Domaine mis-à-jour Avec succès." : "Domaine enregistré Avec succès."} type = {"success"}/>
                </div>
                <Card className={"border "}>
                    <Card.Header className="title">
                        <FontAwesomeIcon  icon={this.state.id ? faEdit : faPlusSquare} /> {this.state.id ? "Mettre-à-jour Domaine" : "Ajouter Nouveau Domaine"}
                    </Card.Header>
                    <Form onReset={this.resetDomaine} onSubmit={this.state.id ? this.updateDomaine : this.submitDomaine} id="domaineFormId">
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridTitre">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="titre"
                                        value={titre} onChange={this.domaineChange}
                                        placeholder="Entrer le nom du domaine" />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="description"
                                        value={description} onChange={this.domaineChange}
                                        placeholder="Entrer la description du domaine" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridImageURL">
                                    <Form.Label>Image URL</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="imageURL"
                                        value={imageURL} onChange={this.domaineChange}
                                        placeholder="Entrer image URL" />
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
                            <Button className="ml-auto col-6 col-sm-4 col-md-2 col-lg-2" id="bot1" size="sm" variant="info" type="button" onClick={this.domaineList.bind()}>
                                <FontAwesomeIcon icon={faList} /> domaine List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
        );
}
}