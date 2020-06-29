import React, { Component } from "react";
import { Col, Layout, Button } from "antd";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import SteperD from "./SteperD";
import Footer1 from "./Footer";
import { ItalicOutlined } from "@ant-design/icons";
const { Content, Header } = Layout;

export default class Phase2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isFinished: false,
      phase: 1,
      status: {},
      isDisabled: true,
    };
  }
  componentDidMount() {
    this.getDemandeStatus();
    //this.isDisabled();
  }

  getDemandeStatus() {
    fetch("http://localhost:8082/api/demande/1")
      .then((response) => response.json())
      .then((demande) => {
        this.setState({ status: demande });
        console.log(this.state.status.statut_av);
      })
      .catch((error) => console.error("error :" + error));
  }
  isDisabled = () => {
    if (this.state.statut_av == "Tri") {
      this.setState({ isDisabled: false });
    }
  };
  onFinish = () => {
    if (this.state.isFinished) {
      this.setState({ isFinished: !this.state.isFinished });
    }
  };
  render() {
    return (
      <Layout>
        <Header></Header>
        <Layout>
          <Content>
            <div>
              <Col span={24}>
                <Breadcrumb>
                  <BreadcrumbItem>
                    <Link to="/home">Home</Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem active>PHASE 2</BreadcrumbItem>
                </Breadcrumb>
              </Col>
              <Col>
                <SteperD phase={this.state.phase} />
              </Col>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 7 }}>
                <br />
                <br />
                <br />
                <div></div>

                {this.state.status.statut_av == "Detail" ? (
                  <div>
                    <h2>Vous pouvez passer à l'étape suivante</h2>{" "}
                  </div>
                ) : (
                  <h2>Veuiller patienter le traiement de votre demande</h2>
                )}
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
              </Col>
              <Col offset={14}>
                <Button
                  htmlType="submit"
                  className="login-form-button"
                  style={{ color: "#0ba603" }}
                  onClick={() => {
                    if (this.state.status.statut_av == "Detail") {
                      window.location = "/depotPhase4";
                    }
                  }}
                >
                  Continuer
                </Button>
              </Col>
            </div>
          </Content>
          <Content>
            <Footer1 />
          </Content>
        </Layout>
      </Layout>
    );
  }
}
