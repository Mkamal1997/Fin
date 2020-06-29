import React from 'react';
import "./Style.css"
import {Jumbotron} from 'react-bootstrap';

export default function Welcome(props) {
    
    return (
        <Jumbotron>
            <h1 className="title">Bienvenu dans l'espace d'admin</h1>
            <blockquote className="blockquote mb-0">
                <p>
                Cette plateforme vous permettre d'alimenter la liste des domaines, et des Utilisateurs.
                </p>
                <footer className="blockquote-footer">
                Financement des projets innovant
                </footer>
            </blockquote>
        </Jumbotron>
    );
}