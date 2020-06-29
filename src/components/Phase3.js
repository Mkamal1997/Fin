import React, { Component } from "react";
import { Row, Col, Layout } from "antd";
import {
  Card,
  Form,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  FormGroup,
  CardBody,
  CardFooter,
  CardHeader,
  Input,
} from "reactstrap";
import SteperD from "./SteperD";
import { Link } from "react-router-dom";
import axios from "axios";
const { Content, Header } = Layout;
export default class Phase3 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lieu: "",
      budget: "",
      apport_personnel: "",
      financement_sollicité: "",
      phase: 2,
      demandes: [],
      demande: {},
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  initialState = {
    lieu: "",
    budget: "",
    apport_personnel: "",
    financement_sollicité: "",
  };
  componentDidMount() {
    this.getAllDemandes();
  }
  getAllDemandes() {
    fetch("http://localhost:8082/api/demandes/")
      .then((response) => response.json())
      .then((demande) => {
        this.setState({
          demandes: demande,
          isLoading: false,
        });
      })
      .catch((error) => console.error("error :" + error));
  }

  onSubmit = (event) => {
    event.preventDefault();
    const dem = this.state.demandes.pop();
    const demande = {
      id_idée: dem.id_idée,
      budget: dem.budget,
      intitulé_projet: dem.intitulé_projet,
      descriptif: dem.descriptif,
      client: dem.client,
      statut_av: "Décision",
      lieu: this.state.lieu,
      budget: this.state.budget,
      apport_personnel: this.state.apport_personnel,
      financement_sollicité: this.state.financement_sollicité,
    };
    axios
      .put(`http://localhost:8082/api/demandes/${demande.id_idée}`, demande)
      .then((response) => {
        if (response.data != null) {
          this.setState(this.initialState);
          alert("Detail Saved Succesfully and Demande Updated and Saved");
          console.log(response.data);
          window.location = "/depotPhase5";
        }
      });
  };

  onChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    return (
      <Layout>
        <Header></Header>
        <Layout>
          <Content>
            <div>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 10 }}>
                Phase 3 : Donner plus de details sur votre projet
              </Col>{" "}
              <br />
              <Col span={24}>
                <Breadcrumb>
                  <BreadcrumbItem>
                    <Link to="/home">Home</Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem active>DETAILS SUPPLEMENTAIRE</BreadcrumbItem>
                </Breadcrumb>
              </Col>
              <Col>
                <SteperD phase={this.state.phase} />
              </Col>
              <Card
                style={{
                  width: "70%",
                  height: "90%",
                  position: "absolute",
                  left: "15%",
                  top: "50%",
                }}
              >
                <CardHeader></CardHeader>
                <Form onSubmit={this.onSubmit} onChange={this.onChange}>
                  <CardBody>
                    <div className="row row-content">
                      <div className="col-12 col-sm-4 offset-sm-1">
                        <FormGroup>
                          <label>Lieu d'implantation du projet</label>
                          <Input
                            required
                            autoComplete="off"
                            type="test"
                            name="lieu"
                            value={this.state.lieu}
                            onChange={this.onChange}
                            placeholder="Enter le lieu d'implantation de votre projet "
                          />
                        </FormGroup>
                      </div>{" "}
                      <div className="col-12 col-sm-4 offset-sm-1">
                        <FormGroup>
                          <label>Estimation du coût global du projet</label>
                          <Input
                            required
                            autoComplete="off"
                            type="test"
                            name="budget"
                            value={this.state.budget}
                            onChange={this.onChange}
                            placeholder="Enter le Budget nécessaire "
                          />
                        </FormGroup>
                      </div>{" "}
                      <div className="col-12 col-sm-4 offset-sm-1">
                        <FormGroup>
                          <label>Apport personnel</label>
                          <Input
                            required
                            autoComplete="off"
                            type="test"
                            name="apport_personnel"
                            value={this.state.apport_personnel}
                            onChange={this.onChange}
                            placeholder="Entrez votre Apport personnel! "
                          />
                        </FormGroup>
                      </div>
                      <div className="col-12 col-sm-4 offset-sm-1">
                        <FormGroup>
                          <label>Financement Sollicité</label>
                          <Input
                            required
                            autoComplete="off"
                            type="test"
                            name="financement_sollicité"
                            value={this.state.financement_sollicité}
                            onChange={this.onChange}
                            placeholder="Entrez votre Financement Sollicité! "
                          />
                        </FormGroup>
                      </div>
                    </div>
                  </CardBody>
                  <CardFooter style={{ textAlign: "right" }}>
                    <Button
                      size="sm"
                      variant="success"
                      type="submit"
                      onSubmit={this.onSubmit}
                    >
                      Ajouter
                    </Button>
                  </CardFooter>
                </Form>
              </Card>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
