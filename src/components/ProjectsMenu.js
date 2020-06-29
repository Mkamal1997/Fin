import React from "react";
import { Card, Carousel, Row, Col } from "antd";
import { PROJECTS } from "../projects";

const { Meta } = Card;

function RenderProjectItem({ project }) {
  return (
    <Card
      hoverable
      style={{ width: 750, height: 750 }}
      cover={
        <img
          alt={project.name}
          src={project.image}
        />
      }
    >
      <Meta title={project.name} description={project.description} />
    </Card>
  );
}

const ProjectsMenu = () => {
  const menu = PROJECTS.map(project => {
    return (
      <Col key={project.id}>
        <RenderProjectItem project={project} />
      </Col>
    );
  });

  return (
    <Row>
      <Col span={10}>
        <Carousel autoplay="true" style={{ width: 700, height: 700 }}>
          {menu}
        </Carousel>
      </Col>
    </Row>
  );
};

export default ProjectsMenu;
