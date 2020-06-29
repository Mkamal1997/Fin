import React from "react";
import { Layout, Breadcrumb, Col, Row, Card } from "antd";
import Header from "./HeaderComponent";
import ProjectsMenu from "./ProjectsMenu";
import SteperD from "./SteperD";
import Footer from "./Footer";
import Service from "./Service";
import { Typography } from "antd";
import FeatureSection from "./FeatureSection";
import { useKeycloak } from '@react-keycloak/web';
import AuthorizedElement from './utilities/AuthorizedElement'

const { Paragraph } = Typography;

const { Content } = Layout;

export default function Home() {
  const [keycloak, initialized] = useKeycloak();
  return (
    <Layout>
      <Header />
      
      <Content
        className="content3"
        style={{ padding: 70, margin: 0, minHeight: 280 }}
      >
        <Paragraph>
          <h3 style={{ textAlign: "center" }} id="proc">
            En postulant votre idée sur notre plateforme, elle passera par un
            processus de sélection expliqué là-dessous. Et par rapport à des
            critères choisis par un comité , vous pouvez bénéficier d'un
            financement soit totale ou partiel, vous permettant de faire sortir
            votre idée à l'existance.
          </h3>
          <h1 style={{ textAlign: "center", color: "#9e4165" }}>Processus</h1>
        </Paragraph>
      </Content>

      <Content
        className="content4"
        style={{ paddingRight: 0, paddingLeft: 270, margin: 0, minHeight: 280 }}
      >
        <Row>
          <Col offset={1} style={{ textAlign: "center" }} className="col-9">
            <div className="stp">
              <SteperD />
            </div>
          </Col>
        </Row>
      </Content>

      <FeatureSection />

      <Service />

      <Layout style={{ padding: "0 0" }}>
        <Content
          className="content1"
          style={{
            backgroundColor: "ivory",
            paddingLeft: 300,
            paddingTop: 75,
            margin: 0,
          }}
        >
          <ProjectsMenu />
        </Content>
      </Layout>
      <Footer />
    </Layout>

  );
}
