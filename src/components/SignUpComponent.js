import React, { useState } from "react";
import Footer from "./Footer";
import {
  Form,
  Input,
  Tooltip,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  Layout,
  DatePicker,
} from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

import { Link } from "react-router-dom";

const { Content, Sider, Header } = Layout;
const { Option } = Select;
//const AutoCompleteOption = AutoComplete.Option;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 10,
    },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const SignUp = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const onGenderChange = (value) => {
    switch (value) {
      case "male":
        form.setFieldsValue({ note: "Hi, man!" });
        return;
      case "female":
        form.setFieldsValue({ note: "Hi, lady!" });
        return;
    }
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select
        style={{
          width: 70,
        }}
      >
        <Option value="86">+212</Option>
        <Option value="87">+32</Option>
        <Option value="87">+33</Option>
        <Option value="87">+34</Option>
        <Option value="87">+35</Option>
      </Select>
    </Form.Item>
  );

  //const [autoCompleteResult, setAutoCompleteResult] = useState([]);

  return (
    <div>
      <Layout>
        <Header></Header>
        <Layout>
          <Content>
            <br />
            <Row>
              <Col>
                {" "}
                <Breadcrumb>
                  <BreadcrumbItem>
                    <Link to="/home">Home</Link>
                  </BreadcrumbItem>
                  <BreadcrumbItem active>Sign Up</BreadcrumbItem>
                </Breadcrumb>
              </Col>
              <Col xs={{ span: 5, offset: 1 }} lg={{ span: 24, offset: 12 }}>
                Créer Un compte
              </Col>
            </Row>
            <br /> <br />
            <Form
              {...formItemLayout}
              form={form}
              name="register"
              onFinish={onFinish}
              initialValues={{
                prefix: "212",
              }}
              scrollToFirstError
            >
              <Form.Item
                name="nom"
                label="nom"
                rules={[
                  {
                    required: true,
                    message: "Entrer SVP votre nom!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="prénom"
                label="prénom"
                rules={[
                  {
                    required: true,
                    message: "Entrer SVP votre prénom!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="Date de naissance"
              rules={[]}>
                <DatePicker />
              </Form.Item>

              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true }]}
              >
                <Select
                  placeholder="Select a option and change input text above"
                  onChange={onGenderChange}
                  allowClear
                >
                  <Option value="male">Mme.</Option>
                  <Option value="female">M.</Option>
                </Select>
              </Form.Item>

              <Form.Item
                name="email"
                label="E-mail"
                rules={[
                  {
                    type: "email",
                    message: "The input is not valid E-mail!",
                  },
                  {
                    required: true,
                    message: "Please input your E-mail!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(rule, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }

                      return Promise.reject(
                        "The two passwords that you entered do not match!"
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="nickname"
                label={
                  <span>
                    Identifiant&nbsp;
                    <Tooltip title="What do you want others to call you?">
                      <QuestionCircleOutlined />
                    </Tooltip>
                  </span>
                }
                rules={[
                  {
                    required: true,
                    message: "Please input your nickname!",
                    whitespace: true,
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="phone"
                label="Téléphone"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Input
                  addonBefore={prefixSelector}
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>

              <Form.Item
                label="Captcha"
                extra="We must make sure that your are a human."
              >
                <Row gutter={8}>
                  <Col span={12}>
                    <Form.Item
                      name="captcha"
                      noStyle
                      rules={[
                        {
                          required: true,
                          message: "Please input the captcha you got!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Button>Get captcha</Button>
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item
                name="agreement"
                valuePropName="checked"
                rules={[
                  {
                    validator: (_, value) =>
                      value
                        ? Promise.resolve()
                        : Promise.reject("Should accept agreement"),
                  },
                ]}
                {...tailFormItemLayout}
              >
                <Checkbox>
                  I have read the <a href="">agreement</a>
                </Checkbox>
              </Form.Item>
              <Form.Item {...tailFormItemLayout}>
                <Button type="primary" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>
          </Content>
          <Sider></Sider>
        </Layout>
        <div>
          <Footer />
        </div>
      </Layout>
    </div>
  );
};

export default SignUp;

/*
 <div className="container">
        <div className="row">
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to="/home">Home</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>Sign Up</BreadcrumbItem>
          </Breadcrumb>
        </div>

        <Form onSubmit={this.handleLogin} >
          <FormGroup>
            <Label htmlFor="nom">Nom</Label>
            <Input
              type="text"
              id="nom"
              name="nom"
              innerRef={input => (this.nom = input)}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="prénom">Prénom</Label>
            <Input
              type="text"
              id="prénom"
              name="prénom"
              innerRef={input => (this.prénom = input)}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="text"
              id="email"
              name="email"
              innerRef={input => (this.email = input)}
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              id="password"
              name="password"
              innerRef={input => (this.password = input)}
            />
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input
                type="checkbox"
                name="remember"
                innerRef={input => (this.remember = input)}
              />
              Remember me
            </Label>
          </FormGroup>
          <Button type="submit" value="submit" color="primary">
            Login
          </Button>
        </Form>
      </div> */
