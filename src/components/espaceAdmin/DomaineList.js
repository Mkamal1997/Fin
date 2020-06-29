import React, {Component} from 'react';

import './Style.css';
import {Card, Table, Image, ButtonGroup, Button, InputGroup, FormControl} from 'react-bootstrap';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faList, faEdit, faTrash, faStepBackward, faFastBackward, faStepForward, faFastForward, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import {Link} from 'react-router-dom';
import MyToast from './MyToast';
import axios from 'axios';

export default class DomaineList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            domaines : [],
            search : '',
            currentPage : 1,
            domainesPerPage : 5,
            /*sortToggle : true*/
        };
    }

    /*sortData = () => {
        this.setState(state => ({
            sortToggle : !state.sortToggle
        }));
        this.findAllDomaines(this.state.currentPage);
    }*/

    componentDidMount() {
        this.findAllDomaines(this.state.currentPage);
    }

    /*findAllBooks() {
        fetch("http://localhost:8081/rest/books")
            .then(response => response.json())
            .then((data) => {
                this.setState({books: data});
            });
    };*/

    findAllDomaines(currentPage) {
        currentPage -= 1;
        let sortDir = this.state.sortToggle ? "asc" : "desc";
        axios.get("http://localhost:8082/api/domaines?pageNumber="+currentPage+"&pageSize="+this.state.domainesPerPage+"&sortBy=id&sortDir="+sortDir)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    domaines: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                });
            });
    };

    /*deleteBook = (bookId) => {
        fetch("http://localhost:8081/rest/books/"+bookId, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then((book) => {
            if(book) {
                this.setState({"show":true});
                setTimeout(() => this.setState({"show":false}), 3000);
                this.setState({
                    books: this.state.books.filter(book => book.id !== bookId)
                });
            } else {
                this.setState({"show":false});
            }
        });
    };*/

    deleteDomaine = (domaineId) => {
        axios.delete("http://localhost:8082/api/domaines/"+domaineId)
            .then(response => {
                if(response.data != null) {
                    this.setState({"show":true});
                    setTimeout(() => this.setState({"show":false}), 3000);
                    this.setState({
                        domaines: this.state.domaines.filter(domaine => domaine.id !== domaineId)
                    });
                } else {
                    this.setState({"show":false});
                }
            });
    };

    changePage = event => {
        let targetPage = parseInt(event.target.value);
        if(this.state.search) {
            this.searchData(targetPage);
        } else {
            this.findAllDomaines(targetPage);
        }
        this.setState({
            [event.target.name]: targetPage
        });
    };

    firstPage = () => {
        let firstPage = 1;
        if(this.state.currentPage > firstPage) {
            if(this.state.search) {
                this.searchData(firstPage);
            } else {
                this.findAllDomaines(firstPage);
            }
        }
    };

    prevPage = () => {
        let prevPage = 1;
        if(this.state.currentPage > prevPage) {
            if(this.state.search) {
                this.searchData(this.state.currentPage - prevPage);
            } else {
                this.findAllDomaines(this.state.currentPage - prevPage);
            }
        }
    };

    lastPage = () => {
        let condition = Math.ceil(this.state.totalElements / this.state.domainesPerPage);
        if(this.state.currentPage < condition) {
            if(this.state.search) {
                this.searchData(condition);
            } else {
                this.findAllDomaines(condition);
            }
        }
    };

    nextPage = () => {
        if(this.state.currentPage < Math.ceil(this.state.totalElements / this.state.domainesPerPage)) {
            if(this.state.search) {
                this.searchData(this.state.currentPage + 1);
            } else {
                this.findAllDomaines(this.state.currentPage + 1);
            }
        }
    };

    searchChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    cancelSearch = () => {
        this.setState({"search" : ''});
        this.findAllDomaines(this.state.currentPage);
    };

    searchData = (currentPage) => {
        currentPage -= 1;
        axios.get("http://localhost:8082/api/domaines/search/"+this.state.search+"?page="+currentPage+"&size="+this.state.domainesPerPage)
            .then(response => response.data)
            .then((data) => {
                this.setState({
                    domaines: data.content,
                    totalPages: data.totalPages,
                    totalElements: data.totalElements,
                    currentPage: data.number + 1
                });
            });
    };

    render() {
        const {domaines, currentPage, totalPages, search} = this.state;

        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show = {this.state.show} message = {"domaine supprimé avec succès."} type = {"danger"}/>
                </div>
                <Card className={"border "}>
                    <Card.Header>
                        <div className="title" style={{"float":"left"}}>
                            <FontAwesomeIcon icon={faList} /> Liste des Domaines
                        </div>
                        <div style={{"float":"right"}}>
                             <InputGroup size="sm" >
                                <FormControl placeholder="Search" name="search" value={search}
                                    className={"info-border"}
                                    onChange={this.searchChange}/>
                                <InputGroup.Append>
                                    <Button size="sm" variant="outline-info" type="button" onClick={this.searchData}>
                                        <FontAwesomeIcon icon={faSearch}/>
                                    </Button>
                                    <Button size="sm" variant="outline-danger" type="button" onClick={this.cancelSearch}>
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
                                 <th onClick={this.sortData}>Id <div className={this.state.sortToggle ? "arrow arrow-down" : "arrow arrow-up"}> </div></th>
                                  <th>Titre</th>
                                  <th>Description</th>
            
                                  <th>Actions</th>
                                </tr>
                              </thead>
                              <tbody>
                                {
                                    domaines.length === 0 ?
                                    <tr align="center">
                                      <td colSpan="7">No domaines Available.</td>
                                    </tr> :
                                    domaines.map((domaine) => (
                                    <tr key={domaine.id}>
                                        <td>{domaine.id}</td>
                                        <td>
                                            <Image src={domaine.imageURL} roundedCircle width="25" height="25"/> {domaine.titre}
                                        </td>
                                        <td>{domaine.description}</td>
                                        
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"edit/"+domaine.id} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                                                <Button size="sm" variant="outline-danger" onClick={this.deleteDomaine.bind(this, domaine.id)}><FontAwesomeIcon icon={faTrash} /></Button>
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                    ))
                                }
                              </tbody>
                        </Table>
                    </Card.Body>
                    {domaines.length > 0 ?
                        <Card.Footer>
                            <div style={{"float":"left"}}>
                                Showing Page {currentPage} of {totalPages}
                            </div>
                            <div style={{"float":"right"}}>
                                <InputGroup size="sm">
                                    <InputGroup.Prepend>
                                        <Button className="style_botton" type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                            onClick={this.firstPage}>
                                            <FontAwesomeIcon icon={faFastBackward} /> First
                                        </Button>
                                        <Button className="style_botton" type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                            onClick={this.prevPage}>
                                            <FontAwesomeIcon icon={faStepBackward} /> Prev
                                        </Button>
                                    </InputGroup.Prepend>
                                    <FormControl className={"page-num "} name="currentPage" value={currentPage}
                                        onChange={this.changePage}/>
                                    <InputGroup.Append>
                                        <Button className="style_botton" type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                            onClick={this.nextPage}>
                                            <FontAwesomeIcon icon={faStepForward} /> Next
                                        </Button>
                                        <Button className="style_botton" type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                            onClick={this.lastPage}>
                                            <FontAwesomeIcon icon={faFastForward} /> Last
                                        </Button>
                                    </InputGroup.Append>
                                </InputGroup>
                            </div>
                        </Card.Footer> : null
                     }
                </Card>
            </div>
        );
    }
}