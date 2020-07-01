import React from "react";
import { Form, Col, Layout } from "antd";
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import SteperD from "./SteperD";
import Footer1 from "./Footer";

const { Content, Header, Footer } = Layout;

export default class Phase4 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFinished: false,
      status: {},
      phase: 3,
    };
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
                <BreadcrumbItem active>PHASE 2</BreadcrumbItem>
              </Breadcrumb>
            </Col>
            <Col>
              <SteperD phase={this.state.phase} />
            </Col>
            <br />
            <br />
            <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 10 }}>
              Phase 4
            </Col>
            <br />
            {this.state.status.statut_av == "Décision" ? (
              <div>Veuiller attendre la décision finale du Financement</div>
            ) : (
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 10 }}>
                Veiller consulter votre Espace client pour voir la décision
                finale{" "}
              </Col>
            )}
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
