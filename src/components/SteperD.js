

import React, { Component } from "react";
import { Steps, Button, message } from "antd";

const { Step } = Steps;

export default class SteperD extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  onChange = (current) => {
    this.setState({ current: this.props.phase });
  };
  componentDidMount() {
    this.onChange();
  }

  render() {
    return (
      <div>
        <Steps current={this.state.current} onChange={this.onChange}>
          <Step
            title="1"
            description="Dépôt préliminaire"
            style={{
              padding: 24,
              textAlign: "center",
            }}
          />
          <Step
            title="2"
            description="Tri des demandes."
            style={{
              padding: 24,
              textAlign: "center",
            }}
          />
          <Step
            title="3"
            description="Donner plus de details."
            style={{
              padding: 24,
              textAlign: "center",
            }}
          />
          <Step
            title="4"
            description="Décision finale."
            style={{
              padding: 24,
              textAlign: "center",
            }}
          />
        </Steps>
      </div>
    );
  }
}
