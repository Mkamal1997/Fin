import React, { Component } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Table,
  Form,
  FormGroup,
  Button,
} from "reactstrap";
import { Link } from "react-router-dom";
import { Row, Col, Layout, Collapse, Modal, Input, message } from "antd";
import axios from "axios";
import Footer1 from "./Footer";
const { Content, Header } = Layout;
const { Panel } = Collapse;

export default class EspaceCD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      demandes: [],
      visibleA: false,
      visibleR: false,
      isDisabled: false,
      SommeFin: 0,
      avisFin: "",
      avisFinR: "",
      statut_av: "",
    };
    //this.onChange = this.onChange.bind(this);
  }
  // onClickDropdown = ({ key }) => {};
  componentDidMount() {
    this.getAllDemandes();
  }
  showModalFin = () => {
    this.setState({ visibleF: true });
  };
  showModalRej = () => {
    this.setState({ visibleR: true });
  };
  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  getAllDemandes() {
    fetch("http://localhost:8082/api/demandes")
      .then((response) => response.json())
      .then((demande) => {
        this.setState({ demandes: demande });
      })
      .catch((error) => console.error("error :" + error));
  }

  handleOkFin = (dem) => {
    if (dem.statut_av == "Décision") {
      this.setState({
        visibleF: false,
      });
      const demande = {
        décision: {
          avis: this.state.avisFin,
          somme_accordée: this.state.SommeFin,
        },
        statut_av: "Approuvé",
        budget: dem.budget,
        intitulé_projet: dem.intitulé_projet,
        descriptif: dem.descriptif,
        client: this.state.demandes["client"],
      };
      this.setState({ visibleF: false, isDisabled: true });

      axios
        .put(`http://localhost:8082/api/demandes/${dem.id_idée}`, demande)
        .then((response) => {
          if (response.data != null) {
            this.setState(this.initialState);
            message.success(
              "Demande Acceptée, envoi d'une Notification au Client"
            );
            console.log(response.data);
          }
        });
    } else if (dem.statut_av == "Tri") {
      this.setState({
        isDisabled: true,
        visibleR: false,
      });
      message.error("La demande est encors dans l'étape de Tri");
    } else if (dem.statut_av == "Detail") {
      this.setState({
        isDisabled: true,
        visibleR: false,
      });
      message.error("La demande est encors dans la 3 éme étape ");
    } else {
      this.setState({
        isDisabled: true,
        visibleR: false,
      });
      message.error("Cette Demande a déjà reçue une décision");
    }
  };

  handleCancelFin = (e) => {
    console.log(e);
    this.setState({
      visibleF: false,
    });
  };

  handleOkRej = (dem) => {
    if (dem.statut_av == "Décision") {
      this.setState({
        visibleR: false,
      });
      const demande = {
        décision: {
          avis: this.state.avisFinR,
          somme_accordée: 0,
        },
        statut_av: "Désapprouvé",
        budget: dem.budget,
        intitulé_projet: dem.intitulé_projet,
        descriptif: dem.descriptif,
        client: this.state.demandes["client"],
      };
      this.setState({ visibleR: false, isDisabled: true });

      axios
        .put(`http://localhost:8082/api/demandes/${dem.id_idée}`, demande)
        .then((response) => {
          if (response.data != null) {
            this.setState(this.initialState);
            message.success("Demande Rejetée");
            console.log(response.data);
          }
        });
    } else if (dem.statut_av == "Tri") {
      this.setState({
        isDisabled: true,
        visibleR: false,
      });
      message.error("La demande est encors dans l'étape de Tri");
    } else if (dem.statut_av == "Detail") {
      this.setState({
        isDisabled: true,
        visibleR: false,
      });
      message.error("La demande est encors dans la 3 éme étape ");
    } else {
      this.setState({
        isDisabled: true,
        visibleR: false,
      });
      message.error("Cette Demande a déjà reçue une décision");
    }
  };

  handleCancelRej = (e) => {
    console.log(e);
    this.setState({
      visibleR: false,
    });
  };

  initialState = { SommeFin: 0, avisFin: "", avisFinR: "" };
  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
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
                <BreadcrumbItem active>ESPACE PERSONNEL </BreadcrumbItem>
              </Breadcrumb>
            </Col>
          </Content>

          <Content>
            <Row>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 14, offset: 8 }}>
                <h1 style={{ color: "#fa8d44" }}>Liste des demandes triées</h1>

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
                      <i className="fa fa-check" aria-hidden="true"></i>
                      <Row>
                        <Col>
                          <Card>
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
                              <h5>Avancement: {demande.statut_av}</h5>
                            </CardBody>
                            <CardFooter>
                              <Button
                                variant="success"
                                className="login-form-button btn btn-success"
                                onClick={this.showModalFin}
                                disabled={this.state.isDisabled}
                              >
                                Accorder
                              </Button>
                              <Button
                                onClick={this.showModalRej}
                                disabled={this.state.isDisabled}
                              >
                                Rejeter
                              </Button>
                            </CardFooter>
                          </Card>
                        </Col>
                        <Col>
                          <Modal
                            centered
                            transitionName={"fade"}
                            confirmLoading={false}
                            maskClosable={false}
                            keyboard={false}
                            title="Financer le projet"
                            visible={this.state.visibleF}
                            onCancel={this.handleCancelFin}
                            onOk={() => this.handleOkFin(demande)}
                          >
                            <Form
                              onSubmit={() => this.handleOkFin(demande)}
                              onChange={this.changeHandler}
                              //scrollToFirstError
                            >
                              <div className="row row-content">
                                <div className="col-12 col-sm-4 offset-sm-1">
                                  <FormGroup>
                                    <label>Somme Accordée</label>
                                    <Input
                                      required
                                      style={{ width: "250%" }}
                                      autoComplete="off"
                                      type="text"
                                      name="SommeFin"
                                      value={this.state.SommeFin}
                                      onChange={this.changeHandler}
                                      placeholder="$$$$$$$"
                                    />
                                  </FormGroup>
                                </div>
                              </div>
                              <div className="row row-content">
                                <div className="col-12 col-sm-4 offset-sm-1">
                                  <FormGroup>
                                    <label>Avis</label>
                                    <textarea
                                      required
                                      style={{ width: "250%" }}
                                      autoComplete="off"
                                      type="text"
                                      name="avisFin"
                                      value={this.state.avisFin}
                                      onChange={this.changeHandler}
                                      placeholder="Entrer votre Avis"
                                    ></textarea>
                                  </FormGroup>
                                </div>
                              </div>
                            </Form>
                          </Modal>
                        </Col>

                        <Col>
                          <Modal
                            centered
                            transitionName={"fade"}
                            confirmLoading={false}
                            maskClosable={false}
                            keyboard={false}
                            title="Rejeter la Demande"
                            visible={this.state.visibleR}
                            onCancel={this.handleCancelRej}
                            onOk={() => this.handleOkRej(demande)}
                          >
                            <Form
                              onSubmit={() => this.handleOkRej(demande)}
                              onChange={this.changeHandler}
                              //scrollToFirstError
                            >
                              <div className="row row-content">
                                <div className="col-12 col-sm-4 offset-sm-1">
                                  <FormGroup>
                                    <label>Avis</label>
                                    <textarea
                                      required
                                      style={{ width: "250%" }}
                                      autoComplete="off"
                                      type="text"
                                      name="avisFinR"
                                      value={this.state.avisFinR}
                                      onChange={this.changeHandler}
                                      placeholder="Entrer votre Avis"
                                    ></textarea>
                                  </FormGroup>
                                </div>
                              </div>
                            </Form>
                          </Modal>
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
