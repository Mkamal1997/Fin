import React from "react";
import {CustomModal} from "./CustomModal";

export function Confirmation(props) {

  return (
    <CustomModal
      title={""}
      visible={props.visible}
      onCancel={props.onCancel}
      onOk={props.onOk}
    >

      <p className={"modal-message"}>
        {props.message}
      </p>
    </CustomModal>
  );
}

