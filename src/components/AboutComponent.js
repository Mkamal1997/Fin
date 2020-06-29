import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  Media
} from "reactstrap";
import { Link } from "react-router-dom";
 const AGENCES = [
  { id: 0, name: "Maroc", image: "assets/siegeBcp.png", description: "" },
  { id: 0, name: "Maroc", image: "assets/siegeBcp.png", description: "" },
  { id: 0, name: "Maroc", image: "assets/siegeBcp.png", description: "" },
  { id: 0, name: "Maroc", image: "assets/siegeBcp.png", description: "" },
  { id: 0, name: "Maroc", image: "assets/siegeBcp.png", description: "" }
];
function About(props) {
  const agences = AGENCES.map(agence => {
    return <p>Agences {agence.name}</p>;
  });

  return (
    <div className="container">
      <div className="row">
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/home">Home</Link>
          </BreadcrumbItem>
          <BreadcrumbItem active>NOUS CONNAÎTRE</BreadcrumbItem>
        </Breadcrumb>
        <div className="col-12">
          <h3>NOUS CONNAÎTRE</h3>
          <hr />
        </div>
      </div>
      <div className="row row-content">
        <div className="col-12 col-md-6">
          <h2>Our History</h2>
          <p>
            Le groupe Banque Centrale Populaire est l’une des premières
            institutions bancaires du Maroc. Il tire sa force de ses valeurs de
            solidarité et de son organisation unique au Maroc. Il est composé de
            8 Banques Populaires Régionales (BPR) à vocation coopérative, de la
            Banque Centrale Populaire (BCP), organe central du Groupe, de forme
            société anonyme cotée en Bourse, de filiales spécialisées, de
            fondations et de banques et représentations à l’étranger.
          </p>
          <p>
            Le Groupe Banque Populaire est présent dans 32 pays dans le monde.
            Il est, au Maroc, le premier collecteur de l’épargne (26% de PdM) et
            leader du financement de l’économie (24% de PdM).
          </p>
        </div>
        <div className="col-12 col-md-5">
          <Card>
            <CardHeader className="bg-primary text-white">
              Info BP
            </CardHeader>
            <CardBody>
              <dl className="row p-1">
                <dt className="col-6">Création</dt>
                <dd className="col-6">February 2, 1961</dd>
                <dt className="col-6">Pays</dt>
                <dd className="col-6">
                  {" "}
                  Germany, England, Canada, Spain, France, Gibraltar,
                  Netherlands and Belgium.
                </dd>
                <dt className="col-6">Revenue</dt>
                <dd className="col-6"> US$ 2,1 billion (2016)</dd>
                <dt className="col-6">Nombre des employées</dt>
                <dd className="col-6">11,878</dd>
              </dl>
            </CardBody>
          </Card>
        </div>
      
      </div>
      <div className="row row-content">
        <div className="col-12">
          <h2>Agences dans la monde</h2>
        </div>
        <div className="col-12">
          <Media list>{agences}</Media>
        </div>
      </div>
    </div>
  );
}

export default About;



 /*   <div className="col-12">
          <Card>
            <CardBody className="bg-faded">
              <blockquote className="blockquote">
                <p className="mb-0">
                  You better cut the pizza in four pieces because I'm not hungry
                  enough to eat six.
                </p>
                <footer className="blockquote-footer">
                  Yogi Berra,
                  <cite title="Source Title">
                    The Wit and Wisdom of Yogi Berra, P. Pepe, Diversion Books,
                    2014
                  </cite>
                </footer>
              </blockquote>
            </CardBody>
          </Card>
        </div> */