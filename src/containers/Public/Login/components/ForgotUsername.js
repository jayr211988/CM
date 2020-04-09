// LIBRARIES
import React, { useState } from "react";
import { Modal, Button } from "antd";

// COMPONENTS
import { Text } from "fe-components";

export default function ForgotUsername() {

  const [state, setState] = useState(true);

  const handleOk = () => setState(false);

  return (
    <Modal
      visible   = {state}
      footer    = {null}
      closable  = {false}
      centered  = {true}
      width     = {320}
    >

      <Text size={15} weight="bold">Forgot Username</Text>
      
      <div style={{ marginTop: 12 }}>
        <Text>If you forgot your username, please email</Text>
        <Text color="#1890FF">admin@domain.com</Text>
      </div>

      <div align="right" style={{ marginTop: 12 }}>
        <Button type="primary" style={{ width: 80 }} onClick={handleOk}>OK</Button>
      </div>
      
    </Modal>
  )
}