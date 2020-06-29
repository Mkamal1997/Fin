import React, { Component } from "react";
import { Checkbox } from "antd";
import Phase3 from "./Phase3";
const CheckboxGroup = Checkbox.Group;
const plainOptions = [
  "Motivation et engagement à entreprendre",
  "Disposer d’un bon profil entrepreneurial",
  "Être âgé entre 22 ans et 45 ans",
  "Adéquation entre le profil entrepreneurial et le projet",
  "Avoir un Diplôme/Formation qui va avec l'idée du projet",
  "projet faisable et viable sur le plan commercial,technique et financier",
  "le projet respecte l’environnement",
];
const defaultCheckedList = [];
export default class CheckCp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      checkedList: defaultCheckedList,
      indeterminate: true,
      checkAll: false,
      isDisabled: false,
    };
  }
  onChange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate:
        !!checkedList.length && checkedList.length < plainOptions.length,
      checkAll: checkedList.length === plainOptions.length,
    });
  };
  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  };

  onClick = () => {
    this.setState({ isDisabled: true });
    if (this.state.checkAll) {
      alert(
        "vous avez validé cette demande, une notification est envoyé au client: " +
          `${this.props.clientNom}` +
          " " +
          `${this.props.clientPrénom}` +
          " pour l'informer"
      );
    } else {
      alert(
        "Un avis est envoyé au client pour lui demander de compléter ça demande"
      );
    }
  };

  render() {
    return (
      <div>
        <div className="site-checkbox-all-wrapper">
          <Checkbox
            indeterminate={this.state.indeterminate}
            onChange={this.onCheckAllChange}
            checked={this.state.checkAll}
            disabled={this.state.isDisabled}
          >
            Check all
          </Checkbox>
          <button onClick={this.onClick} disabled={this.state.isDisabled}>
            Valider
          </button>
        </div>

        <br />
        <br />
        <CheckboxGroup
          options={plainOptions}
          value={this.state.checkedList}
          onChange={this.onChange}
          disabled={this.state.isDisabled}
        />
      </div>
    );
  }
}
