import React, { Component } from "react";
import { Col, Button, Row, Layout, Input, Form, Divider } from "antd";
import {
  Breadcrumb,
  BreadcrumbItem,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import { Link } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
const { Content, Header, Footer } = Layout;

export default class EspaceAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cp_nom: "kamal marwane",
      cp_prénom: "blaBla",
      cp_password: "******",
      cd_nom: "kamal",
      cd_prénom: "blaBla",
      cd_password: "******",
      isModalOpen: false,
      isModalOpen_cd: false,
      userInput: "",
      items: [],
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.toggleModal_cd = this.toggleModal_cd.bind(this);
  }
  onChange(event) {
    this.setState({
      userInput: event.target.value,
    });
  }

  addDomaine(event) {
    event.preventDefault();
    this.setState({
      userInput: "",
      items: [...this.state.items, this.state.userInput],
    });
  }

  deleteDomaine(item) {
    // no event
    // pass the item to indexOf
    const array = this.state.items;
    const index = array.indexOf(item);
    array.splice(index, 1);
    this.setState({
      items: array,
    });
  }
  // add item to deleteDomaine.bind(this, item)
  renderDomaine() {
    return this.state.items.map((item) => {
      return (
        <Col span={8} key={item}>
          {item}
          <button
            className="btn btn-secondary"
            onClick={this.deleteDomaine.bind(this, item)}
          >
            |X
          </button>
          <br />
        </Col>
      );
    });
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }
  toggleModal_cd(){
    this.setState({
      isModalOpen_cd: !this.state.isModalOpen_cd
    });
  }
  handleUpdateDomaine() {
    this.setState();
  }
  handleDelete() {
    this.setState();
  }
  render() {
    return (
      <div>
        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>
            Modifier le Chargé de Présélection
          </ModalHeader>
          <ModalBody>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Entrer le Nom et Prénom du Chargé!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                  onChange={(e) => this.setState({ cp_nom: e.target.value })}
                />
              </Form.Item>
              <Form.Item
                name="login"
                rules={[
                  { required: true, message: "Entrer le Login du Chargé!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Login"
                  onChange={(e) => this.setState({ cp_prénom: e.target.value })}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: "Entrer le passward" }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  onChange={(e) => this.setState({ cp_password: e.target.value })}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  onClick={this.toggleModal}
                >
                  Update
                </Button>
              </Form.Item>
            </Form>
          </ModalBody>
        </Modal>


        <Modal isOpen={this.state.isModalOpen_cd} toggle={this.toggleModal_cd}>
          <ModalHeader toggle={this.toggleModal_cd}>
            Modifier le Chargé de Décision
          </ModalHeader>
          <ModalBody>
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Entrer le Nom et Prénom du Chargé!",
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Username"
                  onChange={(e) => this.setState({ cd_nom: e.target.value })}
                />
              </Form.Item>
              <Form.Item
                name="login"
                rules={[
                  { required: true, message: "Entrer le Login du Chargé!" },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Login"
                  onChange={(e) => this.setState({ cd_prénom: e.target.value })}
                />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[{ required: true, message: "Entrer le passward" }]}
              >
                <Input
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  onChange={(e) => this.setState({ cd_password: e.target.value })}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  onClick={this.toggleModal_cd}
                >
                  Update
                </Button>
              </Form.Item>
            </Form>
          </ModalBody>
        </Modal>
        <Layout>
          <Header></Header>
          <Layout>
            <Content>
              <Col span={24}>
                <Breadcrumb>
                  <BreadcrumbItem>
                    <Link to="/home">Home</Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem active>ESPACE ADMIN </BreadcrumbItem>
                </Breadcrumb>
              </Col>
            </Content>
            <Content>
              <Col span={15} offset={4}>
                <br />
                <br />
                <div>
                  <h1 align="center">Gestion des Domaines Fonctionnels</h1>
                  <br />
                  <br />
                  <form className="form-row align-items-center">
                    <input
                      value={this.state.userInput}
                      type="text"
                      placeholder="Renseigner un Domaine Fonctionnel"
                      onChange={this.onChange.bind(this)}
                      className="form-control mb-2"
                    />
                    <button
                      onClick={this.addDomaine.bind(this)}
                      className="btn btn-primary"
                    >
                      Ajouter
                    </button>
                    <Divider></Divider>
                  </form>
                  <Row gutter={[16, 16]}>{this.renderDomaine()}</Row>
                </div>
              </Col>
            </Content>

            <Content>
              <Row>
                <Col span={15} offset={4}>
                  <h1 align="center">Gestion des Profils</h1>
                  <br />
                  <table class="table table-bordered">
                    <thead>
                      <tr>
                        <th> </th>
                        <th>Nom et Prénom</th>
                        <th>Login</th>
                        <th>Password</th>
                        <th>Update</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Chargé de Présélection</td>
                        <td>{this.state.cp_nom}</td>
                        <td>{this.state.cp_prénom}</td>
                        <td>{this.state.cp_password}</td>
                        <td>
                          <Button outline="true" onClick={this.toggleModal}>
                            >Update
                          </Button>
                        </td>
                      </tr>
                      <tr>
                        <td>Chargé de décision</td>
                        <td>{this.state.cd_nom}</td>
                        <td>{this.state.cd_prénom}</td>
                        <td>{this.state.cd_password}</td>
                        <td>
                          <Button outline="true"  onClick={this.toggleModal_cd}>
                            >Update
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Col>
              </Row>
            </Content>

            <Layout>
              <Footer></Footer>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}
