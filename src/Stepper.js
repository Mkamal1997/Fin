import React from "react";
import {Col, Row, Steps} from "antd";

const Step = Steps.Step;

export function Stepper(props) {
	
	
	const steps = [
    {key: '1', title: 'Dépôt de la demande'},
    {key: '2', title: 'Présélection'},
    {key: '3', title: 'Dépôt du financement'},
	{key: '4', title: 'Décision finale'}
  ]

  /**
   * Steps titles from parents props
   */
  const stepsComponent = steps.map((val) => <Step key={val.key} title={val.title}/>);

  /**
   * Render method
   */
  return (
    <Row id="stepper-container" type="flex" justify="center">
      <Col xs={20} md={18} xl={14}>
        <Steps current={props.current} labelPlacement={"vertical"}>
          {stepsComponent}
        </Steps>
      </Col>
    </Row>
  );
}

