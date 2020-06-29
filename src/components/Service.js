import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "antd";

export default class Service extends Component {
  render() {
    return (
      <section className="page-section" id="services">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <h2 className="section-heading text-uppercase " id="text">
                Service
              </h2>
              <h3 className="section-subheading text-muted" id="text2">
                La Banque Centrale Populaire met à disposition des individuels
                un dispositif de financement approprié, leurs permmetant de
                mettre en oeuvre une idée d'un projet innovant.
              </h3>
              <h2>&nbsp; &nbsp;</h2>
              <h2>&nbsp; &nbsp;</h2>
            </div>
          </div>
          <div className="row text-center clr">
            <div className="col-md-4 clr">
              <span className="fa-stack fa-4x">
                <i className="fa fa-circle fa-stack-2x text-primary"></i>
                <i className="fa far fa-comments fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="service-heading" id="text">
                FLEXIBILITE
              </h4>
              <p className="text-muted">
                Nos conseillers à votre écoute chaque jour pour vous aider à
                préparer votre projet. Avec vous, ils étudieront le meilleur
                financement possible et l’ensemble des solutions qui s’offrent à
                vous. Vous pouvez les contacter pour répondre à toutes vos
                demandes.
              </p>
            </div>
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fa fa-circle fa-stack-2x text-primary"></i>
                <i className="fa fa-lock fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="service-heading" id="text">
                ENGAGEMENT
              </h4>
              <p className="text-muted">
                Nous aurons toujours à coeur d'étre clairs et précis sur les
                financements pour lesquels vous vous engagez, et c’est avec le
                plus grand plaisir que nous nous engageons à notre tour à
                trouver des solutions rapides et efficaces adaptées pour chacun
                d’entre vous.
              </p>
            </div>
            <div className="col-md-4">
              <span className="fa-stack fa-4x">
                <i className="fa fa-circle fa-stack-2x text-primary"></i>
                <i className="fa fa-laptop fa-stack-1x fa-inverse"></i>
              </span>
              <h4 className="service-heading" id="text">
                TRANSPARENCE
              </h4>
              <p className="text-muted">
                Nous vous proposons une gamme de produits et de services
                attractifs couvrant l’ensemble des besoins de financement des
                projets des particuliers le tout avec l’accompagnement face aux
                aléas de la vie et le sérieux propre à l’esprit de notre
                entreprise
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
