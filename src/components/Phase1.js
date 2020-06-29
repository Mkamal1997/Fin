import React, { Component } from "react";
import { Select, DatePicker, Layout, Menu, Dropdown, message } from "antd";
import {
  Card,
  Form,
  Button,
  Col,
  Row,
  FormGroup,
  CardBody,
  CardFooter,
  Breadcrumb,
  BreadcrumbItem,
  CardHeader,
  Input,
} from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import SteperD from "./SteperD";
import { DownOutlined } from "@ant-design/icons";
import Footer1 from "./Footer";
const { Content, Header, Footer } = Layout;
const { Option } = Select;

export default class Phase1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nom: "",
      prénom: "",
      formation: "",
      diplome: "",
      cin: "",
      num_tel: "",
      adresse: "",
      email: "",
      motivation: "",
      date_de_naissance: "",
      lieu_de_naissance: "",
      situation_familiale: "",
      isFinished: false,
      descriptif: "",
      intitulé_projet: "",
      phase: 0,
      domaines: [],
      indeterminate: true,
      isDisabled: false,
      isDisabledDP: false,
      visible: false,
      domaines: [],
      domaine: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.changeHandler = this.changeHandler.bind(this);
    this.onClickDP = this.onClickDP.bind(this);
  }

  initialState = {
    nom: "",
    prénom: "",
    formation: "",
    diplome: "",
    cin: "",
    num_tel: "",
    adresse: "",
    lieu_de_naissance: "",
    email: "",
    motivation: "",
    date_de_naissance: "",
    situation_familiale: "",
    descriptif: "",
    intitulé_projet: "",
    domaine: "",
  };
  onSubmit = (event) => {
    event.preventDefault();
    const demande = {
      client: {
        nom: this.state.nom,
        prénom: this.state.prénom,
        formation: this.state.formation,
        diplome: this.state.diplome,
        cin: this.state.cin,
        num_tel: this.state.num_tel,
        adresse: this.state.adresse,
        lieu_de_naissance: this.state.lieu_de_naissance,
        email: this.state.email,
        motivation: this.state.motivation,
        date_de_naissance: this.state.date_de_naissance,
        situation_familiale: this.state.situation_familiale,
        role: "Client",
      },
      statut_av: "Tri",
      //domaine: this.state.domaine,
      descriptif: this.state.descriptif,
      intitulé_projet: this.state.intitulé_projet,
    };

    axios
      .post("http://localhost:8082/api/demandes", demande)
      .then((response) => {
        if (response.data != null) {
          this.setState(this.initialState);
          message.success("Client and Demande Saved Succesfully");
          console.log(response.data);
          window.location = "/depot2";
        }
      });
  };
  onClickDP = ({ key }) => {
    this.setState({
      domaine: this.state.domaines[key - 1].domaine,
      // isDisabledDP: true,
    });
    //console.log(this.state.domaine);
  };
  handleDisable = () => {
    this.setState({});
  };
  handleVisibleChange = (flag) => {
    this.setState({ visible: flag });
  };
  componentDidMount() {
    this.getAllDomaines();
  }
  getAllDomaines() {
    axios
      .get("http://localhost:8082/api/domaines")
      .then((response) => response.json())
      .then((domaine) => {
        this.setState({ domaines: domaine });
      })
      .catch((error) => console.error("error :" + error));
  }

  changeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onChange = (date) => {
    this.setState({ date_de_naissance: date.format() });
  };

  onClick = () => {
    this.setState({ isDisabled: true });
  };

  onClickButton = () => {
    this.setState({ isDisabled: false, domaine: "" });
  };
  onClickSituation = ({ key }) => {
    this.setState({ situation_familiale: key });
  };

  render() {
    const menu = this.state.domaines.map((item) => (
      <Menu.Item key={item.id_domaine}>{item.domaine}</Menu.Item>
    ));
    const menuSituation = (
      <Menu onClick={this.onClickSituation} required>
        <Menu.Item key="Célibataire">Célibataire</Menu.Item>
        <Menu.Item key="Marié(e)">Marié(e)</Menu.Item>
        <Menu.Item key="Divorcé(e)">Divorcé(e)</Menu.Item>
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
                <BreadcrumbItem active>
                  DEPOSER MA DEMANDE ( PHASE 1 )
                </BreadcrumbItem>
              </Breadcrumb>
            </Col>
            <Row>
              <Col>
                <SteperD phase={this.state.phase} />
              </Col>
            </Row>
            <br /> <br />
            <Card
              style={{
                width: "75%",
                height: "120%",
                position: "absolute",
                left: "15%",
                top: "50%",
              }}
            >
              <CardHeader>
                {" "}
                <Col>Phase 1 : Informations sur le porteur de projet</Col>
              </CardHeader>
              <Form
                onSubmit={this.onSubmit}
                onChange={this.changeHandler}
                scrollToFirstError
              >
                <CardBody className="bg-faded">
                  <div className="row row-content">
                    <div className="col-12 col-sm-4 offset-sm-1">
                      <FormGroup>
                        <label>Nom</label>

                        <Input
                          required
                          autoComplete="off"
                          type="text"
                          name="nom"
                          value={this.state.nom}
                          onChange={this.changeHandler}
                          placeholder="Entrer votre Nom"
                        />
                      </FormGroup>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                      <FormGroup>
                        <label>Prénom</label>
                        <Input
                          required
                          autoComplete="off"
                          type="text"
                          name="prénom"
                          value={this.state.prénom}
                          onChange={this.changeHandler}
                          placeholder="Entrer votre Prénom"
                        />
                      </FormGroup>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                      <FormGroup>
                        <label>CIN</label>
                        <Input
                          required
                          type="text"
                          name="cin"
                          value={this.state.cin}
                          onChange={this.changeHandler}
                          placeholder="Entrer votre CIN "
                        />
                      </FormGroup>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                      <FormGroup>
                        <label>Adresse</label>
                        <Input
                          required
                          type="text"
                          name="adresse"
                          value={this.state.adresse}
                          onChange={this.changeHandler}
                          placeholder="Entrer votre Adresse"
                        />
                      </FormGroup>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                      <FormGroup>
                        <label>Date de Naissance</label>
                        <br />
                        <DatePicker
                          required
                          allowClear={false}
                          type="date"
                          Select={this.state.date_de_naissance}
                          onChange={this.onChange}
                          placeholder="Entrer votre Date de naissance"
                        />
                      </FormGroup>
                      <FormGroup>
                        <label>Email</label>
                        <Input
                          required
                          type="text"
                          name="email"
                          value={this.state.email}
                          onChange={this.changeHandler}
                          placeholder="Entrer votre Email"
                        />
                      </FormGroup>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                      <FormGroup>
                        <label>Lieu de Naissance</label>
                        <Input
                          required
                          type="text"
                          name="lieu_de_naissance"
                          value={this.state.lieu_de_naissance}
                          onChange={this.changeHandler}
                          placeholder="Entrer votre Lieu de naissance"
                        />
                      </FormGroup>

                      <FormGroup>
                        <label>Phone</label>
                        <Input
                          required
                          type="number"
                          name="num_tel"
                          value={this.state.num_tel}
                          onChange={this.changeHandler}
                          placeholder="Entrer votre Numéro de tel"
                        />
                      </FormGroup>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                      <FormGroup>
                        <label>Formation</label>
                        <Input
                          type="text"
                          name="formation"
                          value={this.state.formation}
                          onChange={this.changeHandler}
                          placeholder="Entrer votre formation"
                        />
                      </FormGroup>

                      <FormGroup>
                        <label>Motivation</label>

                        <textarea
                          className="form-control"
                          required
                          autoComplete="off"
                          type="text"
                          name="motivation"
                          value={this.state.motivation}
                          onChange={this.changeHandler}
                          placeholder="écrire votre motivation pour ce projet"
                          style={{ width: "120%" }}
                        ></textarea>
                      </FormGroup>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                      <FormGroup>
                        <label>Diplome</label>
                        <Input
                          type="text"
                          name="diplome"
                          value={this.state.diplome}
                          onChange={this.changeHandler}
                          placeholder="Entrer votre Diplome"
                        />
                      </FormGroup>

                      <FormGroup>
                        {" "}
                        <br />
                        <Dropdown overlay={menuSituation} required>
                          <a className="ant-dropdown-link">
                            <DownOutlined /> Situation Familiale
                          </a>
                        </Dropdown>
                      </FormGroup>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                      <FormGroup>
                        <label>Intitulé du Projet</label>
                        <textarea
                          class="form-control"
                          required
                          autoComplete="off"
                          type="test"
                          name="intitulé_projet"
                          value={this.state.intitulé_projet}
                          onChange={this.changeHandler}
                          placeholder="Enter intitulé de votre projet"
                          style={{ width: "120%" }}
                        ></textarea>
                      </FormGroup>
                      <FormGroup>
                        <label>Detail du Projet</label>
                        <textarea
                          class="form-control"
                          required
                          autoComplete="off"
                          type="test"
                          name="descriptif"
                          value={this.state.descriptif}
                          onChange={this.changeHandler}
                          placeholder="Enter descriptif de votre projet"
                          style={{ width: "175%" }}
                        ></textarea>
                      </FormGroup>
                    </div>
                    <div className="col-12 col-sm-4 offset-sm-1">
                      <FormGroup>
                        <Dropdown
                          required
                          overlay={
                            <Menu onClick={this.onClickDP}> {menu}</Menu>
                          }
                          onVisibleChange={this.handleVisibleChange}
                          visible={this.state.visible}
                          // trigger={["click"]}
                        >
                          <a className="ant-dropdown-link">
                            <DownOutlined /> Domaine Fonctionnel
                          </a>
                        </Dropdown>
                      </FormGroup>
                    </div>{" "}
                  </div>
                </CardBody>
                <CardFooter style={{ textAlign: "right" }}>
                  <Button
                    variant="success"
                    type="submit"
                    className="login-form-button btn btn-success"
                    onSubmit={this.onSubmit}
                  >
                    Ajouter
                  </Button>
                </CardFooter>
              </Form>
            </Card>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

/* 
 indeterminate:
        !!domaine.length && domaine.length < onloadOptions.length,
 className="border border-dark bg-dark text-white "
 */
