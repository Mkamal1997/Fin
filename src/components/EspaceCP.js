import React, { Component } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  Table,
} from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import { Row, Col, Checkbox, Layout, Collapse, message, Button } from "antd";
import Footer1 from "./Footer";
const { Content, Header } = Layout;
const { Panel } = Collapse;
const CheckboxGroup = Checkbox.Group;
const plainOptions = [
  "Motivation et engagement à entreprendre",
  "Disposer d’un bon profil entrepreneurial",
  "Être âgé entre 22 ans et 45 ans",
  "Adéquation entre le profil entrepreneurial et le projet",
  "Avoir un Diplôme/Formation qui va avec l'idée du projet",
  "projet faisable et viable sur le plan commercial,technique et financier",
  "le projet respecte l’environnement",
];
const defaultCheckedList = [];
export default class EspaceCP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      demandes: [],
      isLoading: false,
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      isDisabled: false,
    };
  }

  componentDidMount() {
    this.getAllDemandes();
  }

  onChange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length,
    });
  };
  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };
  handleCheckAll = () => {
    if (this.state.checkAll == true) {
      return false;
    }
    if (this.state.checkAll == true) {
      return true;
    } else {
      return true;
    }
  };

  onClickValider = (dem) => {
    if (dem.statut_av == "Tri") {
      const demande = {
        budget: dem.budget,
        intitulé_projet: dem.intitulé_projet,
        descriptif: dem.descriptif,
        statut_av: "Detail",
        client: this.state.demandes["client"],
      };
      this.setState({ isDisabled: true, checkAll: false });
      if (this.state.checkAll) {
        axios
          .put(`http://localhost:8082/api/demandes/${dem.id_idée}`, demande)
          .then((response) => {
            if (response.data != null) {
              this.setState(this.initialState);
              message.success("Demande Validée ");
              console.log(response.data);
            }
          });
          

      }
    } else {
      this.setState({ checkAll: false, isDisabled: true });
      message.error("Vous avez déjà passé cette Demande");
    }
  };
  onClickRejeter = (dem) => {
    const demande = {
      budget: dem.budget,
      intitulé_projet: dem.intitulé_projet,
      descriptif: dem.descriptif,
      statut_av: "Rejetée",
      client: this.state.demandes["client"],
      décision: {
        avis: "Votre Demande Ne repond pas à nos critères d'éligibilité",
        somme_accordée: 0,
      },
    };
    if (dem.statut_av == "Tri") {
  
      this.setState({ isDisabled: true });

      axios
        .put(`http://localhost:8082/api/demandes/${dem.id_idée}`, demande)
        .then((response) => {
          if (response.data != null) {
            this.setState(this.initialState);
            message.error(
              "Un avis est envoyé au client pour lui informer du Rejet de ça demande"
            );
            console.log(response.data);
          }
        });
    } else {
      this.setState({ checkAll: false, isDisabled: true });
      message.error("Vous avez déjà passé cette Demande");
    }
    axios
    .post(`http://localhost:8082/api/demandes/rejet`, demande)
    .then((response) => {
      if (response.data != null) {
        this.setState(this.initialState);
        console.log(response.data);
      }
    });
  };

  onClickComplémenter = (dem) => {
    if (dem.statut_av == "Tri") {
      const demande = {
        budget: dem.budget,
        intitulé_projet: dem.intitulé_projet,
        descriptif: dem.descriptif,
        statut_av: "Compléter",
        client: this.state.demandes["client"],
      };
      this.setState({ isDisabled: true });
      axios
        .put(`http://localhost:8082/api/demandes/${dem.id_idée}`, demande)
        .then((response) => {
          if (response.data != null) {
            this.setState(this.initialState);
            message.success(
              "Un avis est envoyé au client pour lui demander de compléter ça demande"
            );
          }
        });
    } else {
      this.setState({ checkAll: false, isDisabled: true });
      message.error("Vous avez déjà passé cette Demande");
    }
  };
  getAllDemandes() {
    fetch("http://localhost:8082/api/demandes")
      .then((response) => response.json())

      .then((demande) => {
        this.setState({ demandes: demande, isLoading: false });
      })

      .catch((error) => console.error("error :" + error));
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
                <h1>Liste des demandes soumises</h1>
                <br />
                <br />
              </Col>

              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 20, offset: 2 }}>
                <Collapse>
                  {this.state.demandes.map((demande) => (
                    <Panel
                      header={`Demande ${demande.id_idée}`}
                      key={demande.id_idée}
                    >
                      <Row>
                        <Col>
                          <Card>
                            <CardBody>
                              <Table bordered striped>
                                <thead>
                                  <tr>
                                    <th>#</th>
                                    <th>intitulé du projet</th>
                                    <th>Candidat</th>
                                    <th>Email</th>
                                    <th> Date de naissance</th>
                                    <th>Diplôme</th>
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
                                  </tr>
                                </tbody>
                              </Table>
                              <Row>
                                <Col span={12}>
                                  {" "}
                                  <h5>Motivation : </h5>
                                  {demande.client.motivation}
                                </Col>{" "}
                                <Col span={12}>
                                  <h5>Description du projet : </h5>
                                  {demande.descriptif}
                                </Col>
                              </Row>
                            </CardBody>
                          </Card>
                        </Col>
                        <Col>
                          <div>
                            <Checkbox
                              indeterminate={this.state.indeterminate}
                              onChange={this.onCheckAllChange}
                              checked={this.state.checkAll}
                              disabled={this.state.isDisabled}
                            >
                              Check all
                            </Checkbox>

                            <Button
                              variant="success"
                              className="login-form-button btn btn-success"
                              onClick={() => this.onClickValider(demande)}
                              value={demande}
                              disabled={this.handleCheckAll()}
                            >
                              Valider
                            </Button>
                            <Button
                              type="primary"
                              danger
                              onClick={() => this.onClickRejeter(demande)}
                              value={demande}
                              disabled={this.state.isDisabled}
                            >
                              Rejeter
                            </Button>

                            <Button
                              type="dashed"
                              onClick={() => this.onClickComplémenter(demande)}
                              value={demande}
                              disabled={this.state.isDisabled}
                            >
                              Complémenter
                            </Button>

                            <br />
                            <br />
                            <CheckboxGroup
                              options={plainOptions}
                              value={this.state.checkedList}
                              onChange={this.onChange}
                              disabled={this.state.isDisabled}
                            />
                          </div>
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

/*
  <Checkbox
                                  indeterminate={this.state.indeterminate}
                                  onChange={this.onCheckAllChange}
                                  checked={this.state.checkAll}
                                  disabled={this.state.isDisabled}
                                >
                                  Check all
                                </Checkbox>
                                */
