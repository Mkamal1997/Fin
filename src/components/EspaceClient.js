import React, { Component } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Table,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Row, Col, Layout, Collapse, Menu, Modal, message } from "antd";
import axios from "axios";
import Footer1 from "./Footer";
//import Phase4C from "./Phase4C";
const { Content, Header } = Layout;
const { Panel } = Collapse;

export default class EspaceClient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      demandes: [],
      isDisabled: false,
      SommeFin: 0,
      avisFin: "",
      avisFinR: "",
      statut_av: "",
    };
    this.onChange = this.onChange.bind(this);
  }
  componentDidMount() {
    this.getAllDemandes();
  }
  getAllDemandes() {
    fetch("http://localhost:8082/api/demandes")
      .then((response) => response.json())
      .then((demande) => {
        this.setState({ demandes: demande, isLoading: false });
      })
      .catch((error) => console.error("error :" + error));
  }

  onClickDelete = (dem) => {
    axios
      .delete(`http://localhost:8082/api/demandes/${dem.id_idée}`)
      .then((response) => {
        if (response.data != null) {
          alert("Demande Deleted Succesfully");
        }
      });
    message.error("Votre Demande est supprimée");
  };
  onClickContinue = (dem) => {
    //<Phase4C dem={dem}/>
  };
  onSubmitApprove = (event, dem) => {
    event.preventDefault();
    const demande = {
      decision: {
        avis: this.state.avisFin,
        somme_accordée: this.state.SommeFin,
      },
      statut_av: "Approuvé",
      budget: dem.budget,
      intitulé_projet: dem.intitulé_projet,
      descriptif: dem.descriptif,
      client: this.state.demandes["client"],
    };
    this.setState({ isDisabled: true });

    axios
      .put(`http://localhost:8082/api/demandes/${dem.id_idée}`, demande)
      .then((response) => {
        if (response.data != null) {
          this.setState(this.initialState);
          alert("Demande Accepted and Updated Succesfully");
          console.log(response.data);
        }
      });
  };
  reset = () => {
    this.setState(() => this.initialState);
  };
  initialState = { SommeFin: 0, avisFin: "", avisFinR: "" };
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    const menu = (
      <Menu>
        <Menu.Item key="Financer le Projet" onClick={this.showModalApprove}>
          Financer le Projet
        </Menu.Item>
        <Menu.Item
          key="Ne pas Financer le Projet"
          onClick={this.showModalDisapprove}
        >
          Ne pas Financer le Projet
        </Menu.Item>
      </Menu>
    );

    return (
      <Layout>
        <Header></Header>
        <Layout>
          <Content>
            <Col span={24}>
              <Breadcrumb>
                <BreadcrumbItem>
                  <Link to="/home">Home</Link>
                </BreadcrumbItem>
                <BreadcrumbItem active>ESPACE CLIENT </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Content>

          <Content>
            <Row>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 14, offset: 8 }}>
                <h1 style={{ color: "#fa8d44" }}>Liste de mes demandes</h1>

                <br />
                <br />
              </Col>

              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 21, offset: 1 }}>
                <Collapse
                  style={{
                    borderRadius: "2px",
                  }}
                >
                  {this.state.demandes.map((demande) => (
                    <Panel
                      header={`Demande ${demande.id_idée}`}
                      key={demande.id_idée}
                    >
                      <i class="fa fa-check" aria-hidden="true"></i>
                      <Row>
                        <Col>
                          <Card>
                            <CardHeader></CardHeader>
                            <CardBody>
                              <Table
                                bordered
                                striped
                                style={{
                                  color: "#480678",
                                }}
                              >
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>intitulé du projet</th>
                                    <th>Candidat</th>
                                    <th>Email</th>
                                    <th> Date de naissance</th>
                                    <th>Diplôme</th>
                                    <th>Motivation</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <th scope="row">{demande.id_idée}</th>
                                    <td> {demande.intitulé_projet}</td>
                                    <td>
                                      {demande.client.nom}{" "}
                                      {demande.client.prénom}
                                    </td>
                                    <td>{demande.client.email}</td>
                                    <td>{demande.client.date_de_naissance}</td>
                                    <td>{demande.client.diplome}</td>
                                    <td>{demande.client.motivation}</td>
                                  </tr>
                                </tbody>
                              </Table>
                              <Table
                                bordered
                                striped
                                style={{ color: "#480678" }}
                              >
                                <thead>
                                  <tr>
                                    <th>Description du projet</th>
                                    <th>lieu</th>
                                    <th>budget</th>
                                    <th>apport personnel</th>
                                    <th>financement sollicité</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td>{demande.descriptif}</td>
                                    <td>{demande.lieu}</td>
                                    <td>{demande.budget}</td>
                                    <td>{demande.apport_personnel}</td>
                                    <td>{demande.financement_sollicité}</td>
                                  </tr>
                                </tbody>
                              </Table>
                              <Row>
                                statut d'avancement : {demande.statut_av}
                              </Row>
                              <Row>
                                <Col span={12}>
                                  {" "}
                                  <h5>Avis : </h5>
                                  {demande.décision.avis}
                                </Col>{" "}
                                <Col span={12}>
                                  <h5>Somme Accordée : </h5>
                                  {demande.décision.somme_accordée}
                                </Col>
                              </Row>
                            </CardBody>
                            <CardFooter style={{ textAlign: "right" }}>
                              {"    "}
                              <Button
                                onClick={this.onClickDelete}
                                size="sm"
                                variant="info"
                                type="reset"
                              >
                                Annuler Ma demande
                              </Button>
                            </CardFooter>
                          </Card>
                        </Col>
                      </Row>
                    </Panel>
                  ))}
                </Collapse>
              </Col>
            </Row>
          </Content>

          <Content>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
          </Content>
          <Content>
            <Footer1 />
          </Content>
        </Layout>
      </Layout>
    );
  }
}

/*
   <Button
                                  size="sm"
                                  variant="success"
                                  type="submit"
                                  //onClick={this.onClickModify(demande)}
                                >
                                  Modifier ma Demande
                                </Button>
                                */
