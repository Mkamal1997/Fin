import React from "react";
import {Modal} from "antd";


export function CustomModal(props) {
  return (
      <Modal
        centered
        transitionName={"fade"}
        confirmLoading={false}
        maskClosable={false}
        keyboard={false}
        title={props.title}
        visible={props.visible}
        onCancel={props.onCancel}
        onOk={props.onOk}
      >
        {props.children}
      </Modal>
  )
    ;
}
